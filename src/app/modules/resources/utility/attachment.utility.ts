import { FileEmbedModel, FileService, StringTranslate, SizeFormat, EnumSizeFormat } from '@ddc/kit';
import { AttachmentModel } from '../models/attachment.model';
import { AttachmentConverter } from '../converters/attachment.converter';
import { ContentUtility } from '../../api/utility/content.utility';

export class AttachmentUtility {
	static convertBase64ToAttachment(
		base64: string,
		name: string,
		ext: string,
		fileService: FileService,
	): AttachmentModel {
		const file = ContentUtility.getFileEmbedModelByBase64(base64, name, ext, fileService);
		return this.convertFileEmbedModelToAttachment(file, fileService);
	}

	static convertFileEmbedModelToAttachment(
		file: FileEmbedModel,
		fileService: FileService,
	): AttachmentModel {
		const converter = new AttachmentConverter();
		const attachment = converter.getEmptyModel();
		// attachment.url = file.name;
		if (!file.mime || !file.content) {
			const info = fileService.getMimeAndContentByBase64(file.resource);
			attachment.mimetype = info.mimetype;
			attachment.content = info.content;
		} else {
			attachment.mimetype = file.mime;
			attachment.content = file.content;
		}

		attachment.name = file.name.split('.' + file.ext).join('');
		attachment.ext = file.ext;

		if (file.sizeFormat.unit === EnumSizeFormat.KILOBYTE) {
			attachment.size = file.sizeFormat.size;
		} else {
			attachment.size = fileService.getSizeFromBytes(file.size, EnumSizeFormat.KILOBYTE);
		}
		return attachment;
	}

	static convertAttachmentToFileEmbedModel(
		attachment: AttachmentModel,
		title?: string | StringTranslate,
	): FileEmbedModel {
		const file = new FileEmbedModel();
		file.name = attachment.url;
		file.ext = attachment.ext;
		file.size = +attachment.size;
		file.sizeFormat = new SizeFormat(+attachment.size, EnumSizeFormat.KILOBYTE);
		file.content = attachment.content;
		file.mime = attachment.mimetype;
		// file.type = attachment.type;
		file.title = title;
		return file;
	}
}
