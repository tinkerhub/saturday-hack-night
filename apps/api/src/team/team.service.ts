import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { TeamMemberRole } from '@prisma/client';
import { TeamUpdatedEvent } from 'src/events/team-updated-event';
import { MailService } from 'src/mail/mail.service';
import { TeamCreatedEvent } from '../events/team-created-event';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';

interface Resp {
    message: string;
    data?: any;
}

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
                authid: authId,
            },
        });
        if (user == null) {
            return new UpdateException('User not Authenticated');
        }
        const tempTeam = await this.prisma.team.findUnique({
            where: {
                inviteCode,
            },
        });
        if (tempTeam == null) {
            return new UpdateException('Invalid invite code');
        }
        try {
            const res = await this.prisma.team.update({
                where: {
                    inviteCode,
                },
                data: {
                    members: {
                        create: {
                            role: TeamMemberRole.MEMBER,
                            userId: authId,
                            activityId: tempTeam.activityId,
                        },
                    },
                },
            });
            return this.Success({
                message: 'Team joined successfully',
                data: res,
            });
        } catch (error) {
            return new UpdateException('User already in a Team');
        }
    }

    Success(resp: Resp) {
        return {
            Success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async create(createTeamDto: CreateTeamDto, authid: string) {
        const { activityId, name, repo } = createTeamDto;
        const { data } = await this.read(activityId, authid);
        if (data != null) {
            return new CreateException('User already in a Team');
        }
        const res = await this.prisma.team.create({
            data: {
                name,
                repo,
                activityId,
                members: {
                    create: {
                        role: TeamMemberRole.LEADER,
                        userId: authid,
                        activityId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                repo: true,
                inviteCode: true,
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
        this.eventEmitter.emit('team.create', new TeamCreatedEvent(res.id, res.members));
        return this.Success({
            message: 'Team created successfully',
            data: res,
        });
    }

    async read(activityId: string, authid: string) {
        const data = await this.prisma.teamMember.findFirst({
            where: {
                userId: authid,
                activityId,
            },
        });
        return this.Success({
            message: 'Team Read successfully',
            data,
        });
    }

    async update(authid: string, updateTeamDto: UpdateTeamDto) {
        const { teamId, members } = updateTeamDto;
        const res = await this.findOne(teamId!);
        if (res.data == null) {
            return new UpdateException("Team Doesn't exist found");
        }
        const member = res.data.members as string[];
        const isLeader = member.find(
            (mem: any) => mem.role === TeamMemberRole.LEADER && mem.user.authid === authid,
        );
        if (isLeader == null) {
            return new UpdateException("User don't have permission to update");
        }
        this.eventEmitter.emit('team.update', new TeamUpdatedEvent(teamId!, members || []));
        return this.Success({
            message: 'Team updated successfully',
            data: res.data,
        });
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
                                authid: true,
                                githubid: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        return this.Success({
            message: 'Team Read successfully',
            data: typeof data === 'undefined' ? null : data,
        });
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
            if (member.role === TeamMemberRole.LEADER) {
                const data = {
                    name: member.user.name || member.user.githubid,
                    teamName: team.name,
                    repoUrl: team.repo,
                    teamID: team.id,
                    inviteCode: team.inviteCode,
                };
                await this.mailService.sendTeamCreated({
                    data,
                    email: member.user.email,
                });
            } else {
                const data = {
                    name: member.user.name || member.user.githubid,
                    lead:
                        members.find((mem) => mem.role === TeamMemberRole.LEADER)?.user.name || '',
                    teamName: team.name,
                    teamID: team.id,
                    eventID: team.activityId,
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
                activityId: true,
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
        if (team == null) {
            return;
        }
        const added = members.filter((mem) => !team.members.find((m) => m.user.id === mem));
        added.forEach(async (member) => {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: member,
                },
            });
            if (user == null) {
                return;
            }
            const data = {
                name: user.name || user.githubid,
                lead:
                    team.members.find((mem) => mem.role === TeamMemberRole.LEADER)?.user.name || '',
                teamName: team.name,
                teamID: team.id,
                eventID: team.activityId,
            };
            await this.mailService.sendMemberInvited({
                data,
                email: user.email,
            });
        });
    }
}
