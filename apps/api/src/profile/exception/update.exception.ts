import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: err }, HttpStatus.BAD_REQUEST);
    }
}
