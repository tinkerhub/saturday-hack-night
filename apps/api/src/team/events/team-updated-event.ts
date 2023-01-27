export class TeamUpdatedEvent {
    constructor(public readonly teamId: string, public readonly members: string[]) {}
}
