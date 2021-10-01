import { ResponseTokenInterface } from './response-token.interface';
import { ResponseMessageInterface } from './response-message.interface';
import { ArrowFunctionInterface } from '@ddc/kit';

export interface ResponseManagerInterface {
	toMessage?: ResponseMessageInterface;
	tokenManager?: ResponseTokenInterface;
	fnOk?: ArrowFunctionInterface;
	fnError?: ArrowFunctionInterface;
	setEmptyModelIfNull?: boolean;
}
