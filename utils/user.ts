import type { User } from "lucia";

export const isProfileComplete = (user: User | null) => {
	return user?.name && user.collegeId && user.mobile;
};
