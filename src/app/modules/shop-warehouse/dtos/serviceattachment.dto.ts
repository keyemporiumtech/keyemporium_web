import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ServiceDTO } from './service.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class ServiceattachmentDTO extends ApiDTO {
	public cod: string;
	public service: string;
	public service_fk: ServiceDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
