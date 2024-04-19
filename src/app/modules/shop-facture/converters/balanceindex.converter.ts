import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	BalanceConverter,
	BalanceUtilConverter,
} from '../../shop-payment/converters/balance.converter';
import { BalanceModel } from '../../shop-payment/models/balance.model';
import { BalanceindexDTO } from '../dtos/balanceindex.dto';
import { BalanceindexModel } from '../models/balanceindex.model';

export class BalanceindexConverter extends BaseApiConverter<BalanceindexModel, BalanceindexDTO> {
	public convertToModel(dto?: BalanceindexDTO): BalanceindexModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalanceindexModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpbalancedoc', 'tpbalancedoc_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		model.val = dto.val;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('balance', 'balance_fk', new BalanceConverter()),
			new BalanceModel(),
		);
		model.year = dto.year;
		model.format = dto.format;
		return model;
	}
	public convertToDto(model?: BalanceindexModel): BalanceindexDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalanceindexDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpbalancedoc', 'tpbalancedoc_fk', new TypologicalConverter()),
		);
		dto.val = model.val;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('balance', 'balance_fk', new BalanceConverter()),
		);
		dto.year = model.year;
		dto.format = model.format;
		return dto;
	}
	public getEmptyModel(): BalanceindexModel {
		const model = new BalanceindexModel();
		model.tpbalancedoc = TypologicalUtilConverter.toModel();
		model.balance = BalanceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalanceindexDTO {
		const dto = new BalanceindexDTO();
		dto.tpbalancedoc_fk = TypologicalUtilConverter.toDto();
		dto.balance_fk = BalanceUtilConverter.toDto();
		return dto;
	}
}

export class BalanceindexUtilConverter {
	static toDto(model?: BalanceindexModel) {
		const converter = new BalanceindexConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalanceindexDTO) {
		const converter = new BalanceindexConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalanceindexModel[]) {
		const converter = new BalanceindexConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalanceindexDTO[]) {
		const converter = new BalanceindexConverter();
		return converter.convertToModelList(dtos);
	}
}
