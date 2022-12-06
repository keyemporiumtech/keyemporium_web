import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileEmbedModel } from '../../models/file-embed.model';
import { BaseComponent } from '../../../abstract/base.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { EnumSizeFormat } from '../../enums/size-format.enum';
import { Observable, Subscription } from 'rxjs';
import { StringTranslate } from '../../../translation/models/string-translate.model';
import { ProgressBarComponent } from '../../../html/components/progress-bar/progress-bar.component';
import { StyleUtility } from '../../../html/utils/style.utility';

@Component({
	selector: 'ddc-init-upload-file',
	templateUrl: './upload-file.component.html',
	styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent extends BaseComponent {
	@Output() emitFiles = new EventEmitter<FileEmbedModel[]>();
	@Output() emitAddFile = new EventEmitter<FileEmbedModel>();
	@Output() emitAddFiles = new EventEmitter<FileEmbedModel[]>();
	@Output() emitRemoveFile = new EventEmitter<FileEmbedModel>();
	@Output() emitRemoveFiles = new EventEmitter<FileEmbedModel[]>();
	@Output() emitError = new EventEmitter<boolean>();
	// functionality
	@Input() multiple: boolean = true;
	@Input() showErrors: boolean;
	// @Input() uploadOnChange: boolean;
	// @Input() url: string;
	@Input() numMaxFiles: number;
	@Input() maxSize: number; // MB
	@Input() maxSizeUnit: EnumSizeFormat;
	@Input() extensions: string;
	// @Input() progress: boolean;
	// @Input() wait: boolean; // to change when able load button
	@Input() upload_error_maxsize_key: string; // accept params {filename, filesize , size, unit}
	@Input() upload_error_extension_key: string; // accept params {filename, fileext , ext}
	@Input() upload_error_numfiles_key: string; // accept params {max}
	private _readonly: boolean;
	@Input() set readonly(val: boolean) {
		this._readonly = val;
		if (val && this.form) {
			this.form.get('inputFile').disable();
		} else if (this.form) {
			this.form.get('inputFile').enable();
		}
	}
	get readonly(): boolean {
		return this._readonly;
	}
	@Input() name: string;
	// style
	@Input() inputClass: any;
	@Input() inputStyle: any;
	@Input() errorClass: any;
	@Input() errorStyle: any;
	@Input() classRemoveFile: any;
	@Input() styleRemoveFile: any;
	@Input() classCleanFiles: any;
	@Input() styleCleanFiles: any;
	@Input() infoClass: any;
	@Input() infoStyle: any;
	@Input() icon: any;
	@Input() iconColor: string;
	// progress
	@ViewChild('progressInternal', { static: false }) progressInternal: ProgressBarComponent;
	@ViewChild('progressExternal', { static: false }) progressExternal: ProgressBarComponent;
	@Input() colorInternalLoad: any; // colore della progress bar di upload in locale
	@Input() colorExternalLoad: any; // colore della progress bar di upload su server
	@Input() externalLoad: (attachments: FileEmbedModel[]) => Observable<any>;
	// flags
	@Input() showProgress: boolean = true;
	@Input() showFiles: boolean = true;
	// used
	fileArr: File[] = [];
	form: FormGroup;
	error: boolean = false;
	errorMessages: (string | StringTranslate)[];
	attachments: FileEmbedModel[] = [];
	// icons
	@Input() closeItem: string = 'fa fa-times';
	@Input() deleteItems: string = 'fa fa-trash';
	// sub
	subAddFile: Subscription;
	subLoadFile: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private fileService: FileService,
	) {
		super(applicationLogger);
		this.attachments = [];
		this.errorMessages = [];
		this.form = this.fb.group({
			inputReadOnly: [''],
			inputFile: [''],
		});
	}

	ngOnInitForChildren() {
		if (this.maxSize && !this.maxSizeUnit) {
			this.maxSizeUnit = EnumSizeFormat.MEGABYTE;
		}
		if (!this.name) {
			this.name = this.id;
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subAddFile) {
			this.subAddFile.unsubscribe();
		}
		if (this.subLoadFile) {
			this.subLoadFile.unsubscribe();
		}
	}
	getClassName(): string {
		return 'UploadFileComponent';
	}

	/**
	 * Invocato all'upload di files dall'input,
	 * resetta gli errori e aggiunge i files invocando per ognuno [addFile]{@link UploadFileComponent#addFile}
	 * @param files files caricati
	 */
	selectFiles(files: any) {
		this.progressInternal.start();
		this.manageErrors(false);
		if (this.numMaxFiles === 1) {
			this.fileArr = [];
		}

		for (const file of files) {
			this.addFile(file);
		}
	}

	manageErrors(flag: boolean, message?: string | StringTranslate) {
		this.error = flag;
		if (message) {
			this.errorMessages.push(message);
		} else if (!flag) {
			this.errorMessages = [];
		}
		this.emitError.emit(this.error);
	}

	removeErrorMessage(index: number) {
		this.errorMessages.splice(index, 1);
		if (this.errorMessages.length > 0) {
			this.error = true;
		} else {
			this.error = false;
		}
		this.emitError.emit(this.error);
	}

	// ------------------------REMOVE

	/**
	 * Rimuove un singolo da file per nome, aggiorna le validazioni
	 * ed emette gli output <b>emitRemoveFile</b> ed <b>emitFiles</b>
	 * @param filename nome del file da rimuovere
	 */
	removeFile(filename: string) {
		for (let i = 0; i < this.attachments.length; i++) {
			if (this.attachments[i].name === filename) {
				this.emitRemoveFile.emit(this.attachments[i]);
				this.attachments.splice(i, 1);
				this.reValidation();
				this.emitFiles.emit(this.attachments);
				break;
			}
		}
	}

	/**
	 * Rimuove un singolo da fileEmbed per nome, aggiorna le validazioni
	 * ed emette gli output <b>emitRemoveFile</b> ed <b>emitFiles</b>
	 * @param file file da rimuovere di tipo [FileEmbedModel]{@link FileEmbedModel}
	 */
	removeFileEmbed(file: FileEmbedModel) {
		const index = this.attachments.findIndex((el) => el.name === file.name);
		if (index !== -1) {
			this.emitRemoveFile.emit(this.attachments[index]);
			this.attachments.splice(index, 1);
			this.reValidation();
			this.emitFiles.emit(this.attachments);
		}
	}

	/**
	 * Rimuove tutti i files caricati, resetta gli errori
	 * ed emette gli output <b>emitRemoveFiles</b> ed <b>emitFiles</b>
	 */
	removeAllFiles() {
		this.manageErrors(false);
		this.emitRemoveFiles.emit(this.attachments);
		this.attachments.length = 0;
		this.emitFiles.emit([]);
	}

	// ADD

	/**
	 * Aggiunge un file, lo valida
	 * ed emette gli output <b>emitAddFile</b> ed <b>emitFiles</b>
	 * @param file file da aggiungere di tipo [FileEmbedModel]{@link FileEmbedModel}
	 */
	addFileEmbed(file: FileEmbedModel) {
		this.validateFile(file);
		if (!this.error) {
			if (!this.multiple) {
				this.attachments.length = 0;
			}
			this.attachments.push(file);
			this.emitAddFile.emit(file);
			this.resetFile();
			this.emitFiles.emit(this.attachments);
		}
	}
	/**
	 * Carica un file invocando il [FileReader]{@link FileReader} per la gestione del content
	 * e il metodo [addFileEmbed]{@link UploadFileComponent#addFileEmbed}
	 * @param file file da caricare di tipo [File]{@link File}
	 */
	addFile(file: File) {
		if (!this.multiple) {
			this.fileArr.length = 0;
		}
		this.fileArr.unshift(file);
		const attachment = new FileEmbedModel();
		attachment.name = file.name;
		attachment.size = file.size;
		attachment.sizeString = this.fileService.getStringSizeFromBytes(file.size);
		attachment.sizeFormat = this.fileService.getSizeFormatFromBytes(file.size);
		attachment.ext = this.fileService.getFileExtension(file.name);
		if (!this.error) {
			this.setFileContent(file, attachment);
		}
	}

	private setFileContent(item: any, attachment: FileEmbedModel) {
		const fileReader = new FileReader();
		// let rawData = null;
		let fileData = null;
		fileReader.onloadend = (e) => {
			fileData = fileReader.result;
			if (!fileData) {
				this.colorInternalLoad = StyleUtility.getProperty('--error');
			}
			const data = this.fileService.getMimeAndContentByBase64(fileData);
			attachment.mime = data.mimetype;
			attachment.content = data.content;
			attachment.resource = fileData;
			this.addFileEmbed(attachment);
			this.progressInternal.stop();
		};
		fileReader.readAsDataURL(item);
	}

	// ------------------------RESET
	/**
	 * Resetta il form control
	 */
	resetFile() {
		this.fileArr = [];
		this.form.get('inputReadOnly').setValue('');
		this.form.get('inputFile').setValue('');
	}

	/**
	 * Ripristina la situazione di partenza
	 */
	resetAll() {
		this.resetFile();
		this.fileArr.length = 0;
		this.removeAllFiles();
	}

	// ------------------------PROGRESS

	load() {
		this.progressExternal.start();
		this.subLoadFile = this.externalLoad(this.attachments).subscribe(
			(res) => {
				if (!res) {
					this.colorExternalLoad = StyleUtility.getProperty('--error');
				}
				this.progressExternal.stop();
			},
			(error) => {
				this.log.error('si è verificato un errore nel caricamento del file: load()');
				this.colorExternalLoad = StyleUtility.getProperty('--error');
				this.progressExternal.stop();
			},
		);
	}

	// ------------------------VALIDATIONS

	/**
	 * Valida dimensione, estensione e numero massimo di upload al caricamento
	 * di un file, emettendo <b>emitError</b>
	 * @param file file da validare di tipo [FileEmbedModel]{@link FileEmbedModel}
	 */
	validateFile(file: FileEmbedModel) {
		// size
		if (this.maxSize) {
			const fileSize = this.fileService.getSizeFromBytes(file.size, this.maxSizeUnit);
			if (fileSize > this.maxSize) {
				const keyError: string = this.upload_error_maxsize_key
					? this.upload_error_maxsize_key
					: 'VALIDATION.UPLOAD.MAX_SIZE';

				this.manageErrors(
					true,
					new StringTranslate(keyError, {
						filename: file.name,
						filesize: fileSize.toFixed(2) + ' ' + this.maxSizeUnit,
						size: this.maxSize,
						unit: this.maxSizeUnit,
					}),
				);
			}
		}
		// extension
		if (this.extensions) {
			const ext = file.ext.toLowerCase();
			if (this.extensions.toLowerCase().indexOf(ext) === -1) {
				const keyError: string = this.upload_error_extension_key
					? this.upload_error_extension_key
					: 'VALIDATION.UPLOAD.FILE_EXT';

				this.manageErrors(
					true,
					new StringTranslate(keyError, {
						filename: file.name,
						fileext: ext,
						ext: this.extensions,
					}),
				);
			}
		}
		// numMaxFiles
		if (this.numMaxFiles) {
			if (this.attachments.length >= this.numMaxFiles) {
				const keyError: string = this.upload_error_numfiles_key
					? this.upload_error_numfiles_key
					: 'VALIDATION.UPLOAD.MAX_NUM_UPLOAD';

				this.manageErrors(
					true,
					new StringTranslate(keyError, {
						max: this.numMaxFiles,
					}),
				);
			}
		}
	}

	/**
	 * Rivalida tutti i files caricati invocando per ognuno [validateFile]{@link UploadFileComponent#validateFile}
	 * e riemette l'output <b>emitFiles</b>
	 */
	reValidation() {
		this.manageErrors(false);
		for (const attachment of this.attachments) {
			this.validateFile(attachment);
		}
		this.emitFiles.emit(this.attachments);
	}
}
