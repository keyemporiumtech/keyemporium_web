import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'escapeurl', pure: false })
export class EscapeUrlPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}

	transform(value: any, args: any[] = []): SafeResourceUrl {
		// Escape 'value' and return it
		return this._sanitizer.bypassSecurityTrustResourceUrl(value);
	}
}
