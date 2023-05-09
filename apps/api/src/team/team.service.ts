import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { TeamUpdatedEvent } from 'src/team/events/team-updated-event';
import { MailService } from 'src/mail/mail.service';
import { TeamCreatedEvent } from './events/team-created-event';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';

@Injectable()
export class TeamService {
    constructor(
        private readonly prisma: PrismaService,
        private eventEmitter: EventEmitter2,
        private mailService: MailService,
    ) {}

    async join(authId: string, inviteCode: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: authId,
            },
        });
        if (user == null) {
            return new UpdateException('User not Authenticated');
        }
        const invite = await this.prisma.invite.findUnique({
            where: {
                id: inviteCode,
            },
        });
        if (invite == null) {
            return new UpdateException('Invalid invite code');
        }
        if (invite?.userId !== user.id) {
            return new UpdateException('Invalid invite code');
        }
        const team = await this.prisma.team.findUnique({
            where: {
                id: invite.teamId,
            },
            select: {
                _count: {
                    select: {
                        members: true,
                    },
                },
            },
        });
        // eslint-disable-next-line no-underscore-dangle
        if ((team?._count.members as number) >= 4) {
            return new UpdateException('Team is full');
        }
        try {
            const res = await this.prisma.team.update({
                where: {
                    id: invite.teamId,
                },
                data: {
                    members: {
                        create: {
                            role: 'MEMBER',
                            userId: authId,
                            eventId: invite.eventId,
                        },
                    },
                },
            });
            await this.prisma.invite.delete({
                where: {
                    id: inviteCode,
                },
            });
            return {
                message: 'Team joined successfully',
                data: res,
            };
        } catch (error) {
            return new UpdateException('User already in a Team');
        }
    }

    async create(createTeamDto: CreateTeamDto, authid: string) {
        const { eventId, name, repo } = createTeamDto;
        const { data } = await this.read(eventId, authid);
        if (data != null) {
            return new CreateException('User already in a Team');
        }
        const res = await this.prisma.team.create({
            data: {
                name,
                repo,
                eventId,
                members: {
                    create: {
                        role: 'LEADER',
                        userId: authid,
                        eventId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                repo: true,
                members: {
                    select: {
                        role: true,
                        user: {
                            select: {
                                email: true,
                                name: true,
                                githubid: true,
                            },
                        },
                    },
                },
            },
        });

        const members = await Promise.all(
            createTeamDto.members.map(async (member) => {
                const user = await this.prisma.user.findUnique({
                    where: {
                        githubid: member,
                    },
                });
                const invite = await this.prisma.invite.create({
                    data: {
                        teamId: res.id,
                        userId: user!.id,
                        eventId,
                    },
                });
                return {
                    role: 'MEMBER',
                    user: {
                        id: user!.id,
                        name: user!.name,
                        email: user!.email,
                        inviteCode: invite.id,
                        githubid: user!.githubid,
                    },
                };
            }),
        );
        members.push({
            role: 'LEADER',
            user: {
                id: authid,
                name: res.members[0].user.name,
                email: res.members[0].user.email,
                inviteCode: '',
                githubid: res.members[0].user.githubid,
            },
        });
        this.eventEmitter.emit('team.create', new TeamCreatedEvent(res.id, members));
        return {
            message: 'Team created successfully',
            data: res,
        };
    }

    async read(eventId: string, authid: string) {
        const data = await this.prisma.teamMember.findFirst({
            where: {
                userId: authid,
                eventId,
            },
            select: {
                team: {
                    select: {
                        id: true,
                        name: true,
                        repo: true,
                        members: {
                            select: {
                                role: true,
                                user: {
                                    select: {
                                        githubid: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return {
            message: 'Team Read successfully',
            data,
        };
    }

    async update(authid: string, updateTeamDto: UpdateTeamDto) {
        const { teamId, members } = updateTeamDto;
        const { data } = await this.findOne(teamId!);
        if (data == null) {
            return new UpdateException("Team Doesn't exist found");
        }
        const member = data.members;
        const isLeader = member.find((mem) => mem.role === 'LEADER' && mem.user.id === authid);
        if (isLeader == null) {
            return new UpdateException("User don't have permission to update");
        }
        this.eventEmitter.emit('team.update', new TeamUpdatedEvent(data.id, members || []));
        return {
            message: 'Team updated successfully',
            data,
        };
    }

    async findOne(teamId: string) {
        const data = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
            select: {
                id: true,
                name: true,
                repo: true,
                members: {
                    select: {
                        role: true,
                        user: {
                            select: {
                                id: true,
                                githubid: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            message: 'Team Read successfully',
            data: typeof data === 'undefined' ? null : data,
        };
    }

    @OnEvent('team.create')
    async onTeamCreate(event: TeamCreatedEvent) {
        const { teamId, members } = event;
        const team = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
        });
        if (team == null) {
            return;
        }
        members.forEach(async (member) => {
            if (member.role === 'LEADER') {
                const data = {
                    teamID: team.id,
                };
                await this.mailService.sendTeamCreated({
                    data,
                    email: member.user.email,
                });
            } else {
                const data = {
                    lead: members.find((mem) => mem.role === 'LEADER')?.user.name || '',
                    teamName: team.name,
                    teamID: teamId,
                    inviteCode: member.user.inviteCode,
                };
                await this.mailService.sendMemberInvited({
                    data,
                    email: member.user.email,
                });
            }
        });
    }

    @OnEvent('team.update')
    async onTeamUpdate(event: TeamUpdatedEvent) {
        const { teamId, members } = event;
        const team = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
            select: {
                id: true,
                name: true,
                eventId: true,
                members: {
                    select: {
                        role: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                githubid: true,
                            },
                        },
                    },
                },
            },
        });
        const removed =
            team?.members.filter(
                (mem) => !members.includes(mem.user.id) && mem.role !== 'LEADER',
            ) || [];
        const added = members.filter((mem) => team?.members.find((m) => m.user.id !== mem));

        removed.forEach(async (member) => {
            const user = await this.prisma.user.findUnique({
                where: {
                    githubid: member.user.githubid,
                },
            });
            await this.prisma.teamMember.delete({
                where: {
                    userId_teamId: {
                        userId: user!.id,
                        teamId,
                    },
                },
            });
        });

        added.forEach(async (member) => {
            const user = await this.prisma.user.findUnique({
                where: {
                    githubid: member,
                },
            });
            if (user == null) {
                return;
            }
            const invite = await this.prisma.invite.create({
                data: {
                    eventId: team!.eventId,
                    teamId,
                    userId: user.id,
                },
            });
            const data = {
                name: user.name || user.githubid,
                lead: team!.members.find((mem) => mem.role === 'LEADER')?.user.name || '',
                teamName: team!.name,
                teamID: teamId,
                inviteCode: invite.id,
            };

            // eslint-disable-next-line consistent-return
            return this.mailService.sendMemberInvited({
                data,
                email: user.email,
            });
        });
    }
}
