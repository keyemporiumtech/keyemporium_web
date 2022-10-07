import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {
	BaseComponent,
	FileEmbedModel,
	EnumSizeFormat,
	ApplicationLoggerService,
	FileService,
	MagicValidatorUtil,
	EnumTypeMime,
} from '@ddc/kit';
import { InputFileComponent } from '../../../../shared/form/input-file/input-file.component';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AttachmentModel } from '../../../../modules/resources/models/attachment.model';
import { APP_CONSTANT } from '../../../../application-shared/constants/app.constant';
import { UserattachmentModel } from '../../../../modules/authentication/models/userattachment.model';
import { Subscription, Observable, of } from 'rxjs';
import { AttachmentService } from '../../../../modules/resources/services/attachment.service';
import { UserattachmentService } from '../../../../modules/authentication/services/userattachment.service';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { RequestConditionInterface } from '../../../../modules/api/cakeutils/interfaces/request-conditions.interface';
import { EnumAttachmentType } from '../../../../modules/resources/enums/attachment-type.enum';
import { QueryUtility } from '@ddc/rest';
import { map } from 'rxjs/operators';
import { AttachmentUtility } from '../../../../modules/resources/utility/attachment.utility';
import { TypologicalModel } from '../../../../modules/api/cakeutils-be/models/typological.model';

@Component({
	selector: 'reserve-profile-attachment',
	templateUrl: './profile-attachment.component.html',
	styleUrls: ['./profile-attachment.component.scss'],
})
export class ProfileAttachmentComponent extends BaseComponent {
	@ViewChild('uploadCmp') uploadCmp: InputFileComponent;
	@Input() id_attachment: string;
	@Input() id_user: string;
	@Input() flgPrincipal: boolean;
	@Input() tpattachment: EnumAttachmentType;
	@Input() blocked: boolean;
	@Input() viewmode: boolean = true;
	@Output() emitViewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() emitSave: EventEmitter<boolean> = new EventEmitter<boolean>();
	// form
	FLD_attachment: FormFieldModel;
	formAttachment: FormGroup;
	validationMessages: any = {};
	// var
	attachment: AttachmentModel;
	file: FileEmbedModel;
	fileLoad: boolean;
	EnumSizeFormat = EnumSizeFormat;
	APP_CONSTANT = APP_CONSTANT;
	attachmentSrc: string;
	saveMode: boolean;
	// principal
	principal: UserattachmentModel;
	// sub
	subFile: Subscription;
	subAttachment: Subscription;
	subSave: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fileService: FileService,
		private fb: FormBuilder,
		private attachmentService: AttachmentService,
		private userattachmentService: UserattachmentService,
	) {
		super(applicationLogger);
		this.formAttachment = this.fb.group({
			attachment: new MagicValidatorUtil(
				(this.validationMessages.attachment = []),
				undefined,
			).build(),
		});
		this.FLD_attachment = new FormFieldModel(
			EnumFormType.FILE,
			this.formAttachment.get('attachment') as FormControl,
			'PERSONAL.LABEL.ATTACHMENT',
		)
			.validation(this.validationMessages.attachment)
			.onInit();
	}

	ngOnInitForChildren() {
		if (this.blocked) {
			this.changeViewMode(true, true);
		} else if (this.viewmode) {
			this.changeViewMode(true, true);
		}
		// file
		this.subFile = this.formAttachment.get('attachment').valueChanges.subscribe((res) => {
			this.file = undefined;
			this.fileLoad = false;
			if (res) {
				this.fileLoad = true;
				this.file = res[0];
				this.attachmentSrc = this.file.resource;
				this.file.type = this.typeEmbedByExt(this.file.ext);
			} else if (this.attachment) {
				this.attachmentSrc = this.fileService.getBase64ByContent(
					this.attachment.content,
					this.attachment.mimetype,
				);
				this.file = AttachmentUtility.convertAttachmentToFileEmbedModel(this.attachment);
				this.file.type = this.typeEmbedByExt(this.attachment.ext);
			} else {
				this.attachmentSrc = 'assets/project/images/doc.png';
			}
		});
		// attachment
		this.load();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subAttachment) {
			this.subAttachment.unsubscribe();
		}
		if (this.subFile) {
			this.subFile.unsubscribe();
		}
		if (this.subSave) {
			this.subSave.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProfileAttachmentComponent';
	}

	private load() {
		let $obs: Observable<AttachmentModel>;
		if (this.id_attachment) {
			$obs = this.getAttachment(this.id_attachment);
		} else if (this.id_user && this.flgPrincipal) {
			$obs = this.getUserAttachment(this.id_user);
		} else {
			$obs = of(undefined);
		}

		this.subAttachment = $obs.subscribe((res) => {
			this.attachment = res;
			if (this.attachment && this.attachment.id) {
				this.id_attachment = this.attachment.id;
			}
			if (this.attachment && this.attachment.tpattachmentEnum) {
				this.tpattachment = this.attachment.tpattachmentEnum;
			}
			if (res && res.content) {
				this.attachmentSrc = this.fileService.getBase64ByContent(
					this.attachment.content,
					this.attachment.mimetype,
				);
				this.file = AttachmentUtility.convertAttachmentToFileEmbedModel(res);
				this.file.type = this.typeEmbedByExt(res.ext);
			} else {
				this.attachmentSrc = 'assets/project/images/doc.png';
			}
		});
	}

	private getAttachment(id_attachment: string): Observable<AttachmentModel> {
		return this.attachmentService.unique(id_attachment);
	}
	private getUserAttachment(id_user: string): Observable<AttachmentModel> {
		const conditionsAttachment: RequestConditionInterface = {
			belongs: ['attachment_fk'],
		};
		return this.flgPrincipal
			? this.userattachmentService
					.principal(
						id_user,
						undefined,
						this.tpattachment,
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
			model.cod = this.attachment ? this.attachment.cod : undefined;
			model.tpattachment = new TypologicalModel();
			model.tpattachment.id = this.tpattachment;

			if (this.id_attachment) {
				$obs = this.attachmentService.edit(model, this.id_attachment);
			} else if (this.id_user && this.principal) {
				$obs = this.userattachmentService
					.setPrincipal(this.id_user, undefined, this.principal.id, undefined, this.tpattachment)
					.pipe(
						map((flg) => {
							return flg ? this.principal.id : undefined;
						}),
					);
			} else if (this.id_user) {
				$obs = this.userattachmentService.saveRelation(
					this.id_user,
					model,
					this.tpattachment,
					this.flgPrincipal ? true : false,
				);
			}
		}

		if ($obs) {
			this.subSave = $obs.subscribe(
				(res) => {
					if (res) {
						this.file = undefined;
						this.emitSave.emit(true);
					}
				},
				(err) => {
					this.emitSave.emit(false);
				},
			);
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
}
