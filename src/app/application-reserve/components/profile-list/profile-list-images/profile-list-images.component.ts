import { Component, Input } from '@angular/core';
import {
	BaseComponent,
	ApplicationLoggerService,
	SizeFormat,
	EnumSizeFormat,
	StringTranslate,
} from '@ddc/kit';
import { AttachmentModel } from '../../../../modules/resources/models/attachment.model';
import { VicService } from '../../../../modules/app-keyemporium/services/vic.service';
import { Subscription } from 'rxjs';
import { QueryUtility } from '@ddc/rest';

@Component({
	selector: 'reserve-profile-list-images',
	templateUrl: './profile-list-images.component.html',
	styleUrls: ['./profile-list-images.component.scss'],
})
export class ProfileListImagesComponent extends BaseComponent {
	@Input() id_user: string;
	@Input() blocked: boolean;
	@Input() list: AttachmentModel[];
	// var
	id_image: string;
	editMode: boolean;
	titleForm: string | StringTranslate;
	// sub
	subList: Subscription;
	subDelete: Subscription;

	constructor(applicationLogger: ApplicationLoggerService, private vicService: VicService) {
		super(applicationLogger);
		this.list = [];
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
		return 'ProfileListImagesComponent';
	}

	private load() {
		this.startLoading();
		this.subList = this.vicService
			.images(
				this.id_user,
				undefined,
				false,
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
					this.list = list;
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);
	}

	// utility
	getSize(image: AttachmentModel) {
		image.sizeFormat = new SizeFormat(image.size, EnumSizeFormat.KILOBYTE);
		return image.sizeStringFixed;
	}
	getConfirmDelText(image: AttachmentModel) {
		return new StringTranslate('PERSONAL.VIC.ATTACHMENT.DELETE_ATTACHMENT_CONFIRM', {
			tp: '',
			name: image.name + ' ' + image.ext,
		});
	}

	// operation
	nuova() {
		this.editMode = true;
		this.titleForm = new StringTranslate('PERSONAL.VIC.IMAGE.ADD_IMAGE');
	}
	modifica(image: AttachmentModel) {
		this.id_image = image.id;
		this.editMode = true;
		this.titleForm = new StringTranslate('PERSONAL.VIC.IMAGE.EDIT_IMAGE', {
			name: image.name + '.' + image.ext,
		});
	}
	close() {
		this.id_image = undefined;
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
}
