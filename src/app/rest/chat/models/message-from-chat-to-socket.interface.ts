import { EnumMessageExchangeType } from '../enums/message-exchange-type.enum';
/**
 * Messaggio che una Chat invia al socket
 */
export interface MessageFromChatToSocketInterface {
	type: EnumMessageExchangeType; // Tipi di messaggi che è possibile inviare o ricevere (EnumDDCMessageExchangeType)
	resourceId?: any;
	token?: string;
	notification?: number;
	message?: string;
	from?: string;
	to?: string;
	date?: string;
	status?: boolean;
}
