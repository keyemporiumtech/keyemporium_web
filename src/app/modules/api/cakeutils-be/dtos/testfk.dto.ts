import { ApiDTO } from '../../cakeutils/base/api.dto';
import { TestDTO } from './test.dto';

export class TestfkDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public result: number;
	public test: number;
	public test_fk: TestDTO;
	// relation values
	public test_title: string;
}
