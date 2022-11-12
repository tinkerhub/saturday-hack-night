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
        });
        return this.Success({
            message: 'Activities read successfully',
            data,
        });
    }
}
