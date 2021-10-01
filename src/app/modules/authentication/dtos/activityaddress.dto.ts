import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';

export class ActivityaddressDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public activity: string;
	public activity_fk: ActivityDTO;
	public address: string;
	public address_fk: AddressDTO;
	public tpaddress: string;
	public tpaddress_fk: TypologicalDTO;
	public group: string;
}
