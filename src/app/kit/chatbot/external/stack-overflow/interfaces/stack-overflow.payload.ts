import { DateModel } from '../../../../timing/models/date.model';

export interface StackOverflowPayload {
	author?: string;
	author_image?: string;
	author_page?: string;
	dtaLastActivity?: DateModel;
	dtaCreation?: DateModel;
	dtaLastEdit?: DateModel;
	title?: string;
	link?: string;
}
