import { restConstants } from '../constants/rest.constants';
import { ApiService } from './api.service';

/**
 * Questa classe va estesa per consentire l'invio del token per l'applicazione che genera
 * i codici di autenticazione a due fattori
 */
export class ApiKeysService extends ApiService {
	getRequestValueForAppTokenAuthentication(): string {
		return this.flgInnerToken ? restConstants.innertokenKey : restConstants.clienttokenKey;
	}
}
