import { Controller, Get, Param, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { PointService } from './point.service';
import { ReadException } from './exception/read.exception';
import { EventException } from './exception/event.exception';

@Controller('points')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Post(':id')
    @UseGuards(AuthGuard)
    async updatePoints(@Session() session: SessionContainer, @Param('id') eventId: string) {
        if (!eventId || eventId === '') {
            throw new EventException('Event id is required');
        }
        const user = await session.getUserId();
        const { metadata } = await UserMetadata.getUserMetadata(user);
        if (metadata.role !== 'admin') {
            throw new ReadException('You are not authorized to update points');
        }
        await this.pointService.updatePoints(eventId);
        return this.pointService.Success({
            message: 'Points updated',
        });
    }

    @Get('college')
    async getCollegePoints() {
        return this.pointService.Success({
            message: 'College points',
            data: await this.pointService.getCollegePoints(),
        });
    }

    @Get('user')
    async getUserPoints() {
        return this.pointService.Success({
            message: 'User points',
            data: await this.pointService.getUsersPoints(),
        });
    }
}
