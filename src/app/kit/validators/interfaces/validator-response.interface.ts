export interface ValidatorResponseInterface<T> {
	valid: boolean;
	payload: T;
	message: string;
}
