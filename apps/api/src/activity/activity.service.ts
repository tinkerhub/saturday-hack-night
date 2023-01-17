import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class ActivityService {
    constructor(private readonly prismaService: PrismaService) {}

    Success(resp: Resp) {
        return {
            Success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async read(id: string) {
        const data = await this.prismaService.activity.findUnique({
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
            message: 'Activity read successfully',
            data,
        });
    }

    async readAll() {
        const data = await this.prismaService.activity.findMany({
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
            message: 'Activities read successfully',
            data,
        });
    }
}
