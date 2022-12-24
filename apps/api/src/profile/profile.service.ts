import { Injectable } from '@nestjs/common';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    Success(resp: Resp) {
        return {
            Success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async read(authid: string) {
        const data = await this.prisma.user.findUnique({
            where: {
                authid,
            },
            include: {
                college: true,
            },
        });
        return this.Success({
            message: 'User read successfully',
            data,
        });
    }

    async create(createProfileDto: CreateProfileDto) {
        const resp = await this.read(createProfileDto.authid);
        if (resp.data != null) {
            return new CreateException('User already exists');
        }
        const data = await this.prisma.user.create({
            data: createProfileDto,
        });
        return this.Success({
            message: 'User created successfully',
            data,
        });
    }

    async update(updateProfileDto: UpdateProfileDto, authid: string) {
        const resp = await this.read(authid);
        if (resp.data == null) {
            throw new UpdateException('User does not exist');
        }
        const data = await this.prisma.user.update({
            where: {
                authid,
            },
            include: {
                college: true,
                participated: true,
            },
            data: updateProfileDto,
        });
        return this.Success({
            message: 'User updated successfully',
            data,
        });
    }
}
