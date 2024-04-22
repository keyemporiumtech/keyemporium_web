import { GojsLinkDataModel } from '../../../core/model/gojs-link-data.model';

export interface UmlLink extends GojsLinkDataModel {
	relationship?: string;
}
