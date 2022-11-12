import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Couldn't read Activity" }, HttpStatus.BAD_REQUEST);
        throw err;
    }
}
