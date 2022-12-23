export type User = {
    id: string;
    authid: string;
    email: string;
    githubId: string;
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
