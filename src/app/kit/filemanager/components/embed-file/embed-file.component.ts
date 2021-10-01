import { Component, Output, Input, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { FileEmbedModel } from '../../models/file-embed.model';
import { RenderTextMode } from 'ng2-pdf-viewer';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { EnumBrowserName } from '../../../html/enums/browser-name.enum';
import { EnumTypeEmbed } from '../../enums/type-embed-enum';
import { EnumTypeMime } from '../../enums/type-mine.enum';
import { FileService } from '../../services/file.service';
import { Router } from '@angular/router';

@Component({
	selector: 'ddc-init-embed-file',
	templateUrl: './embed-file.component.html',
	styleUrls: ['./embed-file.component.scss'],
})
export class EmbedFileComponent extends BaseComponent {
	@Output() close: EventEmitter<any> = new EventEmitter<any>();
	@Input() object: FileEmbedModel;
	@Input() width: string;
	@Input() height: string;
	@Input() classIconClose: any = 'fas fa-2x fa-times-circle icon-close';
	@Input() classLinkClose: any;
	@Input() styleIconClose: any = 'float-right';
	@Input() styleLinkClose: any;
	@Input() htmlIconClose: string;
	@Input() flagTitle: boolean = true;
	@Input() flagClose: boolean = true;
	// PDF properties
	@Input() pdfTextSelection: boolean = true;
	renderText: RenderTextMode;
	@Input() pdfOriginalSize: boolean = true;
	autoresize: boolean = false;

	typeEmbed = EnumTypeEmbed;
	typeMime = EnumTypeMime;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fileService: FileService,
		private router: Router,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.width) {
			this.width = '90%';
		}
		if (!this.height) {
			this.height = '90%';
		}
		if (this.pdfTextSelection) {
			this.renderText = RenderTextMode.ENHANCED;
		} else {
			this.renderText = RenderTextMode.DISABLED;
		}
		if (!this.pdfOriginalSize) {
			this.autoresize = true;
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'EmbedFileComponent';
	}

	getSrc() {
		if (this.object.resource) {
			return this.object.resource;
		}
		return this.object && this.object.mime && this.object.content
			? this.fileService.getBase64ByContent(this.object.content, this.object.mime)
			: undefined;
	}

	onClose($event: any) {
		if (this.object.back) {
			this.router.navigateByUrl(this.object.back);
		} else {
			this.close.emit($event);
		}
	}

	getTypeEmbed() {
		const browserName = navigator.appCodeName;
		if (this.object.ext && this.object.ext.toLowerCase() === 'pdf') {
			return EnumTypeEmbed.PDF;
		} else if (this.object.type === EnumTypeMime.AUDIO) {
			return this._getTypeEmbedAudio(browserName);
		} else if (this.object.type === EnumTypeMime.VIDEO) {
			return this._getTypeEmbedVideo(browserName);
		} else if (this.object.type === EnumTypeMime.IMAGE) {
			return EnumTypeEmbed.IMAGE;
		} else if (this.object.type === EnumTypeMime.GENERIC_EMBED) {
			return EnumTypeEmbed.EMBED;
		} else if (this.object.type === EnumTypeMime.GENERIC_IFRAME) {
			return EnumTypeEmbed.IFRAME;
		} else if (this.object.type === EnumTypeMime.YOUTUBE) {
			return EnumTypeEmbed.YOUTUBE;
		} else {
			return EnumTypeEmbed.IFRAME;
		}
	}

	private _getTypeEmbedAudio(browserName: any) {
		if (this.object.ext.toLowerCase() === 'mp3') {
			return EnumTypeEmbed.AUDIO;
		} else if (
			this.object.ext.toLowerCase() === 'wav' &&
			browserName !== EnumBrowserName.EXPLORER
		) {
			return EnumTypeEmbed.AUDIO;
		} else if (
			this.object.ext.toLowerCase() === 'ogg' &&
			browserName !== EnumBrowserName.EXPLORER &&
			browserName !== EnumBrowserName.SAFARI
		) {
			return EnumTypeEmbed.AUDIO;
		} else {
			return EnumTypeEmbed.IFRAME;
		}
	}

	private _getTypeEmbedVideo(browserName: any) {
		if (this.object.ext.toLowerCase() === 'mp4') {
			return EnumTypeEmbed.VIDEO;
		} else if (
			this.object.ext.toLowerCase() === 'webm' &&
			browserName !== EnumBrowserName.EXPLORER &&
			browserName !== EnumBrowserName.SAFARI
		) {
			return EnumTypeEmbed.VIDEO;
		} else if (
			this.object.ext.toLowerCase() === 'ogg' &&
			browserName !== EnumBrowserName.EXPLORER &&
			browserName !== EnumBrowserName.SAFARI
		) {
			return EnumTypeEmbed.VIDEO;
		} else {
			return EnumTypeEmbed.IFRAME;
		}
	}
}
