import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {
	BaseComponent,
	ApplicationLoggerService,
	FileService,
	EnumSizeFormat,
	MagicValidatorUtil,
	FileEmbedModel,
} from '@ddc/kit';
import { Subscription, Observable, of } from 'rxjs';
import { AttachmentService } from '../../../../modules/resources/services/attachment.service';
import { UserattachmentService } from '../../../../modules/authentication/services/userattachment.service';
import { EnumAttachmentType } from '../../../../modules/resources/enums/attachment-type.enum';
import { QueryUtility } from '@ddc/rest';
import { RequestConditionInterface } from '../../../../modules/api/cakeutils/interfaces/request-conditions.interface';
import { AttachmentModel } from '../../../../modules/resources/models/attachment.model';
import { map } from 'rxjs/operators';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { APP_CONSTANT } from '../../../../application-shared/constants/app.constant';
import { AttachmentUtility } from '../../../../modules/resources/utility/attachment.utility';
import { UserattachmentModel } from '../../../../modules/authentication/models/userattachment.model';
import { TypologicalModel } from '../../../../modules/api/cakeutils-be/models/typological.model';
import { InputFileComponent } from '../../../../shared/form/input-file/input-file.component';

@Component({
	selector: 'reserve-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent extends BaseComponent {
	@ViewChild('uploadCmp') uploadCmp: InputFileComponent;
	@Input() id_image: string;
	@Input() id_user: string;
	@Input() flgPrincipal: boolean;
	@Input() blocked: boolean;
	@Input() viewmode: boolean = true;
	@Output() emitViewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
	// form
	FLD_image: FormFieldModel;
	formImage: FormGroup;
	validationMessages: any = {};
	// var
	image: AttachmentModel;
	file: FileEmbedModel;
	EnumSizeFormat = EnumSizeFormat;
	APP_CONSTANT = APP_CONSTANT;
	imageSrc: string;
	saveMode: boolean;
	// principal
	principal: UserattachmentModel;
	// sub
	subFile: Subscription;
	subImage: Subscription;
	subSave: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fileService: FileService,
		private fb: FormBuilder,
		private attachmentService: AttachmentService,
		private userattachmentService: UserattachmentService,
	) {
		super(applicationLogger);
		this.formImage = this.fb.group({
			image: new MagicValidatorUtil((this.validationMessages.image = []), undefined).build(),
		});
		this.FLD_image = new FormFieldModel(
			EnumFormType.FILE,
			this.formImage.get('image') as FormControl,
			'PERSONAL.LABEL.IMAGE',
		)
			.validation(this.validationMessages.image)
			.onInit();
	}

	ngOnInitForChildren() {
		if (this.blocked) {
			this.changeViewMode(true, true);
		} else if (this.viewmode) {
			this.changeViewMode(true, true);
		}
		// file
		this.subFile = this.formImage.get('image').valueChanges.subscribe((res) => {
			this.file = undefined;
			if (res) {
				this.file = res[0];
				this.imageSrc = this.file.content;
			} else if (this.image) {
				this.imageSrc = this.image.content;
			} else {
				this.imageSrc = 'assets/project/images/user.png';
			}
		});
		// image
		this.load();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subImage) {
			this.subImage.unsubscribe();
		}
		if (this.subFile) {
			this.subFile.unsubscribe();
		}
		if (this.subSave) {
			this.subSave.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProfileImageComponent';
	}

	private load() {
		let $obs: Observable<AttachmentModel>;
		if (this.id_image) {
			$obs = this.getImage(this.id_image);
		} else if (this.id_user && this.flgPrincipal) {
			$obs = this.getUserImage(this.id_user);
		} else {
			$obs = of(undefined);
		}

		this.subImage = $obs.subscribe((res) => {
			this.image = res;
			if (this.image && this.image.id) {
				this.id_image = this.image.id;
			}
			if (res && res.content) {
				this.imageSrc = this.fileService.getBase64ByContent(
					this.image.content,
					this.image.mimetype,
				);
			} else {
				this.imageSrc = 'assets/project/images/user.png';
			}
		});
	}

	private getImage(id_image: string): Observable<AttachmentModel> {
		return this.attachmentService.unique(id_image);
	}
	private getUserImage(id_user: string): Observable<AttachmentModel> {
		const conditionsAttachment: RequestConditionInterface = {
			belongs: ['attachment_fk'],
		};
		return this.flgPrincipal
			? this.userattachmentService
					.principal(
						id_user,
						undefined,
						EnumAttachmentType.IMAGE,
						conditionsAttachment,
						undefined,
						QueryUtility.SKIP_ERROR_RES,
					)
					.pipe(
						map((res) => {
							if (res && res.attachment) {
								this.principal = res;
								return res.attachment;
							}
							return undefined;
						}),
					)
			: of(undefined);
	}

	save() {
		let $obs: Observable<string>;
		let model: AttachmentModel;
		if (this.file) {
			model = AttachmentUtility.convertFileEmbedModelToAttachment(this.file, this.fileService);
			model.cod = this.image ? this.image.cod : undefined;
			model.tpattachment = new TypologicalModel();
			model.tpattachment.id = EnumAttachmentType.IMAGE;

			if (this.id_image) {
				$obs = this.attachmentService.edit(model, this.id_image);
			} else if (this.id_user && this.principal) {
				$obs = this.userattachmentService
					.setPrincipal(
						this.id_user,
						undefined,
						this.principal.id,
						undefined,
						EnumAttachmentType.IMAGE,
					)
					.pipe(
						map((flg) => {
							return flg ? this.principal.id : undefined;
						}),
					);
			} else if (this.id_user) {
				$obs = this.userattachmentService.saveRelation(
					this.id_user,
					model,
					EnumAttachmentType.IMAGE,
					this.flgPrincipal ? true : false,
				);
			}
		}

		if ($obs) {
			this.subSave = $obs.subscribe((res) => {
				if (res) {
					this.file = undefined;
				}
			});
		}
	}

	changeViewMode(val: boolean, notload?: boolean) {
		if (this.uploadCmp && this.uploadCmp.field) {
			this.uploadCmp.field.supports.length = 0;
		}
		if (val && !notload) {
			this.load();
		}
		this.viewmode = val;
		this.emitViewMode.emit(this.viewmode);
	}
}
