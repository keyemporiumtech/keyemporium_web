import { RequestManagerInterface } from '@ddc/rest';

export class CaptchaUtility {
	static setTokenRequest(token: string, requestManager?: RequestManagerInterface) {
		if (!requestManager) {
			requestManager = {};
		}
		if (!requestManager.headerParams) {
			requestManager.headerParams = [];
		}
		requestManager.headerParams.push({
			key: 'captcha',
			value: token,
		});
		return requestManager;
	}
}
