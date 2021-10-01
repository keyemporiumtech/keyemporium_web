import { ApiDTO } from '../../cakeutils/base/api.dto';

export class TestDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public result: number;
}
