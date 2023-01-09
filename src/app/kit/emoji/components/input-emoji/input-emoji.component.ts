import {
	Component,
	OnInit,
	Input,
	OnChanges,
	Output,
	EventEmitter,
	ElementRef,
	ViewChild,
} from '@angular/core';
import { EmojiUtilService } from '../../services/emoji-util.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
	selector: 'ddc-init-input-emoji',
	templateUrl: './input-emoji.component.html',
	styleUrls: ['./input-emoji.component.scss'],
})
export class InputEmojiComponent implements OnInit, OnChanges {
	@Input() id;
	@Input() popupAnchor = 'top';
	@Input() model: any = '';
	@Output() modelChange: any = new EventEmitter();
	@Input() classInput: any;
	@Input() styleInput: any;
	@ViewChild('inputeditable', { static: false }) inputeditable: ElementRef;
	@Output() emitKeyEnter: EventEmitter<any> = new EventEmitter<any>();
	@Output() emitKeyPressCode: EventEmitter<any> = new EventEmitter<any>();

	input: string;
	filterEmojis: string;
	allEmojis: any[];
	categories: any[];
	currentEmojis: any[];
	popupOpen: boolean = false;
	// @Input() onEnter: any;
	textChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
	text: Observable<string> = this.textChange.asObservable();

	constructor(private emojiUtil: EmojiUtilService) {}

	ngOnInit() {
		this.input = '';
		this.filterEmojis = '';
		this.allEmojis = this.emojiUtil.getAll();
		this.categories = this.emojiUtil.getCategories();
		this.currentEmojis = this.categories[0].emojis;
		if (this.model) {
			this.onChange(this.model);
		}
	}

	ngOnChanges() {
		if (this.model !== this.input) {
			this.input = this.model;
		}
	}

	togglePopup() {
		this.popupOpen = !this.popupOpen;
	}

	clickCategory(index: number) {
		this.currentEmojis = this.categories[index].emojis;
	}

	getFilteredEmojis() {
		if (this.filterEmojis === '') {
			return this.currentEmojis;
		}

		return this.allEmojis.filter((e) => {
			if (e['name'].indexOf(this.filterEmojis) !== -1) {
				return true;
			}
			return false;
		});
	}

	onEmojiClick(e) {
		this.input = this.input + this.emojiUtil.emojifySingle(e) + ' ';
		this.model = this.input;
		this.modelChange.emit(this.input);
		this.popupOpen = false;
		this.textChange.next(this.model);
	}

	onChange(newValue) {
		this.input = this.emojiUtil.emojify(newValue);
		this.model = this.input;
		this.modelChange.emit(this.input);
		this.textChange.next(this.model);
	}

	onKeyEnter() {
		this.emitKeyEnter.emit(true);
	}
	onKeyPress(event: any) {
		this.emitKeyPressCode.emit(event.keyCode);
	}

	// TEXT
	getText(): string {
		return this.model;
	}
	getTextToSave(): string {
		return this.emojiUtil.replaceToShortname(this.model);
	}
	setText(val: string) {
		this.onChange(val);
	}
}
