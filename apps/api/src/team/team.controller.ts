import { SessionContainer } from 'supertokens-node/recipe/session';
import { Controller, Post, Body, Patch, UseGuards, Param, Get } from '@nestjs/common';
import { Session } from 'src/auth/session.decorator';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    @UseGuards(new AuthGuard())
    create(@Session() session: SessionContainer, @Body() createTeamDto: CreateTeamDto) {
        const authId = session.getUserId();
        return this.teamService.create(createTeamDto, authId);
    }

    @Patch()
    @UseGuards(new AuthGuard())
    update(@Session() session: SessionContainer, @Body() updateTeamDto: UpdateTeamDto) {
        const authId = session.getUserId();
        return this.teamService.update(authId, updateTeamDto);
    }

    @Post('join/:id')
    @UseGuards(new AuthGuard())
    join(@Session() session: SessionContainer, @Param('id') inviteCode: string) {
        const authId = session.getUserId();
        return this.teamService.join(authId, inviteCode);
    }

    @Get(':eventId')
    @UseGuards(new AuthGuard())
    get(@Session() session: SessionContainer, @Param('eventId') eventId: string) {
        const authId = session.getUserId();
        return this.teamService.read(eventId, authId);
    }
}
