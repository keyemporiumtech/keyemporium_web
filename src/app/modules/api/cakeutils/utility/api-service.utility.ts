import { ApplicationStorageService } from '@ddc/kit';
import { RequestManagerInterface, ResponseManagerInterface } from '@ddc/rest';
import { restConstants } from '../constants/rest.constants';

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

	static sendUserInfo(requestManager?: RequestManagerInterface) {
		if (!requestManager) {
			requestManager = {};
		}
		if (!requestManager.others) {
			requestManager.others = {};
		}
		requestManager.others.sendUserInfo = true;
		return requestManager;
	}

	static sendActivityInfo(requestManager?: RequestManagerInterface) {
		if (!requestManager) {
			requestManager = {};
		}
		if (!requestManager.others) {
			requestManager.others = {};
		}
		requestManager.others.sendActivityInfo = true;
		return requestManager;
	}

	static isSendUserInfo(requestManager?: RequestManagerInterface) {
		return requestManager && requestManager.others && requestManager.others.sendUserInfo;
	}
	static isSendActivityInfo(requestManager?: RequestManagerInterface) {
		return requestManager && requestManager.others && requestManager.others.sendActivityInfo;
	}
}
