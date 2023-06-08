import { KeyvalueObject } from '@ddc/kit';
import { ResponseTokenInterface } from '../../response/interfaces/response-token.interface';
import { RequestStorageInterface } from './request-storage.interface';

export interface RequestManagerInterface {
	storage?: RequestStorageInterface;
	tokenManager?: ResponseTokenInterface;
	responseType?: string;
	url?: string;
	skipInternalDb?: boolean;
	headerParams?: KeyvalueObject[];
	others?: any;
}
