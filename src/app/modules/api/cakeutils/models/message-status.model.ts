import { EnumMessageType } from '@ddc/kit';
import { EnumStatusCode } from '../enums/status-code.enum';

export class MessageStatusModel {
	statusCod: EnumStatusCode;
	responseCod: number;
	applicationMessage: { cod; message; type?: EnumMessageType };
	exceptionMessage: { cod; message; type?: EnumMessageType };
}
