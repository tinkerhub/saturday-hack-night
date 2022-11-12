import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: err }, HttpStatus.BAD_REQUEST);
    }
}
