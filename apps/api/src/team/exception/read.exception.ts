import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "User don't have permission" }, HttpStatus.BAD_REQUEST);
        // eslint-disable-next-line no-console
        console.log({ err });
    }
}
