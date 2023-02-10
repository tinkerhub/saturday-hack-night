import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Could't create User" }, HttpStatus.BAD_REQUEST);
        // eslint-disable-next-line no-console
        console.log(err);
    }
}
