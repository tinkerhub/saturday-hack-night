import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
    @Get()
    @UseGuards(new AuthGuard())
    getHello(): string {
        return 'Hello World!';
    }
}
