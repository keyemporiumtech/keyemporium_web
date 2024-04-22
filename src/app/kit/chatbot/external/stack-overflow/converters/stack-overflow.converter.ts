import { ObjectUtility } from '../../../../config/utility/object.utility';
import { ChatbotMessageInterface } from '../../../interfaces/chatbot-message.interface';
import { StackOverflowFilter } from '../interfaces/stack-overflow.filter';
import { StackOverflowPayload } from '../interfaces/stack-overflow.payload';
import { StackOverflowSearchModel } from '../models/stack-overflow-search.model';

export class StackOverflowConverter {
	// --- StackOverflowFilter
	buildFilters(filters?: StackOverflowFilter) {
		return ObjectUtility.objectParamsToUrl(filters);
	}

	// --- StackOverflowSearchModel
	convertStackOverflowSearchModel(res: StackOverflowSearchModel): ChatbotMessageInterface {
		if (!res) {
			return undefined;
		}
		if (res.error) {
			const message: ChatbotMessageInterface = { type: 'ERROR', value: '', payload: res.error };
			return message;
		}
		let value: string = '<a href="' + res.link + '" target="_blank">' + res.title + '</a>';
		const payload: StackOverflowPayload = {
			author: res.owner ? res.owner.display_name : undefined,
			author_image: res.owner ? res.owner.profile_image : undefined,
			author_page: res.owner ? res.owner.link : undefined,
			dtaLastActivity: res.dtaLastActivity,
			dtaCreation: res.dtaCreation,
			dtaLastEdit: res.dtaLastEdit,
			title: res.title,
			link: res.link,
		};
		value +=
			'<br/>by <a href="' + payload.author_page + '" target="_blank">' + payload.author + '</a>';
		const message: ChatbotMessageInterface = { type: 'IN', value: value, payload: payload };
		return message;
	}

	convertStackOverflowSearchModelList(res: StackOverflowSearchModel[]): ChatbotMessageInterface[] {
		return res.map((item) => this.convertStackOverflowSearchModel(item));
	}
}
