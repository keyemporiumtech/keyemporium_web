import { emojiCategories, emojiList } from './emoji.dblist';

export class EmojiBuilderUtil {
	private _emoticonsCategory: any[] = []; // tutte le categorie di emoji
	private _emoticons: any[] = []; // tutte le emoji

	constructor() {
		this.emoticons = emojiList;
		this.buildEmojiCategories();
	}

	private buildEmojiCategories() {
		for (const cat of emojiCategories) {
			const obj: any = {};
			obj.id = cat.category;
			obj.icon = cat;
			obj.title = '';
			obj.emojis = emojiList.filter((el) => el.category === cat.category);
			this.emoticonsCategory.push(obj);
		}
	}

	replaceEmojiWithShortname(text: string) {
		let newText = text;
		for (const el of this.emoticons) {
			if (el.emoji && el.emoji !== '' && text.indexOf(el.emoji) !== -1) {
				newText = newText.replace(el.emoji, el.shortname);
			}
		}
		return newText;
	}

	replaceShortnameWithEmoji(text: string) {
		let newText = text;
		for (const el of this.emoticons) {
			if (el.shortname && el.shortname !== '' && text.indexOf(el.shortname) !== -1) {
				newText = newText.replace(el.shortname, el.html);
			}
		}
		return newText;
	}

	getHtmlByShortname(shortname: string) {
		const emoticon = this.emoticons.find((el) => el.shortname === shortname);
		return emoticon ? emoticon.html : '';
	}

	/**
	 * Getter emoticonsCategory
	 * @return any[]
	 */
	public get emoticonsCategory(): any[] {
		return this._emoticonsCategory;
	}

	/**
	 * Getter emoticons
	 * @return any[]
	 */
	public get emoticons(): any[] {
		return this._emoticons;
	}

	/**
	 * Setter emoticonsCategory
	 * @param any[] value
	 */
	public set emoticonsCategory(value: any[]) {
		this._emoticonsCategory = value;
	}

	/**
	 * Setter emoticons
	 * @param any[] value
	 */
	public set emoticons(value: any[]) {
		this._emoticons = value;
	}
}
