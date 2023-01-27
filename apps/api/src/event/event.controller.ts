import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { ReadException } from './exception/read.exception';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    async readAll() {
        try {
            return this.eventService.readAll();
        } catch (error) {
            throw new ReadException(error);
        }
    }

    @Get(':id')
    async readOne(@Param('id') id: string) {
        try {
            return this.eventService.read(id);
        } catch (error) {
            throw new ReadException(error);
        }
    }

    @Get('projects/:id')
    async readProjects(@Param('id') id: string) {
        try {
            return this.eventService.readProjects(id);
        } catch (error) {
            throw new ReadException(error);
        }
    }
}
