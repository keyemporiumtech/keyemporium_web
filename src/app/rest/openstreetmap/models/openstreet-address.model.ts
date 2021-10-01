import { BaseModel } from '@ddc/kit';

export class OpenstreetAddressModel extends BaseModel {
	private _continent: string;
	// iso
	private _country: string;
	private _country_code: string; // minuscolo (ex. it)
	// region
	private _region: string;
	private _state: string; // PER IT è REGIONE
	private _state_district: string; // PER IT è REGIONE
	private _county: string; // PER IT è PROVINCIA
	// place 1
	private _municipality: string; // comune
	private _city: string; // città
	private _town: string; // cittadina
	private _village: string; // villaggio
	// place 2
	private _city_district: string; // quartiere della città
	private _district: string; // distretto
	private _borough: string; // borgo
	private _suburb: string; // sobborgo
	private _subdivision: string; // suddivisione
	// dug 1
	private _hamlet: string; // frazione
	private _croft: string; // podere
	private _isolated_dwelling: string; // dimora
	// dug 2
	private _neighbourhood: string; // quartiere
	private _allotments: string; // assegnazione
	private _quarter: string; // quartiere
	// dug 3
	private _city_block: string; // blocco urbano
	private _residental: string; // residente o residenziale
	// street
	private _road: string;
	private _house_number: string;
	private _house_name: string;
	// zip
	private _postcode: string;
	// category
	private _farm: string; // azienda agricola
	private _farmyard: string; // aia
	private _industrial: string; // industriale
	private _commercial: string; // commerciale
	private _retail: string; // vendita al dettaglio
	private _emergency: string;
	private _historic: string;
	private _military: string;
	private _natural: string;
	private _landuse: string;
	private _place: string;
	private _railway: string;
	private _man_made: string;
	private _aerialway: string;
	private _boundary: string;
	private _amenity: string;
	private _aeroway: string;
	private _club: string;
	private _craft: string;
	private _leisure: string;
	private _office: string;
	private _mountain_pass: string;
	private _shop: string;
	private _tourism: string;
	private _bridge: string;
	private _tunnel: string;
	private _waterway: string;

	// UTILITY
	get buildRegion(): string {
		return this.region || this.state || this.state_district;
	}
	get buildPlace(): string {
		return (
			this.city ||
			this.municipality ||
			this.town ||
			this.village ||
			this.district ||
			this.borough ||
			this.suburb ||
			this.subdivision
		);
	}

	get buildStreet(): string {
		return (
			this.road ||
			this.hamlet ||
			this.croft ||
			this.isolated_dwelling ||
			this.neighbourhood ||
			this.allotments ||
			this.quarter ||
			this.city_block ||
			this.residental
		);
	}

	get buildType(): string {
		return this.farm || this.farmyard || this.industrial || this.commercial || this.retail;
	}

	get buildCategory(): string {
		return (
			this.emergency ||
			this.historic ||
			this.military ||
			this.landuse ||
			this.place ||
			this.railway ||
			this.man_made ||
			this.aerialway ||
			this.boundary ||
			this.amenity ||
			this.aeroway ||
			this.club ||
			this.craft ||
			this.leisure ||
			this.office ||
			this.mountain_pass ||
			this.shop ||
			this.tourism ||
			this.bridge ||
			this.tunnel ||
			this.waterway ||
			this.buildType
		);
	}

	/**
	 * Getter continent
	 * @return {string}
	 */
	public get continent(): string {
		return this._continent;
	}

	/**
	 * Getter country
	 * @return {string}
	 */
	public get country(): string {
		return this._country;
	}

	/**
	 * Getter country_code
	 * @return {string}
	 */
	public get country_code(): string {
		return this._country_code;
	}

	/**
	 * Getter region
	 * @return {string}
	 */
	public get region(): string {
		return this._region;
	}

	/**
	 * Getter state
	 * @return {string}
	 */
	public get state(): string {
		return this._state;
	}

	/**
	 * Getter state_district
	 * @return {string}
	 */
	public get state_district(): string {
		return this._state_district;
	}

	/**
	 * Getter county
	 * @return {string}
	 */
	public get county(): string {
		return this._county;
	}

	/**
	 * Getter municipality
	 * @return {string}
	 */
	public get municipality(): string {
		return this._municipality;
	}

	/**
	 * Getter city
	 * @return {string}
	 */
	public get city(): string {
		return this._city;
	}

	/**
	 * Getter town
	 * @return {string}
	 */
	public get town(): string {
		return this._town;
	}

	/**
	 * Getter village
	 * @return {string}
	 */
	public get village(): string {
		return this._village;
	}

	/**
	 * Getter city_district
	 * @return {string}
	 */
	public get city_district(): string {
		return this._city_district;
	}

	/**
	 * Getter district
	 * @return {string}
	 */
	public get district(): string {
		return this._district;
	}

	/**
	 * Getter borough
	 * @return {string}
	 */
	public get borough(): string {
		return this._borough;
	}

	/**
	 * Getter suburb
	 * @return {string}
	 */
	public get suburb(): string {
		return this._suburb;
	}

	/**
	 * Getter subdivision
	 * @return {string}
	 */
	public get subdivision(): string {
		return this._subdivision;
	}

	/**
	 * Getter hamlet
	 * @return {string}
	 */
	public get hamlet(): string {
		return this._hamlet;
	}

	/**
	 * Getter croft
	 * @return {string}
	 */
	public get croft(): string {
		return this._croft;
	}

	/**
	 * Getter isolated_dwelling
	 * @return {string}
	 */
	public get isolated_dwelling(): string {
		return this._isolated_dwelling;
	}

	/**
	 * Getter neighbourhood
	 * @return {string}
	 */
	public get neighbourhood(): string {
		return this._neighbourhood;
	}

	/**
	 * Getter allotments
	 * @return {string}
	 */
	public get allotments(): string {
		return this._allotments;
	}

	/**
	 * Getter quarter
	 * @return {string}
	 */
	public get quarter(): string {
		return this._quarter;
	}

	/**
	 * Getter city_block
	 * @return {string}
	 */
	public get city_block(): string {
		return this._city_block;
	}

	/**
	 * Getter residental
	 * @return {string}
	 */
	public get residental(): string {
		return this._residental;
	}

	/**
	 * Getter farm
	 * @return {string}
	 */
	public get farm(): string {
		return this._farm;
	}

	/**
	 * Getter farmyard
	 * @return {string}
	 */
	public get farmyard(): string {
		return this._farmyard;
	}

	/**
	 * Getter industrial
	 * @return {string}
	 */
	public get industrial(): string {
		return this._industrial;
	}

	/**
	 * Getter commercial
	 * @return {string}
	 */
	public get commercial(): string {
		return this._commercial;
	}

	/**
	 * Getter retail
	 * @return {string}
	 */
	public get retail(): string {
		return this._retail;
	}

	/**
	 * Getter road
	 * @return {string}
	 */
	public get road(): string {
		return this._road;
	}

	/**
	 * Getter house_number
	 * @return {string}
	 */
	public get house_number(): string {
		return this._house_number;
	}

	/**
	 * Getter house_name
	 * @return {string}
	 */
	public get house_name(): string {
		return this._house_name;
	}

	/**
	 * Getter postcode
	 * @return {string}
	 */
	public get postcode(): string {
		return this._postcode;
	}

	/**
	 * Setter continent
	 * @param {string} value
	 */
	public set continent(value: string) {
		this._continent = value;
	}

	/**
	 * Setter country
	 * @param {string} value
	 */
	public set country(value: string) {
		this._country = value;
	}

	/**
	 * Setter country_code
	 * @param {string} value
	 */
	public set country_code(value: string) {
		this._country_code = value;
	}

	/**
	 * Setter region
	 * @param {string} value
	 */
	public set region(value: string) {
		this._region = value;
	}

	/**
	 * Setter state
	 * @param {string} value
	 */
	public set state(value: string) {
		this._state = value;
	}

	/**
	 * Setter state_district
	 * @param {string} value
	 */
	public set state_district(value: string) {
		this._state_district = value;
	}

	/**
	 * Setter county
	 * @param {string} value
	 */
	public set county(value: string) {
		this._county = value;
	}

	/**
	 * Setter municipality
	 * @param {string} value
	 */
	public set municipality(value: string) {
		this._municipality = value;
	}

	/**
	 * Setter city
	 * @param {string} value
	 */
	public set city(value: string) {
		this._city = value;
	}

	/**
	 * Setter town
	 * @param {string} value
	 */
	public set town(value: string) {
		this._town = value;
	}

	/**
	 * Setter village
	 * @param {string} value
	 */
	public set village(value: string) {
		this._village = value;
	}

	/**
	 * Setter city_district
	 * @param {string} value
	 */
	public set city_district(value: string) {
		this._city_district = value;
	}

	/**
	 * Setter district
	 * @param {string} value
	 */
	public set district(value: string) {
		this._district = value;
	}

	/**
	 * Setter borough
	 * @param {string} value
	 */
	public set borough(value: string) {
		this._borough = value;
	}

	/**
	 * Setter suburb
	 * @param {string} value
	 */
	public set suburb(value: string) {
		this._suburb = value;
	}

	/**
	 * Setter subdivision
	 * @param {string} value
	 */
	public set subdivision(value: string) {
		this._subdivision = value;
	}

	/**
	 * Setter hamlet
	 * @param {string} value
	 */
	public set hamlet(value: string) {
		this._hamlet = value;
	}

	/**
	 * Setter croft
	 * @param {string} value
	 */
	public set croft(value: string) {
		this._croft = value;
	}

	/**
	 * Setter isolated_dwelling
	 * @param {string} value
	 */
	public set isolated_dwelling(value: string) {
		this._isolated_dwelling = value;
	}

	/**
	 * Setter neighbourhood
	 * @param {string} value
	 */
	public set neighbourhood(value: string) {
		this._neighbourhood = value;
	}

	/**
	 * Setter allotments
	 * @param {string} value
	 */
	public set allotments(value: string) {
		this._allotments = value;
	}

	/**
	 * Setter quarter
	 * @param {string} value
	 */
	public set quarter(value: string) {
		this._quarter = value;
	}

	/**
	 * Setter city_block
	 * @param {string} value
	 */
	public set city_block(value: string) {
		this._city_block = value;
	}

	/**
	 * Setter residental
	 * @param {string} value
	 */
	public set residental(value: string) {
		this._residental = value;
	}

	/**
	 * Setter farm
	 * @param {string} value
	 */
	public set farm(value: string) {
		this._farm = value;
	}

	/**
	 * Setter farmyard
	 * @param {string} value
	 */
	public set farmyard(value: string) {
		this._farmyard = value;
	}

	/**
	 * Setter industrial
	 * @param {string} value
	 */
	public set industrial(value: string) {
		this._industrial = value;
	}

	/**
	 * Setter commercial
	 * @param {string} value
	 */
	public set commercial(value: string) {
		this._commercial = value;
	}

	/**
	 * Setter retail
	 * @param {string} value
	 */
	public set retail(value: string) {
		this._retail = value;
	}

	/**
	 * Setter road
	 * @param {string} value
	 */
	public set road(value: string) {
		this._road = value;
	}

	/**
	 * Setter house_number
	 * @param {string} value
	 */
	public set house_number(value: string) {
		this._house_number = value;
	}

	/**
	 * Setter house_name
	 * @param {string} value
	 */
	public set house_name(value: string) {
		this._house_name = value;
	}

	/**
	 * Setter postcode
	 * @param {string} value
	 */
	public set postcode(value: string) {
		this._postcode = value;
	}

	/**
	 * Getter emergency
	 * @return {string}
	 */
	public get emergency(): string {
		return this._emergency;
	}

	/**
	 * Getter historic
	 * @return {string}
	 */
	public get historic(): string {
		return this._historic;
	}

	/**
	 * Getter military
	 * @return {string}
	 */
	public get military(): string {
		return this._military;
	}

	/**
	 * Getter natural
	 * @return {string}
	 */
	public get natural(): string {
		return this._natural;
	}

	/**
	 * Getter landuse
	 * @return {string}
	 */
	public get landuse(): string {
		return this._landuse;
	}

	/**
	 * Getter place
	 * @return {string}
	 */
	public get place(): string {
		return this._place;
	}

	/**
	 * Getter railway
	 * @return {string}
	 */
	public get railway(): string {
		return this._railway;
	}

	/**
	 * Getter man_made
	 * @return {string}
	 */
	public get man_made(): string {
		return this._man_made;
	}

	/**
	 * Getter aerialway
	 * @return {string}
	 */
	public get aerialway(): string {
		return this._aerialway;
	}

	/**
	 * Getter boundary
	 * @return {string}
	 */
	public get boundary(): string {
		return this._boundary;
	}

	/**
	 * Getter amenity
	 * @return {string}
	 */
	public get amenity(): string {
		return this._amenity;
	}

	/**
	 * Getter aeroway
	 * @return {string}
	 */
	public get aeroway(): string {
		return this._aeroway;
	}

	/**
	 * Getter club
	 * @return {string}
	 */
	public get club(): string {
		return this._club;
	}

	/**
	 * Getter craft
	 * @return {string}
	 */
	public get craft(): string {
		return this._craft;
	}

	/**
	 * Getter leisure
	 * @return {string}
	 */
	public get leisure(): string {
		return this._leisure;
	}

	/**
	 * Getter office
	 * @return {string}
	 */
	public get office(): string {
		return this._office;
	}

	/**
	 * Getter mountain_pass
	 * @return {string}
	 */
	public get mountain_pass(): string {
		return this._mountain_pass;
	}

	/**
	 * Getter shop
	 * @return {string}
	 */
	public get shop(): string {
		return this._shop;
	}

	/**
	 * Getter tourism
	 * @return {string}
	 */
	public get tourism(): string {
		return this._tourism;
	}

	/**
	 * Getter bridge
	 * @return {string}
	 */
	public get bridge(): string {
		return this._bridge;
	}

	/**
	 * Getter tunnel
	 * @return {string}
	 */
	public get tunnel(): string {
		return this._tunnel;
	}

	/**
	 * Getter waterway
	 * @return {string}
	 */
	public get waterway(): string {
		return this._waterway;
	}

	/**
	 * Setter emergency
	 * @param {string} value
	 */
	public set emergency(value: string) {
		this._emergency = value;
	}

	/**
	 * Setter historic
	 * @param {string} value
	 */
	public set historic(value: string) {
		this._historic = value;
	}

	/**
	 * Setter military
	 * @param {string} value
	 */
	public set military(value: string) {
		this._military = value;
	}

	/**
	 * Setter natural
	 * @param {string} value
	 */
	public set natural(value: string) {
		this._natural = value;
	}

	/**
	 * Setter landuse
	 * @param {string} value
	 */
	public set landuse(value: string) {
		this._landuse = value;
	}

	/**
	 * Setter place
	 * @param {string} value
	 */
	public set place(value: string) {
		this._place = value;
	}

	/**
	 * Setter railway
	 * @param {string} value
	 */
	public set railway(value: string) {
		this._railway = value;
	}

	/**
	 * Setter man_made
	 * @param {string} value
	 */
	public set man_made(value: string) {
		this._man_made = value;
	}

	/**
	 * Setter aerialway
	 * @param {string} value
	 */
	public set aerialway(value: string) {
		this._aerialway = value;
	}

	/**
	 * Setter boundary
	 * @param {string} value
	 */
	public set boundary(value: string) {
		this._boundary = value;
	}

	/**
	 * Setter amenity
	 * @param {string} value
	 */
	public set amenity(value: string) {
		this._amenity = value;
	}

	/**
	 * Setter aeroway
	 * @param {string} value
	 */
	public set aeroway(value: string) {
		this._aeroway = value;
	}

	/**
	 * Setter club
	 * @param {string} value
	 */
	public set club(value: string) {
		this._club = value;
	}

	/**
	 * Setter craft
	 * @param {string} value
	 */
	public set craft(value: string) {
		this._craft = value;
	}

	/**
	 * Setter leisure
	 * @param {string} value
	 */
	public set leisure(value: string) {
		this._leisure = value;
	}

	/**
	 * Setter office
	 * @param {string} value
	 */
	public set office(value: string) {
		this._office = value;
	}

	/**
	 * Setter mountain_pass
	 * @param {string} value
	 */
	public set mountain_pass(value: string) {
		this._mountain_pass = value;
	}

	/**
	 * Setter shop
	 * @param {string} value
	 */
	public set shop(value: string) {
		this._shop = value;
	}

	/**
	 * Setter tourism
	 * @param {string} value
	 */
	public set tourism(value: string) {
		this._tourism = value;
	}

	/**
	 * Setter bridge
	 * @param {string} value
	 */
	public set bridge(value: string) {
		this._bridge = value;
	}

	/**
	 * Setter tunnel
	 * @param {string} value
	 */
	public set tunnel(value: string) {
		this._tunnel = value;
	}

	/**
	 * Setter waterway
	 * @param {string} value
	 */
	public set waterway(value: string) {
		this._waterway = value;
	}
}
