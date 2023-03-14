import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BasePageComponent,
	FileEmbedModel,
	StringTranslate,
} from '@ddc/kit';
import { template } from '../../../../environments/template/template';

@Component({
	selector: 'ddc-init-file-page',
	templateUrl: './file-page.component.html',
	styleUrls: ['./file-page.component.scss'],
})
export class FilePageComponent extends BasePageComponent {
	@Output() closeEmit: EventEmitter<any> = new EventEmitter<any>();
	@Input() fileEmbed: FileEmbedModel;
	@Input() title: string | StringTranslate;
	@Input() width: string;
	@Input() height: string;
	closeIcon: string;
	page: string;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger, router, activatedRoute);
		this.closeIcon = template.icons.genericClose;
	}

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {
		this.page = data.get('page');
		if (this.page) {
			this.fileEmbed = this.applicationStorage.fileEmbed.getObj();
			this.title = this.fileEmbed.title;
		}
	}
	manageQueryParams(data: ParamMap) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'FilePageComponent';
	}

	/**
	 * Viene emesso solo se fileEmbed non ha valorizzata la proprietà back
	 * @param $event evento click sull'icona close
	 */
	closeFile($event: any) {
		this.closeEmit.emit($event);
		if (this.page) {
			this.applicationStorage.fileEmbed.del();
		}
	}
}
