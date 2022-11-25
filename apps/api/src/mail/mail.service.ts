import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendTeamCreated({ data, email }: TeamCreatedContext) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Welcome to this week's Saturday Hack Night",
            template: './create',
            context: data,
        });
    }

    async sendMemberInvited({ data, email }: MemberInvitedContext) {
        await this.mailerService.sendMail({
            to: email,
            subject: "You've been invited to join a team",
            template: './invite',
            context: data,
        });
    }
}
interface TeamCreatedContext {
    data: { name: string; teamName: string; repoUrl: string; teamID: string; inviteCode: string };
    email: string;
}

interface MemberInvitedContext {
    data: { name: string; lead: string; teamName: string; teamID: string; eventID: string };
    email: string;
}
