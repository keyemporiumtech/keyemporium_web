import { Component, Input } from '@angular/core';
import {
	BaseComponent,
	StringTranslate,
	ApplicationLoggerService,
	SizeFormat,
	EnumSizeFormat,
	ApplicationStorageService,
	EnumTypeMime,
} from '@ddc/kit';
import { AttachmentModel } from '../../../../modules/resources/models/attachment.model';
import { Subscription } from 'rxjs';
import { VicService } from '../../../../modules/app-keyemporium/services/vic.service';
import { QueryUtility } from '@ddc/rest';
import { EnumAttachmentType } from '../../../../modules/resources/enums/attachment-type.enum';
import { AttachmentUtility } from '../../../../modules/resources/utility/attachment.utility';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'reserve-profile-list-attachments',
	templateUrl: './profile-list-attachments.component.html',
	styleUrls: ['./profile-list-attachments.component.scss'],
})
export class ProfileListAttachmentsComponent extends BaseComponent {
	@Input() id_user: string;
	@Input() blocked: boolean;
	@Input() list: AttachmentModel[];
	// var
	id_attachment: string;
	editMode: boolean;
	titleForm: string | StringTranslate;
	tpattachment: EnumAttachmentType;
	EnumAttachmentType = EnumAttachmentType;
	tpattachmentsLink: EnumAttachmentType[];
	// sub
	subList: Subscription;
	subDelete: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private router: Router,
		private applicationStorage: ApplicationStorageService,
		private translateService: TranslateService,
		private vicService: VicService,
	) {
		super(applicationLogger);
		this.list = [];
		this.tpattachmentsLink = [
			EnumAttachmentType.CI,
			EnumAttachmentType.CF,
			EnumAttachmentType.PASSPORT,
			EnumAttachmentType.ADDRESS,
			EnumAttachmentType.DRIVING_LICENSE,
		];
	}

	ngOnInitForChildren() {
		this.load();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subList) {
			this.subList.unsubscribe();
		}
		if (this.subDelete) {
			this.subDelete.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProfileListAttachmentsComponent';
	}

	private load() {
		this.startLoading();
		this.subList = this.vicService
			.attachments(
				this.id_user,
				undefined,
				undefined,
				undefined,
				QueryUtility.fnResponseManager(
					undefined,
					QueryUtility.FN_ERROR(() => {
						this.stopLoading();
					}),
					QueryUtility.SKIP_ERROR_RES,
				),
			)
			.subscribe(
				(list) => {
					this.manageTypeLinks(list);
					this.list = list;
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);
	}

	// utility
	getSize(attachment: AttachmentModel) {
		attachment.sizeFormat = new SizeFormat(attachment.size, EnumSizeFormat.KILOBYTE);
		return attachment.sizeStringFixed;
	}

	getConfirmDelText(attachment: AttachmentModel) {
		return new StringTranslate('PERSONAL.VIC.ATTACHMENT.DELETE_ATTACHMENT_CONFIRM', {
			tp: this.labelType(attachment.tpattachment.id),
			name: attachment.name + ' ' + attachment.ext,
		});
	}

	labelType(type: string): string {
		switch (type) {
			case EnumAttachmentType.CI.toString():
				return 'PERSONAL.VIC.ATTACHMENT.ADD_CI';
			case EnumAttachmentType.CF.toString():
				return 'PERSONAL.VIC.ATTACHMENT.ADD_CF';
			case EnumAttachmentType.PASSPORT.toString():
				return 'PERSONAL.VIC.ATTACHMENT.ADD_PASSPORT';
			case EnumAttachmentType.ADDRESS.toString():
				return 'PERSONAL.VIC.ATTACHMENT.ADD_ADDRESS';
			case EnumAttachmentType.DRIVING_LICENSE.toString():
				return 'PERSONAL.VIC.ATTACHMENT.ADD_DRIVING_LICENSE';
			default:
				return undefined;
		}
	}

	iconType(type: string): string {
		switch (type) {
			case EnumAttachmentType.CI.toString():
				return 'assets/project/images/docs/CI.png';
			case EnumAttachmentType.CF.toString():
				return 'assets/project/images/docs/CF.png';
			case EnumAttachmentType.PASSPORT.toString():
				return 'assets/project/images/docs/PASSPORT.png';
			case EnumAttachmentType.ADDRESS.toString():
				return 'assets/project/images/docs/ADDRESS.png';
			case EnumAttachmentType.DRIVING_LICENSE.toString():
				return 'assets/project/images/docs/DRIVER_LICENSE.png';
			default:
				return undefined;
		}
	}

	private manageTypeLinks(list: AttachmentModel[]) {
		let finder: number;
		list.forEach((el) => {
			// add file
			el.fileEmbed = AttachmentUtility.convertAttachmentToFileEmbedModel(el);
			el.fileEmbed.type = this.typeEmbedByExt(el.ext);
			// remove links
			finder = this.tpattachmentsLink.findIndex(
				(val) => val.toString() === el.tpattachmentEnum.toString(),
			);
			if (finder !== -1) {
				this.tpattachmentsLink.splice(finder, 1);
			}
		});
	}

	typeEmbedByExt(ext: string): EnumTypeMime {
		// 'jpg,png,jpeg,gif,pdf,doc,docx'
		switch (ext) {
			case 'jpg':
			case 'png':
			case 'jpeg':
			case 'gif':
				return EnumTypeMime.IMAGE;
			case 'pdf':
				return undefined;
			case 'doc':
			case 'docx':
				return EnumTypeMime.GENERIC_EMBED;
			default:
				return undefined;
		}
	}

	// operation
	nuova(type: EnumAttachmentType) {
		this.editMode = true;
		this.tpattachment = type;
		this.titleForm = this.labelType(type.toString());
	}
	modifica(attachment: AttachmentModel) {
		this.id_attachment = attachment.id;
		this.tpattachment = attachment.tpattachmentEnum;
		this.editMode = true;
		this.titleForm = new StringTranslate('PERSONAL.VIC.ATTACHMENT.EDIT_ATTACHMENT', {
			tp: this.translateService.instant(
				this.labelType(attachment.tpattachment ? attachment.tpattachment.id : undefined),
			),
			name: attachment.name + '.' + attachment.ext,
		});
	}
	close() {
		this.id_attachment = undefined;
		this.titleForm = undefined;
		this.editMode = false;
	}
	elimina(id: string) {
		this.startLoading();
		this.subDelete = this.vicService
			.deleteAttachment(
				id,
				undefined,
				QueryUtility.fnResponseManager(
					undefined,
					QueryUtility.FN_ERROR(() => {
						this.stopLoading();
					}),
					QueryUtility.HANDLE_POSITIVE_RES,
				),
			)
			.subscribe(
				(res) => {
					if (res) {
						this.load();
					}
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);
	}

	onSave(res: boolean) {
		if (res) {
			this.list.length = 0;
			this.load();
		}
	}

	// navigation
	goToFile(attachment: AttachmentModel) {
		const fileEmbed = attachment.fileEmbed;
		fileEmbed.back = this.router.url;
		this.applicationStorage.fileEmbed.setObj(fileEmbed);
		this.router.navigate(['commons', 'file', 1]);
	}
}
