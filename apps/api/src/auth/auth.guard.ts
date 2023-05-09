import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';
import { Error as STError } from 'supertokens-node';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let ctx;
        let resp;
        try {
            ctx = context.switchToHttp();

            resp = ctx.getResponse();
            await verifySession({ sessionRequired: true })(ctx.getRequest(), resp);
        } catch (error) {
            if (resp.headersSent) {
                throw new STError({
                    message: 'RESPONSE_SENT',
                    type: 'RESPONSE_SENT',
                });
            } else {
                throw new HttpException(
                    {
                        message: 'Session Error',
                    },
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            }
        }
        return true;
    }
}
