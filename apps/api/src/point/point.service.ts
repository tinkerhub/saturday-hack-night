import { Injectable } from '@nestjs/common';
import { ReadException } from './exception/read.exception';
import { PrismaService } from '../prisma/prisma.service';

interface Resp {
    message: string;
    data?: any;
}
@Injectable()
export class PointService {
    constructor(private readonly prisma: PrismaService) {}

    Success(resp: Resp) {
        return {
            success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async updatePoints(eventId: string) {
        const event = await this.prisma.event.findUnique({
            where: {
                id: eventId,
            },
        });
        if (!event) {
            throw new ReadException('Event not found');
        }
        const teams = await this.prisma.team.findMany({
            where: {
                eventId,
            },
            select: {
                projectStatus: true,
                pitchStatus: true,
                completionTime: true,
                eventId: true,
                members: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                collegeId: true,
                            },
                        },
                    },
                },
            },
        });
        const newPoints: {
            collegeId: string | null;
            userId: string;
            eventId: string;
            points: number;
        }[] = [];
        teams.forEach((team) => {
            let points = 0;
            if (team.completionTime === 'LATE') return;
            if (team.projectStatus === 'COMPLETED') points += 100;
            if (team.projectStatus === 'BEST PROJECT') points += 200;
            if (team.projectStatus === 'DROPPED') points -= 50;
            if (team.pitchStatus === 'COMPLETED') points += 100;
            if (team.pitchStatus === 'ABSENT') points -= 50;
            team.members.forEach((member) => {
                // if (member.role === 'LEADER' && team.projectStatus !== 'DROPPED') finalPoints += 50;
                newPoints.push({
                    collegeId: member.user.collegeId,
                    userId: member.user.id,
                    eventId: team.eventId,
                    points,
                });
            });
        });
        await this.prisma.points.deleteMany({
            where: {
                eventId,
            },
        });
        await this.prisma.points.createMany({
            data: newPoints,
        });
        return this.Success({
            message: 'Points table updated',
        });
    }

    async getCollegePoints() {
        const points = await this.prisma.points.groupBy({
            by: ['collegeId'],
            _sum: {
                points: true,
            },
            orderBy: {
                _sum: {
                    points: 'desc',
                },
            },
            take: 10,
        });

        const college = await this.prisma.college.findMany({
            where: {
                id: {
                    in: points.map((point) => point.collegeId || ''),
                },
            },
            select: {
                id: true,
                name: true,
            },
        });

        const collegePoints: {
            points: number;
            id: string;
            name: string;
        }[] = [];
        points.forEach((point) => {
            if (point.collegeId) {
                collegePoints.push({
                    // eslint-disable-next-line no-underscore-dangle
                    points: point._sum.points || 0,
                    id: point.collegeId,
                    name: college.find((c) => c.id === point.collegeId)?.name || '',
                });
            }
        });

        return this.Success({
            message: 'College points',
            data: collegePoints,
        });
    }

    async getUsersPoints() {
        const tempPonts = await this.prisma.points.groupBy({
            by: ['userId'],
            _sum: {
                points: true,
            },
            _count: {
                eventId: true,
            },
            orderBy: [
                {
                    _sum: {
                        points: 'desc',
                    },
                },
                {
                    _count: {
                        eventId: 'asc',
                    },
                },
            ],
            take: 10,
        });
        const ids = tempPonts.map((point) => point.userId);
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            select: {
                id: true,
                name: true,
                githubid: true,
                avatar: true,
                college: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        const userPoints: {
            id: string;
            name: string | null;
            githubid: string;
            avatar: string;
            college: string | null;
            points: number;
        }[] = [];
        users.forEach((user) => {
            const point = tempPonts.find((p) => p.userId === user.id);
            userPoints.push({
                id: user.id,
                name: user.name || null,
                githubid: user.githubid,
                avatar: user.avatar,
                college: user.college?.name || null,
                points: point?._sum.points || 0,
            });
        });
        userPoints.sort((a, b) => b.points - a.points);
        return this.Success({
            message: 'User points',
            data: userPoints,
        });
    }
}
