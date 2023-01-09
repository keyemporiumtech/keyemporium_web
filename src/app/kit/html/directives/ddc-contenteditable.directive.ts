import {
	Directive,
	Input,
	Output,
	ElementRef,
	HostListener,
	OnChanges,
	SimpleChanges,
	EventEmitter,
	SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
	selector: '[ddcContenteditable]',
})
export class DdcContenteditableDirective implements OnChanges {
	// eslint-disable-next-line @angular-eslint/no-input-rename
	@Input('model') model: any = '';
	// eslint-disable-next-line @angular-eslint/no-output-rename
	@Output('update') update = new EventEmitter();
	// eslint-disable-next-line @angular-eslint/no-input-rename
	@Input('html') html?: boolean = true;

	private lastViewModel: any;

	constructor(private elRef: ElementRef, private _sanitizer: DomSanitizer) {}

	private refreshView() {
		const newContent = this.sanitize(this.model);
		if (newContent !== this.elRef.nativeElement[this.getProperty()]) {
			this.elRef.nativeElement[this.getProperty()] = newContent;
		}
		this.moveCaret();
	}

	@HostListener('blur') onBlur() {
		const value = this.elRef.nativeElement[this.getProperty()];
		this.lastViewModel = value;
		this.update.emit(value);
	}

	@HostListener('keyup') onKeyup() {
		const value = this.elRef.nativeElement[this.getProperty()];
		this.lastViewModel = value;
		this.update.emit(value);
	}

	@HostListener('paste') onPaste() {
		if (!this.html) {
			// For text-only contenteditable, remove pasted HTML.
			// 1 tick wait is required for DOM update
			setTimeout(() => {
				if (this.elRef.nativeElement.innerHTML !== this.elRef.nativeElement.innerText) {
					this.elRef.nativeElement.innerHTML = this.elRef.nativeElement.innerText;
				}
			});
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.model && changes.model.currentValue !== this.lastViewModel) {
			this.lastViewModel = this.model;
			this.refreshView();
		}
	}

	private getProperty(): string {
		return this.html ? 'innerHTML' : 'innerText';
	}

	private sanitize(content: string): string {
		return this.html ? this._sanitizer.sanitize(SecurityContext.HTML, content) : content;
	}

	private moveCaret(): void {
		if (this.elRef && this.elRef.nativeElement && this.elRef.nativeElement.lastChild) {
			const range = document.createRange(),
				pos = this.elRef.nativeElement.lastChild.textContent.length,
				sel = window.getSelection();

			range.setStart(this.elRef.nativeElement.firstChild, pos);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}
}
