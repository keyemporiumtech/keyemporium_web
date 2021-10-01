import { RouteUrlModel } from '@ddc/kit';

export class ResponseMessageRoutingModel {
	constructor(public flg: boolean, public urlBack?: RouteUrlModel, public urlTo?: RouteUrlModel) {}
}
