import { RouteUrlModel } from '../../routing/models/route-url.model';
import { ArrowFunctionInterface } from './arrow-function.interface';

/**
 * Gestisce le proprietà per il comportamento di una risposta di tipo ok o ko
 */
export interface BehaviourResponseInterface {
	param_redirect?: string;
	url_redirect_ok?: RouteUrlModel;
	url_redirect_ko?: RouteUrlModel;
	behaviour_ok?: (input?: any) => any | ArrowFunctionInterface;
	behaviour_ko?: (input?: any) => any | ArrowFunctionInterface;
}
