import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadException extends HttpException {
    constructor(err: any) {
        super(
            { success: false, error: 'You are not authorised to update points' },
            HttpStatus.BAD_REQUEST,
        );
        // eslint-disable-next-line no-console
        console.log(err);
    }
}
