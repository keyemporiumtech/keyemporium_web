import { FileEmbedModel, FileService, EnumTypeMime } from '@ddc/kit';

export class ContentUtility {
	static getFileEmbedModelByBase64(
		base64: string,
		name: string,
		ext: string,
		fileService: FileService,
		type?: EnumTypeMime,
	): FileEmbedModel {
		let result: FileEmbedModel;
		const objMC = fileService.getMimeAndContentByBase64(base64);
		if (objMC) {
			result = fileService.buildFileEmbed(name, objMC.mimetype, type, ext, objMC.content);
		}
		return result;
	}
}
