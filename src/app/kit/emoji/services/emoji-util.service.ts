import { Injectable } from '@angular/core';
import { EmojiBuilderUtil } from '../utils/emoji-builder.util';

/* eslint-disable no-useless-escape */
const PARSE_REGEX = /:([a-zA-Z0-9_\-\+]+):/g;

@Injectable({
	providedIn: 'root',
})
export class EmojiUtilService {
	emojiBuilder: EmojiBuilderUtil;

	constructor() {
		this.emojiBuilder = new EmojiBuilderUtil();
	}

	public getAll() {
		return this.emojiBuilder.emoticons;
	}

	public getCategories() {
		return this.emojiBuilder.emoticonsCategory;
	}

	public emojify(str) {
		return str
			.split(PARSE_REGEX)
			.map((emoji, index) => {
				// Return every second element as an emoji
				if (index % 2 === 0) {
					return emoji;
				}
				return this.emojiBuilder.getHtmlByShortname(':' + emoji + ':');
			})
			.join('');
	}

	public emojifySingle(str: string) {
		return this.emojiBuilder.getHtmlByShortname(str);
	}

	public replaceToShortname(text: string) {
		return this.emojiBuilder.replaceEmojiWithShortname(text);
	}

	public replaceToEmoji(text: string) {
		return this.emojiBuilder.replaceShortnameWithEmoji(text);
	}
}
