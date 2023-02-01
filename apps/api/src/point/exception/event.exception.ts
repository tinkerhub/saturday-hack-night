import { HttpException, HttpStatus } from '@nestjs/common';

export class EventException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: 'Event ID is Required' }, HttpStatus.BAD_REQUEST);
        // eslint-disable-next-line no-console
        console.log(err);
    }
}
