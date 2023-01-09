import { ApiModel } from './api.model';
import { ApiDTO } from './api.dto';
import { BaseConverter, DateModel } from '@ddc/kit';

export abstract class BaseApiConverter<M extends ApiModel, D extends ApiDTO> extends BaseConverter<
	M,
	D
> {
	getEmptyIfNull: boolean;
	constructor(getEmptyIfNull?: boolean) {
		super();
		this.getEmptyIfNull = getEmptyIfNull;
	}

	convertCommonPropertiesToModel(dto: D, model: M) {
		if (dto['id']) {
			model['id'] = dto['id'];
		}
		if (dto['created']) {
			model['created'] = dto['created'];
		}
		if (dto['modified']) {
			model['modified'] = dto['modified'];
		}
		if (dto['grouprelation_cod']) {
			model['grouprelation_cod'] = dto['grouprelation_cod'];
		}
		if (dto['grouprelation_groupcod']) {
			model['grouprelation_groupcod'] = dto['grouprelation_groupcod'];
		}
	}

	convertCommonPropertiesToDto(dto: D, model: M) {
		if (model['id']) {
			dto['id'] = model['id'];
		}
		if (model['created']) {
			this.convertDateToDto(dto, model, 'created', 'createdModel');
		}
		if (model['modified']) {
			this.convertDateToDto(dto, model, 'modified', 'modifiedModel');
		}
	}

	convertBooleanToModel(dto: D, model: M, dtoField: string, modelField?: string) {
		const modelFieldNew: string = modelField ? modelField : dtoField;
		model[modelFieldNew] = +dto[dtoField] === 1 ? true : false;
	}

	convertBooleanToDto(dto: D, model: M, dtoField: string, modelField?: string) {
		const modelFieldNew: string = modelField ? modelField : dtoField;
		dto[dtoField] = model[modelFieldNew] ? 1 : 0;
	}

	convertDateToDto(
		dto: D,
		model: M,
		dtoField: string,
		modelFieldDateModel?: string,
		modelField?: string,
	) {
		const modelFieldNew: string = modelFieldDateModel
			? modelFieldDateModel
			: modelField
			? modelField
			: dtoField;
		const modelFieldString: string = modelField ? modelField : dtoField;
		const modelVal =
			model[modelFieldNew] instanceof DateModel
				? model[modelFieldNew]
				: typeof model[modelFieldNew] === 'string'
				? new DateModel(model[modelFieldNew])
				: undefined;
		dto[dtoField] = modelVal
			? localStorage.getItem('timezoneNameServer')
				? modelVal.toString('YYYY-MM-DD HH:mm:ssZ', localStorage.getItem('timezoneNameServer'))
				: model[modelFieldString]
				? model[modelFieldString]
				: null
			: null;
	}

	/**
	 *
	 * @param dto
	 * @param model
	 * @param props example keyId = logo, keyIdDto = logoid, keyFk = logo_fk
	 * @param emptyModel
	 */
	convertForeignKeyToModel(dto: D, model: M, props: PropertyForeignKey, emptyModel: any) {
		if (dto[props.keyIdDto] && dto[props.keyIdDto] !== 0 && !dto[props.keyFk]) {
			model[props.keyId] = emptyModel;
			model[props.keyId].id = dto[props.keyIdDto];
		}
		if (dto[props.keyFk] && dto[props.keyIdDto] !== 0) {
			model[props.keyId] = props.converter.convertToModel(dto[props.keyFk]);
		}
	}

	convertForeignKeyToDto(dto: D, model: M, props: PropertyForeignKey) {
		if (model[props.keyId] && model[props.keyId].id && model[props.keyId].id !== 0) {
			dto[props.keyIdDto] = model[props.keyId].id;
		}
		if (model[props.keyId]) {
			dto[props.keyFk] = props.converter.convertToDto(model[props.keyId]);
		}
	}

	/**
	 *
	 * @param dto
	 * @param model
	 * @param props example keyId = logo, keyIdDto = logo_val, keyVal = content
	 */
	convertForeignValueToModel(dto: D, model: M, props: PropertyForeignKey) {
		if (dto[props.keyIdDto]) {
			if (model[props.keyId] && !model[props.keyId][props.keyVal]) {
				model[props.keyId][props.keyVal] = dto[props.keyIdDto];
			} else {
				model[props.keyIdDto] = dto[props.keyIdDto];
			}
		}
	}

	convertForeignValueToDto(dto: D, model: M, props: PropertyForeignKey) {
		if (model[props.keyIdDto]) {
			dto[props.keyIdDto] = model[props.keyIdDto];
		} else if (model[props.keyId] && model[props.keyId][props.keyVal]) {
			dto[props.keyIdDto] = model[props.keyId][props.keyVal];
		}
	}

	getPropertyForFk(id: string, fk: string, converter: BaseConverter<any, any>, idDto?: string) {
		return new PropertyForeignKey(id, fk, null, idDto, converter);
	}
	getPropertyForVal(id: string, val: string, keyVal: string) {
		return new PropertyForeignKey(id, null, keyVal, val);
	}

	// base64 content
	convertBase64ToModel(value: string) {
		return value ? value.replace(' ', '') : undefined;
	}
	convertBase64ToDto(value: string) {
		return value ? value.replace(' ', '') : null;
	}
}

export class PropertyForeignKey {
	public keyId: string;
	public keyFk: string;
	public keyVal: string;
	public keyIdDto: string;
	public converter: BaseConverter<any, any>;

	constructor(
		id?: string, // oggetto del model
		fk?: string, // oggetto del dto memorizzato nella fk (_fk)
		val?: string, //
		idDto?: string, // id del dto che rappresente l'id dell'oggetto model
		converter?: BaseConverter<any, any>,
	) {
		this.keyId = id;
		this.keyFk = fk;
		this.keyVal = val;
		this.keyIdDto = idDto ? idDto : id;
		this.converter = converter;
	}
}
