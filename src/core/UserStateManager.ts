export type UserState = 'AWAITING_NUTRITION_DATA' | 'NONE';

export class UserStateManagerClass {
	private userStates: Map<number, UserState>;
	private static instance: UserStateManagerClass;

	constructor() {
		this.userStates = new Map();
	}

	public static getInstance(): UserStateManagerClass {
		if (!UserStateManagerClass.instance) {
			UserStateManagerClass.instance = new UserStateManagerClass();
		}

		return UserStateManagerClass.instance;
	}

	setUserState(userId: number, state: UserState): void {
		this.userStates.set(userId, state);
	}

	getUserState(userId: number): UserState {
		return this.userStates.get(userId) || 'NONE';
	}
}

export const UserStateManager = UserStateManagerClass.getInstance();
