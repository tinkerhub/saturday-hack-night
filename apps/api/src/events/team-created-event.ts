import { TeamMemberRole } from '@prisma/client';

export class TeamCreatedEvent {
    constructor(
        public readonly teamId: string,
        public readonly members: {
            role: TeamMemberRole;
            user: {
                name: string | null;
                email: string;
                githubid: string;
            };
        }[],
    ) {}
}
