import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
    constructor(private readonly prismaService: PrismaService) {}

    async read(id: string) {
        const data = await this.prismaService.event.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                image: true,
                location: true,
                status: true,
                details: true,
                _count: {
                    select: {
                        teams: true,
                        participants: true,
                    },
                },
            },
        });
        return {
            message: 'Event read successfully',
            data,
        };
    }

    async readAll() {
        const data = await this.prismaService.event.findMany({
            orderBy: {
                date: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                image: true,
                location: true,
                status: true,
                details: true,
                teams: {
                    select: {
                        projectStatus: true,
                    },
                },
                _count: {
                    select: {
                        teams: true,
                    },
                },
            },
        });
        const res = data.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            image: event.image,
            location: event.location,
            status: event.status,
            details: event.details,
            // eslint-disable-next-line no-underscore-dangle
            _count: event._count,
            projects: (() => {
                const { teams } = event;
                return teams.filter(
                    (team) =>
                        team.projectStatus === 'COMPLETE' || team.projectStatus === 'BEST PROJECT',
                ).length;
            })(),
        }));

        return {
            message: 'Event read successfully',
            data: res,
        };
    }

    async readProjects(id: string) {
        const data = await this.prismaService.team.findMany({
            where: {
                eventId: id,
                projectStatus: {
                    in: ['COMPLETE', 'BEST PROJECT'],
                },
            },
            select: {
                name: true,
                repo: true,
                projectStatus: true,
                members: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                githubid: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                projectStatus: 'asc',
            },
        });

        if (data.length === 0) {
            return {
                message: 'No Projects found',
                data: [],
            };
        }
        const projects = data.map(
            (team: {
                name: string;
                repo: string;
                projectStatus: string;
                members: {
                    user: {
                        name: string | null;
                        githubid: string;
                        avatar: string;
                    };
                }[];
            }) => ({
                name: team.name,
                repo: team.repo,
                projectStatus: team.projectStatus,
                members: team.members.map(
                    (member: {
                        user: {
                            name: string | null;
                            githubid: string;
                            avatar: string;
                        };
                    }) => ({
                        name: member.user.name,
                        githubid: member.user.githubid,
                        avatar: member.user.avatar,
                    }),
                ),
            }),
        );
        return {
            message: 'Projects read successfully',
            data: projects,
        };
    }
}
