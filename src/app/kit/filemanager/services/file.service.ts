import { Observable, of } from 'rxjs';
import { catchError, mapTo, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { HttpClient } from '@angular/common/http';
import { EnumTypeMime } from '../enums/type-mine.enum';
import { FileEmbedModel } from '../models/file-embed.model';
import { SizeFormat } from '../models/size-format.model';
import { EnumSizeFormat } from '../enums/size-format.enum';

@Injectable()
export class FileService extends BaseService {
	filereaded: any;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private router: Router,
		private http: HttpClient,
	) {
		super(applicationLogger);
	}

	getClassName(): string {
		return 'FileService';
	}

	/**
	 * Verifica se esiste un file remoto
	 * @param path indirizzo remoto del file
	 */
	exist(path: string): Observable<boolean> {
		return this.http.head(path).pipe(
			mapTo(true),
			catchError((error) => of(false)),
		);
	}

	/**
	 * Ritorna un File remoto
	 * @param url indirizzo remoto del file
	 */
	readFile(url: string): Observable<File> {
		return this.http.get(url, { responseType: 'blob' }).pipe(
			map((res: any) => {
				this.applicationLogger.logFileServiceReadFile(this.log, res);
				return res;
			}),
		);
	}

	/**
	 * Ritorna una dimensione convertendo il valore in byte in un formato richiesto
	 * @param byte valore in byte
	 * @param unit formato di conversione richiesto
	 */
	getSizeFromBytes(byte: number, unit: EnumSizeFormat): number {
		let size = byte;
		switch (unit) {
			case EnumSizeFormat.TERABYTE:
				size = byte / 1024 / 1024 / 1024 / 1024;
				break;
			case EnumSizeFormat.GIGABYTE:
				size = byte / 1024 / 1024 / 1024;
				break;
			case EnumSizeFormat.MEGABYTE:
				size = byte / 1024 / 1024;
				break;
			case EnumSizeFormat.KILOBYTE:
				size = byte / 1024;
				break;
		}
		return size;
	}

	/**
	 * [Vedi]{@link http://whatsabyte.com/P1/byteconverter.htm}
	 *
	 * Ritorna la stringa di una dimensione a partire dal valore in byte.
	 * La conversione avviene calcolando il formato più prossimo ad un valore intero.
	 * @example 3000 byte = 3KB
	 * @param byte valore in byte
	 */
	getStringSizeFromBytes(byte: number): string {
		let size = byte;
		const unit = EnumSizeFormat.BYTE;
		size = byte / 1024 / 1024 / 1024 / 1024;
		if (size >= 1) {
			return size + ' ' + EnumSizeFormat.TERABYTE;
		}
		size = byte / 1024 / 1024 / 1024;
		if (size >= 1) {
			return size + ' ' + EnumSizeFormat.GIGABYTE;
		}
		size = byte / 1024 / 1024;
		if (size >= 1) {
			return size + ' ' + EnumSizeFormat.MEGABYTE;
		}
		size = byte / 1024;
		if (size >= 1) {
			return size + ' ' + EnumSizeFormat.KILOBYTE;
		}
		return byte + ' ' + unit;
	}

	/**
	 * Ritorna un [SizeFormat]{@link SizeFormat} a partire da un valore in byte.
	 * La conversione avviene calcolando il formato più prossimo ad un valore intero.
	 * @example 3000 byte = 3KB
	 * @param byte valore in byte
	 */
	getSizeFormatFromBytes(byte: number): SizeFormat {
		let size = byte;
		const unit = EnumSizeFormat.BYTE;
		size = byte / 1024 / 1024 / 1024 / 1024;
		if (size >= 1) {
			return new SizeFormat(size, EnumSizeFormat.TERABYTE);
		}
		size = byte / 1024 / 1024 / 1024;
		if (size >= 1) {
			return new SizeFormat(size, EnumSizeFormat.GIGABYTE);
		}
		size = byte / 1024 / 1024;
		if (size >= 1) {
			return new SizeFormat(size, EnumSizeFormat.MEGABYTE);
		}
		size = byte / 1024;
		if (size >= 1) {
			return new SizeFormat(size, EnumSizeFormat.KILOBYTE);
		}
		return new SizeFormat(byte, unit);
	}

	/**
	 * Ritorna l'estensione di un file dal nome
	 * @param filename nome del file
	 */
	getFileExtension(filename: string) {
		return filename.split('.').pop();
	}

	getFilename(path: string): string {
		return path.split('\\').pop().split('/').pop();
	}

	/**
	 * Costruisce un [FileEmbedModel]{@link FileEmbedModel} impostando come parametro back
	 * la pagina corrente da cui si effettua la build
	 * @param title titolo del file
	 * @param mime mimetype
	 * @param type mimetype in enumeration {@link EnumTypeMime}
	 * @param ext estensione
	 * @param content contenuto in base64
	 * @param resource url della risorsa
	 */
	buildFileEmbed(
		title: string,
		mime: string,
		type: EnumTypeMime,
		ext: string,
		content?: any,
		resource?: any,
	): FileEmbedModel {
		const storage = new FileEmbedModel();
		storage.title = title ? title : '';
		storage.back = this.router.url;
		storage.mime = mime;
		storage.type = type;
		storage.ext = ext;
		storage.content = content ? content : undefined;
		storage.resource = resource ? resource : undefined;
		if (resource) {
			storage.name = this.getFilename(resource);
		} else {
			storage.name = title;
		}
		return storage;
	}

	setSizeFileEmbedModel(
		storage: FileEmbedModel,
		unit?: EnumSizeFormat,
	): Observable<FileEmbedModel> {
		let $obs: Observable<File>;
		if (storage.content) {
			$obs = of(this.getFileByContent(storage.content, storage.mime, storage.name));
		} else if (storage.resource) {
			$obs = this.readFile(storage.resource);
		}

		return $obs.pipe(
			map((res) => {
				const file: File = res;
				if (file) {
					if (unit) {
						storage.size = this.getSizeFromBytes(file.size, unit);
						storage.sizeFormat = new SizeFormat(storage.size, unit);
						storage.sizeString = storage.sizeFormat.sizeString;
					} else {
						storage.sizeFormat = this.getSizeFormatFromBytes(file.size);
						storage.size = storage.sizeFormat.size;
						storage.sizeString = storage.sizeFormat.sizeString;
					}
				}
				return storage;
			}),
		);
	}

	/**
	 * Costruisce un [FileEmbedModel]{@link FileEmbedModel} impostando come parametro back
	 * la pagina corrente da cui si effettua la build
	 * @param title titolo del file
	 * @param mime mimetype
	 * @param type mimetype in enumeration {@link EnumTypeMime}
	 * @param ext estensione
	 * @param blob blob del file
	 */
	buildFileEmbedBlob(
		title: string,
		mime: string,
		type: EnumTypeMime,
		ext: string,
		blob?: any,
	): Observable<FileEmbedModel> {
		const storage = new FileEmbedModel();
		storage.title = title ? title : '';
		storage.back = this.router.url;
		storage.mime = mime;
		storage.type = type;
		storage.ext = ext;
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				storage.resource = reader.result as string;
			},
			false,
		);

		if (blob) {
			reader.readAsDataURL(blob);
		}
		return of(storage);
	}

	// DOWNLOADING
	/**
	 * Dato un content in base64 e il suo mimetype ritorna la stringa
	 * source da associare ad un tag html src
	 * @param content contenuto base64
	 * @param contentType mimetype del file
	 */
	getBase64ByContent(content: any, contentType: string): string {
		if (!content || !contentType) {
			return undefined;
		}
		if (content.indexOf(';base64') !== -1) {
			return content;
		}
		return 'data:' + contentType + ';base64,' + content;
	}
	/**
	 * Dato un content in base64 e il suo mimetype ritorna un oggetto Blob
	 * @param content contenuto base64
	 * @param contentType mimetype del file
	 */
	getBlobByContent(content: any, contentType: string): Blob {
		const byteCharacters = atob(content);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		return new Blob([byteArray], { type: contentType });
	}

	getFileByContent(content: any, contentType: string, name: string): File {
		const byteCharacters = atob(content);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		return new File([byteArray], name, { type: contentType });
	}

	/**
	 * Data una stringa associata ad un tag html src
	 * Estrai il content base64 ripulendolo dei tags data,mimetype
	 * @param b64Data stringa in formato data:MimeType;base64
	 * @param contentType mimetype del file
	 */
	cleanBase64(b64Data: string, contentType: string): string {
		return b64Data.split('data:' + contentType + ';base64,').pop();
	}

	/**
	 * Dato il content di un file e il suo mimetype effettua il download del file
	 * col il nome filename
	 * @param content bas64 del file
	 * @param filename nome del file da salvare
	 * @param contentType mimetype del file
	 */
	downloadBase64(content: string, filename: string, contentType: string) {
		if (!contentType) {
			contentType = 'application/octet-stream';
		}
		const a = document.createElement('a');
		const contentClean = this.cleanBase64(content, contentType);
		const blob = this.getBlobByContent(contentClean, contentType);
		a.href = window.URL.createObjectURL(blob);
		a.download = filename;
		a.click();
	}

	/**
	 * Data una stringa associata ad un tag html src
	 * Estrai il content base64 e il mimetype
	 * @param base64 stringa in formato data:MimeType;base64
	 */
	getMimeAndContentByBase64(base64: string): any {
		const mimeType = base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
		let content;
		if (mimeType) {
			content = this.cleanBase64(base64, mimeType);
			return { mimetype: mimeType, content: content };
		}
		return undefined;
	}
}
