import { SessionContainer } from 'supertokens-node/recipe/session';
import { Controller, Post, Body, Patch, UseGuards, Param, Get } from '@nestjs/common';
import { Session } from 'src/auth/session.decorator';
import { ReadException } from './exception/read.exception';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    @UseGuards(new AuthGuard())
    create(@Session() session: SessionContainer, @Body() createTeamDto: CreateTeamDto) {
        let authId: string;
        try {
            authId = session.getUserId();
            return this.teamService.create(createTeamDto, authId);
        } catch (err) {
            return new CreateException(err);
        }
    }

    @Patch()
    @UseGuards(new AuthGuard())
    update(@Session() session: SessionContainer, @Body() updateTeamDto: UpdateTeamDto) {
        let authId: string;
        try {
            authId = session.getUserId();
            return this.teamService.update(authId, updateTeamDto);
        } catch (err) {
            return new UpdateException(err);
        }
    }

    @Post('join/:id')
    @UseGuards(new AuthGuard())
    join(@Session() session: SessionContainer, @Param('id') inviteCode: string) {
        let authId: string;
        try {
            authId = session.getUserId();
            return this.teamService.join(authId, inviteCode);
        } catch (err) {
            return new UpdateException(err);
        }
    }

    @Get(':eventId')
    @UseGuards(new AuthGuard())
    get(@Session() session: SessionContainer, @Param('eventId') eventId: string) {
        let authId: string;
        try {
            authId = session.getUserId();
            return this.teamService.read(eventId, authId);
        } catch (err) {
            return new ReadException(err);
        }
    }
}
