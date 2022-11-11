import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Couldn't update user" }, HttpStatus.BAD_REQUEST);
        throw err;
    }
}
