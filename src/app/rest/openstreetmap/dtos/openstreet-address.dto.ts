import { BaseDTO } from '@ddc/kit';

/**
 * addressdetails - https://nominatim.org/release-docs/develop/api/Output/#json
 * Address details in the xml and json formats return a list of names together with
 * a designation label. Per default the following labels may appear:
 *
 * - continent
 * - country, country_code
 * - region, state, state_district, county
 * - municipality, city, town, village
 * - city_district, district, borough, suburb, subdivision
 * - hamlet, croft, isolated_dwelling
 * - neighbourhood, allotments, quarter
 * - city_block, residental, farm, farmyard, industrial, commercial, retail
 * - road
 * - house_number, house_name
 * - emergency, historic, military, natural, landuse, place, railway, man_made,
 * aerialway, boundary, amenity, aeroway, club, craft, leisure, office, mountain_pass, shop, tourism, bridge, tunnel, waterway
 */

export interface OpenstreetAddressDTO extends BaseDTO {
	continent?: string;
	// iso
	country?: string;
	country_code?: string; // minuscolo (ex. it)
	// region
	region?: string;
	state?: string; // PER IT è REGIONE
	state_district?: string; // PER IT è REGIONE
	county?: string;
	// place 1
	municipality?: string; // comune
	city?: string; // città
	town?: string; // cittadina
	village?: string; // villaggio
	// place 2
	city_district?: string; // quartiere della città
	district?: string; // distretto
	borough?: string; // borgo
	suburb?: string; // sobborgo
	subdivision?: string; // suddivisione
	// dug 1
	hamlet?: string; // frazione
	croft?: string; // podere
	isolated_dwelling?: string; // dimora
	// dug 2
	neighbourhood?: string; // quartiere
	allotments?: string; // assegnazione
	quarter?: string; // quartiere
	// dug 3
	city_block?: string; // blocco urbano
	residental?: string; // residente o residenziale
	// street
	road?: string;
	house_number?: string;
	house_name?: string;
	// zip
	postcode?: string;
	// category
	farm?: string; // azienda agricola
	farmyard?: string; // aia
	industrial?: string; // industriale
	commercial?: string; // commerciale
	retail?: string; // vendita al dettaglio
	emergency?: string;
	historic?: string;
	military?: string;
	natural?: string;
	landuse?: string;
	place?: string;
	railway?: string;
	man_made?: string;
	aerialway?: string;
	boundary?: string;
	amenity?: string;
	aeroway?: string;
	club?: string;
	craft?: string;
	leisure?: string;
	office?: string;
	mountain_pass?: string;
	shop?: string;
	tourism?: string;
	bridge?: string;
	tunnel?: string;
	waterway?: string;
}
