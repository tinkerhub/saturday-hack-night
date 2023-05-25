import { Injectable } from '@nestjs/common';
import { ReadException } from './exception/read.exception';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PointService {
    constructor(private readonly prisma: PrismaService) {}

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
        return {
            message: 'Points table updated',
        };
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

        return {
            message: 'College points',
            data: collegePoints,
        };
    }

    async getUsersPoints() {
        const points = await this.prisma.points.findMany({
            take: 10,
            select: {
                user: {
                    select: {
                        name: true,
                        id: true,
                        avatar: true,
                        githubid: true,
                        college: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                points: true,
            },
            orderBy: {
                points: 'desc',
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
        points.forEach((point) => {
            if (point.user) {
                userPoints.push({
                    id: point.user.id,
                    name: point.user.name || null,
                    githubid: point.user.githubid,
                    avatar: point.user.avatar,
                    college: point.user.college?.name || null,
                    points: point.points,
                });
            }
        });
        return {
            message: 'User points',
            data: userPoints,
        };
    }
}
