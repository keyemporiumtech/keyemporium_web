import { ObjectUtility } from '@ddc/kit';
import { ResponseManagerInterface } from '../../response/interfaces/response-manager.interface';
import { RequestManagerInterface } from '../../request/interfaces/request-manager.interface';
import { InputQueryInterface } from '../interfaces/input-query.interface';

/**
 * Questa classe permette di mergiare gli oggetti conditions, requestManager e responseManager.
 * Vince su tutti l'oggetto InputQueryInterface, nel senso che va a sovrascrivere le proprietà degli altri.
 * Mentre nella lista degli altri oggetti l'ordine di priorità è sempre bottom-up, nel senso che vince l'ultimo sui precedenti.
 *
 * @example
 * inputQuery: {id: 1, flag: false}; obj1: {id: 2, valore: 'due' } = {id: 1, flag:false, valore: 'due'}
 * obj1: {id: 2, valore: 'due', flag: true }; obj2: {id: 3, valore: 'tre' } = {id: 3, flag:true, valore: 'tre'}
 */
export class QueryUtility {
	static HANDLE_POSITIVE_RES: ResponseManagerInterface = {
		toMessage: { handlePositiveMessage: true },
	};
	static SKIP_ERROR_RES: ResponseManagerInterface = {
		toMessage: { skipError: true },
	};
	static SET_EMPTY_IF_NULL: ResponseManagerInterface = { setEmptyModelIfNull: true };
	static FN_ERROR(fnError: () => any): ResponseManagerInterface {
		return {
			fnError: {
				flag: true,
				fn: fnError,
			},
		};
	}

	static fnRequestManager(
		inputQuery: InputQueryInterface,
		...requestDefault: RequestManagerInterface[]
	): RequestManagerInterface {
		if (inputQuery && inputQuery.requestManager) {
			return ObjectUtility.mergeDeep({}, ...requestDefault, inputQuery.requestManager);
		} else if (requestDefault && requestDefault.length) {
			return ObjectUtility.mergeDeep({}, ...requestDefault);
		}
		return undefined;
	}

	static fnResponseManager(
		inputQuery: InputQueryInterface,
		...responseDefault: ResponseManagerInterface[]
	): ResponseManagerInterface {
		if (inputQuery && inputQuery.responseManager) {
			return ObjectUtility.mergeDeep({}, ...responseDefault, inputQuery.responseManager);
		} else if (responseDefault && responseDefault.length) {
			return ObjectUtility.mergeDeep({}, ...responseDefault);
		}
		return undefined;
	}
}
