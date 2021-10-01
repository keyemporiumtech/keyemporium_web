import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { IbanDTO } from '../dtos/iban.dto';
import { IbanModel } from '../models/iban.model';
import { TypeConverter } from '@ddc/kit';
import { EnumIbanOrg } from '../enums/iban-org.enum';

export class IbanConverter extends BaseApiConverter<IbanModel, IbanDTO> {
	private tporgEnumConverter = new TypeConverter<string, EnumIbanOrg>();

	public convertToModel(dto?: IbanDTO): IbanModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new IbanModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.input = dto.input;
		model.iban = dto.iban;
		model.bban = dto.bban;
		model.swift_bic = dto.swift_bic;
		model.swift = dto.swift;
		model.bic = dto.bic;
		model.abi = dto.abi;
		model.cab = dto.cab;
		model.cin = dto.cin;
		model.cc = dto.cc;
		model.bankcod = dto.bankcod;
		model.bankorg = dto.bankorg;
		model.labelorg_cod = dto.labelorg_cod;
		model.controlkey = dto.controlkey;
		model.controlkey2 = dto.controlkey2;
		model.controlnumbers = dto.controlnumbers;
		model.controlcod = dto.controlcod;
		model.id_national_owner = dto.id_national_owner;
		model.cod_iso3166 = dto.cod_iso3166;
		model.pattern = dto.pattern;
		model.labelpattern = dto.labelpattern;
		model.length = dto.length;
		model.labels = dto.labels;
		// enums
		model.tporg = this.tporgEnumConverter.convertToB(dto.labelorg_cod);
		return model;
	}
	public convertToDto(model?: IbanModel): IbanDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new IbanDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.input = model.input;
		dto.iban = model.iban;
		dto.bban = model.bban;
		dto.swift_bic = model.swift_bic;
		dto.swift = model.swift;
		dto.bic = model.bic;
		dto.abi = model.abi;
		dto.cab = model.cab;
		dto.cin = model.cin;
		dto.cc = model.cc;
		dto.bankcod = model.bankcod;
		dto.bankorg = model.bankorg;
		dto.labelorg_cod = model.labelorg_cod;
		dto.controlkey = model.controlkey;
		dto.controlkey2 = model.controlkey2;
		dto.controlnumbers = model.controlnumbers;
		dto.controlcod = model.controlcod;
		dto.id_national_owner = model.id_national_owner;
		dto.cod_iso3166 = model.cod_iso3166;
		dto.pattern = model.pattern;
		dto.labelpattern = model.labelpattern;
		dto.length = model.length;
		dto.labels = model.labels;
		return dto;
	}
	public getEmptyModel(): IbanModel {
		const model = new IbanModel();
		return model;
	}
	public getEmptyDto(): IbanDTO {
		const dto = new IbanDTO();
		return dto;
	}
}

export class IbanUtilConverter {
	static toDto(model?: IbanModel) {
		const converter = new IbanConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: IbanDTO) {
		const converter = new IbanConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: IbanModel[]) {
		const converter = new IbanConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: IbanDTO[]) {
		const converter = new IbanConverter();
		return converter.convertToModelList(dtos);
	}
}
