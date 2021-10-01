import { BaseConverter } from '@ddc/kit';
import { OpenstreetAddressModel } from '../models/openstreet-address.model';
import { OpenstreetAddressDTO } from '../dtos/openstreet-address.dto';

export class OpenstreetAddressConverter extends BaseConverter<
	OpenstreetAddressModel,
	OpenstreetAddressDTO
> {
	public convertToModel(dto?: OpenstreetAddressDTO): OpenstreetAddressModel {
		if (!dto) {
			return undefined;
		}
		const model = new OpenstreetAddressModel();
		model.continent = dto.continent;
		model.country = dto.country;
		model.country_code = dto.country_code; // minuscolo (ex. it)
		model.region = dto.region;
		model.state = dto.state; // PER IT è REGIONE
		model.state_district = dto.state_district; // PER IT è REGIONE
		model.county = dto.county;
		model.municipality = dto.municipality; // comune
		model.city = dto.city; // città
		model.town = dto.town; // cittadina
		model.village = dto.village; // villaggio
		model.city_district = dto.city_district; // quartiere della città
		model.district = dto.district; // distretto
		model.borough = dto.borough; // borgo
		model.suburb = dto.suburb; // sobborgo
		model.subdivision = dto.subdivision; // suddivisione
		model.hamlet = dto.hamlet; // frazione
		model.croft = dto.croft; // podere
		model.isolated_dwelling = dto.isolated_dwelling; // dimora
		model.neighbourhood = dto.neighbourhood; // quartiere
		model.allotments = dto.allotments; // assegnazione
		model.quarter = dto.quarter; // quartiere
		model.city_block = dto.city_block; // blocco urbano
		model.residental = dto.residental; // residente o residenziale
		model.farm = dto.farm; // azienda agricola
		model.farmyard = dto.farmyard; // aia
		model.industrial = dto.industrial; // industriale
		model.commercial = dto.commercial; // commerciale
		model.retail = dto.retail; // vendita al dettaglio
		model.road = dto.road;
		model.house_number = dto.house_number;
		model.house_name = dto.house_name;
		model.postcode = dto.postcode;
		return model;
	}
	public convertToDto(model?: OpenstreetAddressModel): OpenstreetAddressDTO {
		if (!model) {
			return undefined;
		}
		const dto: OpenstreetAddressDTO = { id: undefined };
		dto.continent = model.continent;
		dto.country = model.country;
		dto.country_code = model.country_code; // minuscolo (ex. it)
		dto.region = model.region;
		dto.state = model.state; // PER IT è REGIONE
		dto.state_district = model.state_district; // PER IT è REGIONE
		dto.county = model.county;
		dto.municipality = model.municipality; // comune
		dto.city = model.city; // città
		dto.town = model.town; // cittadina
		dto.village = model.village; // villaggio
		dto.city_district = model.city_district; // quartiere della città
		dto.district = model.district; // distretto
		dto.borough = model.borough; // borgo
		dto.suburb = model.suburb; // sobborgo
		dto.subdivision = model.subdivision; // suddivisione
		dto.hamlet = model.hamlet; // frazione
		dto.croft = model.croft; // podere
		dto.isolated_dwelling = model.isolated_dwelling; // dimora
		dto.neighbourhood = model.neighbourhood; // quartiere
		dto.allotments = model.allotments; // assegnazione
		dto.quarter = model.quarter; // quartiere
		dto.city_block = model.city_block; // blocco urbano
		dto.residental = model.residental; // residente o residenziale
		dto.farm = model.farm; // azienda agricola
		dto.farmyard = model.farmyard; // aia
		dto.industrial = model.industrial; // industriale
		dto.commercial = model.commercial; // commerciale
		dto.retail = model.retail; // vendita al dettaglio
		dto.road = model.road;
		dto.house_number = model.house_number;
		dto.house_name = model.house_name;
		dto.postcode = model.postcode;
		return dto;
	}
	public getEmptyModel(): OpenstreetAddressModel {
		return new OpenstreetAddressModel();
	}
	public getEmptyDto(): OpenstreetAddressDTO {
		return { id: undefined };
	}
}
