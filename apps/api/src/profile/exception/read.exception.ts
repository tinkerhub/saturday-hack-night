import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Couldn't read user" }, HttpStatus.BAD_REQUEST);
        throw err;
    }
}
