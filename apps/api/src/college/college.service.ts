import { Injectable } from '@nestjs/common';
import { College } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CollegeService {
    constructor(private prismaService: PrismaService) {}

    async getCollegeName(cname: string, limit: string, page: string): Promise<College[]> {
        const data = await this.prismaService.college.findMany({
            where: {
                name: {
                    contains: cname,
                    mode: 'insensitive',
                },
            },
        });

        const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const endIndex = parseInt(page, 10) * parseInt(limit, 10);
        return data.slice(startIndex, endIndex);
    }
}
