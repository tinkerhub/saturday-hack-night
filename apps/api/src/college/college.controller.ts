import { Controller, Get, Query } from '@nestjs/common';
import { CollegeService } from './college.service';

@Controller()
export class CollegeController {
    constructor(private readonly collegeService: CollegeService) {}

    @Get('college')
    async getCollegeName(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.collegeService.getCollegeName(search, limit, page);
    }
}
