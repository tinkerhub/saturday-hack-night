import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class EventService {
    constructor(private readonly prismaService: PrismaService) {}

    Success(resp: Resp) {
        return {
            success: true,
            message: resp.message,
            data: resp.data,
        };
    }

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
        return this.Success({
            message: 'Event read successfully',
            data,
        });
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
                _count: {
                    select: {
                        teams: true,
                        participants: true,
                    },
                },
            },
        });
        return this.Success({
            message: 'Event read successfully',
            data,
        });
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
            return this.Success({
                message: 'No Projects found',
                data: [],
            });
        }
        const projects = data.map((team) => ({
            name: team.name,
            repo: team.repo,
            projectStatus: team.projectStatus,
            members: team.members.map((member) => ({
                name: member.user.name,
                githubid: member.user.githubid,
                avatar: member.user.avatar,
            })),
        }));
        return this.Success({
            message: 'Projects read successfully',
            data: projects,
        });
    }
}
