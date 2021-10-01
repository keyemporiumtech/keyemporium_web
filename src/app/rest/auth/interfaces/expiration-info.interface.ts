import { DateModel } from '@ddc/kit';

export interface ExpirationInfo {
	createAt: DateModel;
	startAt: DateModel;
	expireAt: DateModel;
}
