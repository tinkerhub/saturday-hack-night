import { Body, Controller, Get, Param, Patch, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @UseGuards(new AuthGuard())
    async read(@Session() session: SessionContainer) {
        let authId: string = session.getUserId();
        return await this.profileService.read(authId);
    }

    @Patch()
    @UseGuards(new AuthGuard())
    async update(@Session() session: SessionContainer, @Body() updateProfileDto: UpdateProfileDto) {
        let authId: string = session.getUserId();
        return await this.profileService.update(updateProfileDto, authId);
    }

    @Get(':githubid')
    @UseGuards(new AuthGuard())
    async readByGithubId(@Param('githubid') githubid: string) {
        return await this.profileService.readByGithubId(githubid);
    }
}
