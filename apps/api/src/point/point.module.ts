import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';

@Module({
    providers: [PointService],
    imports: [],
    controllers: [PointController],
})
export class PointModule {}
