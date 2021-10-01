import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class IbanDTO extends ApiDTO {
	public input: string;
	public iban: string;
	public bban: string;
	public swift_bic: string;
	public swift: string;
	public bic: string;
	public abi: string;
	public cab: string;
	public cin: string;
	public cc: string;
	public bankcod: string;
	public bankorg: string; /* codice filiale/codice sportello/codice agenzia/Code guichet */
	public labelorg_cod: string; /* EnumIBANOrg */
	public controlkey: string; /* chiave di controllo */
	public controlkey2: string; /* seconda chiave di controllo */
	public controlnumbers: string; /* numeri di controllo */
	public controlcod: string; /* codice di controllo */
	public id_national_owner: string; /* id nazionale del proprietario */
	public cod_iso3166: string;
	public pattern: string; /* FIELD1-INITSTRING-ENDSTRING|FIELD2-INITSTRING-ENDSTRING */
	public labelpattern: string; /* FIELD1-KEY_TRANSLATE|FIELD2-KEY_TRANSLATE*/
	public length: number;
	public labels: string[];
}
