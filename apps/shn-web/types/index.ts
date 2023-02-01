export type User = {
    id: string;
    email: string;
    githubid: string;
    name?: string;
    mobile?: string;
    avatar: string;
    district?: string;
    college?: {
        id: string;
        name: string;
    };
};

export type Child = {
    children: React.ReactNode;
};

export type Event = {
    id: string;
    title: string;
    description: string;
    image: string;
    details: string;
    date: Date;
    location: string;
    status: string;
    created_at: Date;
};

export type Team = {
    id: string;
    name: string;
    repo: string;
    eventId: string;
    pitchStatus: string;
    projectStatus: string;
    created_at: Date;
};
