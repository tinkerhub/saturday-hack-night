import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';

@Module({
    controllers: [CollegeController],
    providers: [CollegeService, PrismaService],
})
export class CollegeModule {}
