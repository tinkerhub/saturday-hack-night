import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    teamId: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    repo: string;

    @ApiProperty()
    @IsString()
    eventId: string;

    @ApiProperty()
    @IsArray()
    members: string[];
}
