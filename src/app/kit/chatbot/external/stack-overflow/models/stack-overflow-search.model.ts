import { DateModel } from '../../../../timing/models/date.model';
import { StackOverflowError } from '../interfaces/stack-overflow.error';
import { StackOverflowOwnerModel } from './stack-overflow-owner.model';

export class StackOverflowSearchModel {
	tags?: string[];
	owner?: StackOverflowOwnerModel;
	is_answered?: boolean;
	view_count?: number;
	accepted_answer_id?: number;
	answer_count?: number;
	score?: number;
	last_activity_date?: number; // date
	creation_date?: number; // date
	last_edit_date?: number; // date
	question_id?: number;
	content_license?: string;
	link?: string;
	title?: string;
	error?: StackOverflowError;

	get dtaLastActivity(): DateModel {
		return new DateModel(this.last_activity_date * 1000);
	}
	get dtaCreation(): DateModel {
		return new DateModel(this.creation_date * 1000);
	}
	get dtaLastEdit(): DateModel {
		return new DateModel(this.last_edit_date * 1000);
	}
}
