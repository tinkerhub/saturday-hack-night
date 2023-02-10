import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Couldn't update Team" }, HttpStatus.BAD_REQUEST);
        // eslint-disable-next-line no-console
        console.log(err);
    }
}
