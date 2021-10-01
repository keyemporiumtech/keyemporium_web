import { PayloadInterface } from './payload.interface';

export interface TokenDecodeInterface {
	auth: boolean;
	message: string;
	header: any;
	payload: PayloadInterface;
	token: string; // Token ricevuto
	tokenSended: string;
}
