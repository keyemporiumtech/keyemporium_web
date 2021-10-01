import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { AttachmentModel } from '../../models/attachment.model';
import { MimetypeModel } from '../../models/mimetype.model';

@Component({
	selector: 'wiki-test-resources',
	templateUrl: './test-resources.component.html',
	styleUrls: ['./test-resources.component.scss'],
})
export class TestResourcesComponent extends BaseModuleWikiPage implements OnInit {
	idAttachment: string;
	idMimetype: string;
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}

	setDetailAttachment(attachment?: AttachmentModel) {
		this.idAttachment = attachment ? attachment.id : undefined;
		this.set('ATTACHMENT-UNIQUE');
	}

	setDetailMimetype(mimetype?: MimetypeModel) {
		this.idMimetype = mimetype ? mimetype.id : undefined;
		this.set('MIMETYPE-UNIQUE');
	}
}
