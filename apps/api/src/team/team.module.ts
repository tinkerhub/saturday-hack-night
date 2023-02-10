import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
    controllers: [TeamController],
    providers: [TeamService],
})
export class TeamModule {}
