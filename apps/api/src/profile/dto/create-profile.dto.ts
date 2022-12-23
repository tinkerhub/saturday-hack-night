import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    authid: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    githubid: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    @IsString()
    collegeId?: string;

    @ApiProperty()
    @IsString()
    district?: string;

    @ApiProperty()
    @IsString()
    mobile?: string;
}
