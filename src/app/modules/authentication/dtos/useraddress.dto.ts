import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';

export class UseraddressDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public user: string;
	public user_fk: UserDTO;
	public address: string;
	public address_fk: AddressDTO;
	public tpaddress: string;
	public tpaddress_fk: TypologicalDTO;
	public group: string;
}
