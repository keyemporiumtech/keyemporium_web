import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'escapehtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}

	transform(value: any, args: any[] = []): SafeHtml {
		// Escape 'value' and return it
		return this._sanitizer.bypassSecurityTrustHtml(value);
	}
}
