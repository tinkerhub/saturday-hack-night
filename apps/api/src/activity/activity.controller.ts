import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ReadException } from './exception/read.exception';

@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    @Get()
    async readAll() {
        try {
            return this.activityService.readAll();
        } catch (error) {
            throw new ReadException(error);
        }
    }

    @Get(':id')
    async readOne(@Param('id') id: string) {
        try {
            return this.activityService.read(id);
        } catch (error) {
            throw new ReadException(error);
        }
    }

    @Get('projects/:id')
    async readProjects(@Param('id') id: string) {
        try {
            return this.activityService.readProjects(id);
        } catch (error) {
            throw new ReadException(error);
        }
    }
}
