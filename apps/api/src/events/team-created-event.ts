export class TeamCreatedEvent {
    constructor(
        public readonly teamId: string,
        public readonly members: {
            role: string;
            user: {
                name: string | null;
                email: string;
                githubid: string;
            };
        }[],
    ) {}
}
