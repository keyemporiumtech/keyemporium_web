import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { FileService } from '../../services/file.service';

@Component({
	selector: 'ddc-init-download-file',
	templateUrl: './download-file.component.html',
	styleUrls: ['./download-file.component.scss'],
})
export class DownloadFileComponent extends BaseComponent {
	@Input() content: string;
	@Input() base64: string;
	@Input() mimetype: string;
	@Input() filename: string;
	@Input() flgView: boolean = true;
	@Input() flgSpanName: boolean = true;
	// style
	@Input() inputClass: any;
	@Input() inputStyle: any;

	flgError: boolean;

	constructor(applicationLogger: ApplicationLoggerService, private fileService: FileService) {
		super(applicationLogger);
		this.flgError = true;
	}

	ngOnInitForChildren() {
		if ((!this.content && !this.base64) || !this.mimetype || !this.filename) {
			this.flgError = true;
		} else {
			this.flgError = false;
			if (!this.base64 && this.content) {
				this.base64 = this.fileService.getBase64ByContent(this.content, this.mimetype);
			}
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'DownloadFileComponent';
	}

	download() {
		this.fileService.downloadBase64(this.base64, this.filename, this.mimetype);
	}
}
