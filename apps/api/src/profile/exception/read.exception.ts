import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Could't Read User" }, HttpStatus.BAD_REQUEST);
        // eslint-disable-next-line no-console
        console.log(err);
    }
}
