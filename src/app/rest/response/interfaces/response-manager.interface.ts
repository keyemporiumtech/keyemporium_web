import { ArrowFunctionInterface } from '@ddc/kit';
import { ResponseMessageInterface } from './response-message.interface';
import { ResponseTokenInterface } from './response-token.interface';

export interface ResponseManagerInterface {
	toMessage?: ResponseMessageInterface;
	tokenManager?: ResponseTokenInterface;
	fnOk?: ArrowFunctionInterface;
	fnError?: ArrowFunctionInterface;
	setEmptyModelIfNull?: boolean;
	others?: any;
}
