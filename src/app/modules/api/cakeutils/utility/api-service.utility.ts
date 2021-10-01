import { ResponseManagerInterface, RequestManagerInterface } from '@ddc/rest';
import { restConstants } from '../constants/rest.constants';
import { ApplicationStorageService } from '@ddc/kit';

export class ApiServiceUtility {
	static setTypeBody(
		type: string,
		requestManager?: RequestManagerInterface,
	): ResponseManagerInterface {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.responseType = type;
		return requestManager;
	}

	static sendTokenBuildRM(
		applicationStorage: ApplicationStorageService,
		responseManager?: ResponseManagerInterface,
	): ResponseManagerInterface {
		if (!responseManager) {
			responseManager = {};
		}
		if (!responseManager.tokenManager) {
			responseManager.tokenManager = {};
		}
		responseManager.tokenManager.tokenKeyRequest = restConstants.sessiontokenname;
		responseManager.tokenManager.tokenValue = applicationStorage.authtoken.get();
		return responseManager;
	}

	static receiveTokenBuildRM(responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		if (!responseManager.tokenManager) {
			responseManager.tokenManager = {};
		}
		responseManager.tokenManager.tokenKeyResponse = restConstants.sessiontokenname;
		return responseManager;
	}

	static handlePositiveMessage(responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		if (!responseManager.toMessage) {
			responseManager.toMessage = {};
		}
		responseManager.toMessage.handlePositiveMessage = true;
		return responseManager;
	}
}
