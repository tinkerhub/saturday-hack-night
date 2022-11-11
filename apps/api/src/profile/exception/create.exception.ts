import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Could'nt create user" }, HttpStatus.BAD_REQUEST);
        throw err;
    }
}
