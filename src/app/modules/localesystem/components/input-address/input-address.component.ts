import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BehaviourObserverModel,
	MagicValidatorUtil,
	OptionListModel,
	WaitElementsUtility,
} from '@ddc/kit';
import {
	BaseAddressComponent,
	EsriGeoService,
	GeoUtility,
	OpenstreetAddressModel,
	OpenstreetmapService,
} from '@ddc/rest';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { InputTextComponent } from '../../../../shared/form/input-text/input-text.component';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { TypologicalModel } from '../../../api/cakeutils-be/models/typological.model';
import { EnumDBLike } from '../../../api/cakeutils/enums/db-like.enum';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { RequestConditionInterface } from '../../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestPaginatorInterface } from '../../../api/cakeutils/interfaces/request-paginator.interface';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { EnumAddressType } from '../../enums/address-type.enum';
import { AddressModel } from '../../models/address.model';
import { CityModel } from '../../models/city.model';
import { NationModel } from '../../models/nation.model';
import { AddressService } from '../../services/address.service';
import { CityService } from '../../services/city.service';
import { NationService } from '../../services/nation.service';
import { AddressUtility } from '../../utility/address.utility';

@Component({
	selector: 'ddc-init-input-address',
	templateUrl: './input-address.component.html',
	styleUrls: ['./input-address.component.scss'],
})
export class InputAddressComponent
	extends BaseAddressComponent
	implements OnInit, OnDestroy, AfterViewInit
{
	@Input() cssClass: any;
	@Input() cssStyle: any;
	@Input() isoForCommunity: string[];
	@Input() flgAutocomplete: boolean;
	@Input() flgSearch: boolean;
	// TP ADDRESS
	@ViewChild('tpaddressComponent', { static: false }) tpaddressComponent: InputSelectComponent;
	@Input() fieldTpaddress: string;
	@Input() tpaddress: EnumAddressType;
	@Input() tpaddresses: EnumAddressType[];
	@Input() tpaddressFlag: boolean;
	@Input() tpaddressReadonly: boolean;
	@Output() tpaddressEmitter: EventEmitter<any> = new EventEmitter<any>();
	optionsTpaddress: OptionListModel[];
	subTpaddress: Subscription;
	subFieldTpaddress: Subscription;
	subInitTpAddress: Subscription;
	// OPENSTREET
	subOpenstreetSelect: Subscription;
	// FIELDS
	@Input() validationsAddress: any;
	@Input() required: boolean;
	tpAddressFormField: FormFieldModel;
	nationFormField: FormFieldModel;
	regionFormField: FormFieldModel;
	provinceFormField: FormFieldModel;
	communityFormField: FormFieldModel;
	cityFormField: FormFieldModel;
	streetFormField: FormFieldModel;
	numFormField: FormFieldModel;
	zipFormField: FormFieldModel;
	geo1FormField: FormFieldModel;
	geo2FormField: FormFieldModel;
	autocompleteFormField: FormFieldModel;
	searchFormField: FormFieldModel;
	// BLUR
	subBlur: Subscription;
	@ViewChild('streetComponent', { static: false }) streetComponent: InputTextComponent;
	@ViewChild('numComponent', { static: false }) numComponent: InputTextComponent;
	lastStreet: string = '';
	lastNum: string = '';
	// MAP
	@Input() flgMap: boolean;
	subMap: Subscription;
	mapGeo1: number;
	mapGeo2: number;
	mapAddressText: string;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private addressService: AddressService,
		private nationService: NationService,
		private cityService: CityService,
		private openstreetmap: OpenstreetmapService,
		private esriService: EsriGeoService,
	) {
		super(applicationLogger);
		this.optionsTpaddress = [];
	}

	// OVERRIDE
	ngOnInit() {
		this.manageGeoLocation();
		this.manageFields();
		this.manageTpAddress();
		super.ngOnInit();
	}

	ngAfterViewInit() {
		this.manageBlur();
		super.ngAfterViewInit();
	}

	ngOnDestroy() {
		if (this.subTpaddress) {
			this.subTpaddress.unsubscribe();
		}
		if (this.subFieldTpaddress) {
			this.subFieldTpaddress.unsubscribe();
		}
		if (this.subInitTpAddress) {
			this.subInitTpAddress.unsubscribe();
		}
		if (this.subOpenstreetSelect) {
			this.subOpenstreetSelect.unsubscribe();
		}
		if (this.subBlur) {
			this.subBlur.unsubscribe();
		}
		if (this.subMap) {
			this.subBlur.unsubscribe();
		}

		super.ngOnDestroy();
	}

	// TP ADDRESS
	manageTpAddress() {
		if (this.tpaddressFlag) {
			const filters: DbFilterInterface[] =
				this.tpaddresses && this.tpaddresses.length
					? [ApiFast.queryField('id', this.tpaddresses)]
					: undefined;

			const paginator = ApiFast.paginatorList(filters, [{ key: 'title', value: 'asc' }], undefined);

			this.subTpaddress = this.addressService.tpaddress(paginator).subscribe((list) => {
				list.forEach((el) => {
					this.optionsTpaddress.push(new OptionListModel(el.id, el.title, el));
				});
			});
			this.subFieldTpaddress = this.form
				.get(this.fieldTpaddress)
				.valueChanges.pipe(distinctUntilChanged())
				.subscribe((tpaddress) => {
					this.tpaddressEmitter.emit(tpaddress);
				});

			if (this.tpaddress) {
				this.form.get(this.fieldTpaddress).setValue(this.tpaddress.toString());
			}
			if (this.tpaddressReadonly) {
				this.form.get(this.fieldTpaddress).disable();
			}
		}
	}

	manageBlur() {
		const $obs1 = WaitElementsUtility.waitWhileViewChildIsReady(this, 'streetComponent').pipe(
			tap((res) => {
				document.getElementById(this.streetComponent.id).addEventListener('blur', (e) => {
					const streetVal = e.target['value'];
					if (streetVal !== this.lastStreet) {
						this.lastStreet = streetVal;
						this.fnChangeStreetInfo(this.hasStreet);
					}
				});
			}),
		);
		const $obs2 = WaitElementsUtility.waitWhileViewChildIsReady(this, 'numComponent').pipe(
			tap((res) => {
				document.getElementById(this.numComponent.id).addEventListener('blur', (e) => {
					const numVal = e.target['value'];
					if (numVal !== this.lastNum) {
						this.lastNum = numVal;
						this.fnChangeStreetInfo(this.hasStreet);
					}
				});
			}),
		);
		this.subBlur = combineLatest([$obs1, $obs2]).subscribe();
	}

	// SPECIFIC MANAGEMENT
	isCommunity(): boolean {
		const nationSelected = this.getNationSelected();
		if (
			nationSelected &&
			nationSelected.cod_iso3166 &&
			this.isoForCommunity &&
			this.isoForCommunity.length &&
			this.isoForCommunity.includes(nationSelected.cod_iso3166)
		) {
			return true;
		}
		return false;
	}

	setForm() {
		this.fieldNation = 'nation';
		this.fieldRegion = 'region';
		this.fieldProvince = 'province';
		this.fieldCommunity = 'community';
		this.fieldCity = 'city';
		this.fieldStreet = 'street';
		this.fieldNum = 'num';
		this.fieldZip = 'zip';
		this.fieldLatitude = 'geo1';
		this.fieldLongitude = 'geo2';
		if (this.required) {
			this.form = this.fb.group({
				tpaddress: new MagicValidatorUtil((this.validationsAddress.tpaddress = []), undefined)
					.required()
					.build(),
				nation: new MagicValidatorUtil((this.validationsAddress[this.fieldNation] = []), undefined)
					.required()
					.build(),
				region: new MagicValidatorUtil((this.validationsAddress[this.fieldRegion] = []), undefined)
					.required()
					.build(),
				province: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldProvince] = []),
					undefined,
				)
					.required()
					.build(),
				community: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldCommunity] = []),
					undefined,
				).build(),
				city: new MagicValidatorUtil((this.validationsAddress[this.fieldCity] = []), undefined)
					.required()
					.build(),
				street: new MagicValidatorUtil((this.validationsAddress[this.fieldStreet] = []), undefined)
					.required()
					.build(),
				num: new MagicValidatorUtil((this.validationsAddress[this.fieldNum] = []), undefined)
					.required()
					.build(),
				zip: new MagicValidatorUtil((this.validationsAddress[this.fieldZip] = []), undefined)
					.required()
					.build(),
				geo1: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldLatitude] = []),
					undefined,
				).build(),
				geo2: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldLongitude] = []),
					undefined,
				).build(),
				autocomplete: new MagicValidatorUtil(
					(this.validationsAddress.autocomplete = []),
					undefined,
				).build(),
				search: new MagicValidatorUtil((this.validationsAddress.search = []), undefined).build(),
			});
		} else {
			this.form = this.fb.group({
				tpaddress: new MagicValidatorUtil(
					(this.validationsAddress.tpaddress = []),
					undefined,
				).build(),
				nation: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldNation] = []),
					undefined,
				).build(),
				region: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldRegion] = []),
					undefined,
				).build(),
				province: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldProvince] = []),
					undefined,
				).build(),
				community: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldCommunity] = []),
					undefined,
				).build(),
				city: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldCity] = []),
					undefined,
				).build(),
				street: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldStreet] = []),
					undefined,
				).build(),
				num: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldNum] = []),
					undefined,
				).build(),
				zip: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldZip] = []),
					undefined,
				).build(),
				geo1: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldLatitude] = []),
					undefined,
				).build(),
				geo2: new MagicValidatorUtil(
					(this.validationsAddress[this.fieldLongitude] = []),
					undefined,
				).build(),
				autocomplete: new MagicValidatorUtil(
					(this.validationsAddress.autocomplete = []),
					undefined,
				).build(),
				search: new MagicValidatorUtil((this.validationsAddress.search = []), undefined).build(),
			});
		}
	}
	manageFields() {
		if (!this.validationsAddress) {
			this.validationsAddress = {};
		}
		if (!this.form) {
			this.setForm();
		} else {
			this.form.addControl(
				'tpaddress',
				this.required
					? new MagicValidatorUtil((this.validationsAddress.tpaddress = []), undefined)
							.required()
							.buildControl()
					: new MagicValidatorUtil(
							(this.validationsAddress.tpaddress = []),
							undefined,
					  ).buildControl(),
			);
			this.form.addControl(
				'autocomplete',
				new MagicValidatorUtil(
					(this.validationsAddress.autocomplete = []),
					undefined,
				).buildControl(),
			);
			this.form.addControl(
				'search',
				new MagicValidatorUtil((this.validationsAddress.search = []), undefined).buildControl(),
			);
		}

		this.tpAddressFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('tpaddress') as FormControl,
			'APP.LABEL.ADDRESS.TYPE',
		)
			.validation(this.validationsAddress.tpaddress)
			.onInit();

		this.nationFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldNation) as FormControl,
			'APP.LABEL.ADDRESS.NATION',
		)
			.validation(this.validationsAddress[this.fieldNation])
			.onInit();
		this.regionFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldRegion) as FormControl,
			'APP.LABEL.ADDRESS.REGION',
		)
			.validation(this.validationsAddress[this.fieldRegion])
			.onInit();
		this.provinceFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldProvince) as FormControl,
			'APP.LABEL.ADDRESS.PROVINCE',
		)
			.validation(this.validationsAddress[this.fieldProvince])
			.onInit();
		this.communityFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldCommunity) as FormControl,
			'APP.LABEL.ADDRESS.COMMUNITY',
		)
			.validation(this.validationsAddress[this.fieldCommunity])
			.onInit();
		this.cityFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldCity) as FormControl,
			'APP.LABEL.ADDRESS.CITY',
		)
			.validation(this.validationsAddress[this.fieldCity])
			.onInit();
		this.zipFormField = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get(this.fieldZip) as FormControl,
			'APP.LABEL.ADDRESS.ZIP',
		)
			.validation(this.validationsAddress[this.fieldZip])
			.onInit();
		this.streetFormField = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get(this.fieldStreet) as FormControl,
			'APP.LABEL.ADDRESS.STREET',
		)
			.validation(this.validationsAddress[this.fieldStreet])
			.onInit();
		this.numFormField = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get(this.fieldNum) as FormControl,
			'APP.LABEL.ADDRESS.NUM',
		)
			.validation(this.validationsAddress[this.fieldNum])
			.onInit();

		// altri
		this.autocompleteFormField = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form.get('autocomplete') as FormControl,
			'Input Autocomplete con emitters',
		)
			.validation([...this.validationsAddress.autocomplete])
			.onInit();
		this.searchFormField = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form.get('search') as FormControl,
			'Input Autocomplete con emitters',
		)
			.validation([...this.validationsAddress.search])
			.onInit();
	}

	// UTILITY
	getNationSelected(): NationModel {
		const index = this.nationOptions.findIndex((el) => el.key === this.nationSelected);
		if (index !== -1) {
			return this.nationOptions[index].payload;
		}
		return undefined;
	}
	getRegionSelected(): CityModel {
		const index = this.regionOptions.findIndex((el) => el.key === this.regionSelected);
		if (index !== -1) {
			return this.regionOptions[index].payload;
		}
		return undefined;
	}
	getProvinceSelected(): CityModel {
		const index = this.provinceOptions.findIndex((el) => el.key === this.provinceSelected);
		if (index !== -1) {
			return this.provinceOptions[index].payload;
		}
		return undefined;
	}
	getCommunitySelected(): CityModel {
		const index = this.communityOptions.findIndex((el) => el.key === this.communitySelected);
		if (index !== -1) {
			return this.communityOptions[index].payload;
		}
		return undefined;
	}
	getCitySelected(): CityModel {
		const index = this.cityOptions.findIndex((el) => el.key === this.citySelected);
		if (index !== -1) {
			return this.cityOptions[index].payload;
		}
		return undefined;
	}

	// NATIONS
	fnNations(): Observable<NationModel[]> {
		const paginator: RequestPaginatorInterface = {
			filters: [],
			orders: [
				{ key: 'priority', value: 'desc' },
				// { key: 'continent = "EU"', value: 'desc' },
				{ key: 'name', value: 'asc' },
			],
			paginate: undefined,
		};
		const conditions: RequestConditionInterface = {
			belongs: undefined,
			virtualfields: undefined,
			flags: ['avoidContent'],
		};
		return this.nationService
			.paginate(paginator, conditions, { storage: { flgEval: true, name: 'ADDRESS_NATIONS' } })
			.pipe(map((paginatorModel) => (paginatorModel ? paginatorModel.list : [])));
	}
	behaviourNations(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: NationModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeNationToOptionList(nation: NationModel): OptionListModel {
		return new OptionListModel(nation.id, nation.name, nation);
	}

	// REGIONS
	fnRegions(): Observable<CityModel[]> {
		return this.cityService.regions(this.nationSelected);
	}
	behaviourRegions(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: CityModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeRegionToOptionList(city: CityModel): OptionListModel {
		return new OptionListModel(city.regioncode, city.region);
	}

	// PROVINCES
	fnProvinces(): Observable<CityModel[]> {
		return this.cityService.provinces(this.nationSelected, this.regionSelected);
	}
	behaviourProvinces(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: CityModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeProvinceToOptionList(city: CityModel): OptionListModel {
		return new OptionListModel(city.provincecode, city.province, city);
	}

	// COMMUNITIES
	fnCommunities(): Observable<CityModel[]> {
		if (this.isCommunity()) {
			return this.cityService.communities(
				this.nationSelected,
				this.regionSelected,
				this.provinceSelected,
			);
		} else {
			return of([]);
		}
	}
	behaviourCommunities(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: CityModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeCommunityToOptionList(city: CityModel): OptionListModel {
		return new OptionListModel(city.communitycode, city.community, city);
	}

	// CITIES
	fnCities(): Observable<CityModel[]> {
		const filters: any[] = [
			ApiFast.queryField('nation', this.nationSelected),
			ApiFast.queryField('regioncode', this.regionSelected),
			ApiFast.queryField('provincecode', this.provinceSelected),
		];
		const paginator: RequestPaginatorInterface = {
			filters: filters,
			orders: [{ key: 'place', value: 'asc' }],
			paginate: undefined,
		};
		return this.cityService
			.paginate(paginator)
			.pipe(map((paginatorModel) => (paginatorModel ? paginatorModel.list : [])));
	}
	behaviourCities(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: CityModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeCityToOptionList(city: CityModel): OptionListModel {
		return new OptionListModel(
			city.id,
			city.place + (city.postalcode ? ' [' + city.postalcode + ']' : ''),
			city,
		);
	}
	fnChangeCity(citySelectedId: number) {
		if (this.fieldStreet && this.address && this.address.street) {
			this.form.get(this.fieldStreet).setValue(this.address.street);
		}
		if (this.fieldNum && this.address && this.address.number) {
			this.form.get(this.fieldNum).setValue(this.address.number);
		}
		const citySelected = this.getCitySelected();
		if (citySelected) {
			this.form.get(this.fieldZip).setValue(citySelected.postalcode);
			if (this.fieldLatitude) {
				this.form.get(this.fieldLatitude).setValue(citySelected.geo1);
			}
			if (this.fieldLongitude) {
				this.form.get(this.fieldLongitude).setValue(citySelected.geo2);
			}
		}
	}
	resetCity() {
		if (!this.address || !this.address.zip) {
			this.form.get(this.fieldZip).setValue(undefined);
		}
		if (this.fieldLatitude && (!this.address || !this.address.geo1)) {
			this.form.get(this.fieldLatitude).setValue(undefined);
		}
		if (this.fieldLongitude && (!this.address || !this.address.geo2)) {
			this.form.get(this.fieldLongitude).setValue(undefined);
		}
	}

	// DECODE ADDRESS
	getAddressValueForNation(address: AddressModel) {
		return address.nation && address.nation.id ? address.nation.id : undefined;
	}
	getAddressValueForRegion(address: AddressModel) {
		return address.city && address.city.regioncode ? address.city.regioncode : undefined;
	}
	getAddressValueForProvince(address: AddressModel) {
		return address.city && address.city.provincecode ? address.city.provincecode : undefined;
	}
	getAddressValueForCommunity(address: AddressModel) {
		return address.city && address.city.communitycode ? address.city.communitycode : undefined;
	}
	getAddressValueForCity(address: AddressModel) {
		return address.city && address.city.id ? address.city.id : undefined;
	}
	getAddressValueForZip(address: AddressModel) {
		return address.zip
			? address.zip
			: address.city && address.city.postalcode
			? address.city.postalcode
			: undefined;
	}
	getAddressValueForStreet(address: AddressModel) {
		return address.street ? address.street : undefined;
	}
	getAddressValueForNum(address: AddressModel) {
		return address.number ? address.number : undefined;
	}
	getAddressValueForLatitude(address: AddressModel) {
		return address.geo1 ? address.geo1 : undefined;
	}
	getAddressValueForLongitude(address: AddressModel) {
		return address.geo2 ? address.geo2 : undefined;
	}

	// AUTOCOMPLETE
	fnSearchAutocomplete(term: string): Observable<OptionListModel[]> {
		const filters: any[] = [
			{
				type: 0,
				value: term,
				between: [],
				children: [],
				key: 'filter_search__',
				like: EnumDBLike.LR,
			},
		];
		const paginator: RequestPaginatorInterface = {
			filters: filters,
			orders: [{ key: 'place', value: 'asc' }],
			paginate: { limit: 5, page: 1 },
		};
		const conditions: RequestConditionInterface = {
			belongs: undefined,
			virtualfields: ['filter_search'],
			flags: undefined,
		};
		return this.cityService
			.paginate(paginator, conditions, undefined, { toMessage: { skipError: true } })
			.pipe(
				map((paginatorModel) => {
					const results: OptionListModel[] = [];
					if (paginatorModel && paginatorModel.list) {
						for (const city of paginatorModel.list) {
							results.push(
								new OptionListModel(
									city.id,
									city.place + ' (' + city.provincecode + ') ' + city.postalcode,
									city,
								),
							);
						}
					}
					return results;
				}),
			);
	}
	fnClickByAutocomplete(item: OptionListModel) {
		const city: CityModel = item.payload;
		const address: AddressModel = new AddressModel();
		address.nation = city.nation;
		address.zip = city.postalcode;
		address.place = city.place;
		address.province = city.province;
		address.region = city.region;
		address.city = city;
		address.geo1 = city.geo1;
		address.geo2 = city.geo2;
		this.address = address;
	}
	decodeNationByClickedAutocomplete(item: OptionListModel): string {
		return item && item.payload && item.payload.nation ? item.payload.nation.id : undefined;
	}

	mouseOutAutocomplete(item: OptionListModel) {}
	mouseOverAutocomplete(item: OptionListModel) {}

	// MANAGE MODEL
	fillAddress(address: AddressModel) {
		if (address) {
			if (this.fieldNation) {
				this.form.get(this.fieldNation).setValue(address.nation ? address.nation.id : undefined);
			}
			if (this.fieldStreet) {
				this.form.get(this.fieldStreet).setValue(address.street);
			}
			if (this.fieldNum) {
				this.form.get(this.fieldNum).setValue(address.number);
			}
			if (this.fieldZip) {
				this.form.get(this.fieldZip).setValue(address.zip);
			}
			if (this.fieldLatitude) {
				this.form.get(this.fieldLatitude).setValue(address.geo1);
			}
			if (this.fieldLongitude) {
				this.form.get(this.fieldLongitude).setValue(address.geo2);
			}
		}
	}

	exportAddress(form?: FormGroup): AddressModel {
		if (!form) {
			form = this.form;
		}
		const addressModel: AddressModel = new AddressModel();
		addressModel.id = this.address ? this.address.id : undefined;
		addressModel.street = this.fieldStreet ? form.get(this.fieldStreet).value : undefined;
		addressModel.number = this.fieldNum ? form.get(this.fieldNum).value : undefined;
		addressModel.zip = form.get(this.fieldZip).value;
		addressModel.nation = this.getNationSelected();
		const regionModel: CityModel = this.getRegionSelected();
		addressModel.region = regionModel ? regionModel.region : undefined;
		const provinceModel: CityModel = this.getProvinceSelected();
		addressModel.province = provinceModel ? provinceModel.province : undefined;
		addressModel.city = this.getCitySelected();
		addressModel.place = addressModel.city ? addressModel.city.place : undefined;
		addressModel.tpaddress = new TypologicalModel();
		addressModel.tpaddress.id = this.fieldTpaddress
			? form.get(this.fieldTpaddress).value
			: undefined;
		addressModel.geo1 = this.fieldLatitude ? form.get(this.fieldLatitude).value : undefined;
		addressModel.geo2 = this.fieldLongitude ? form.get(this.fieldLongitude).value : undefined;
		return addressModel;
	}

	// MANAGE MAP
	manageGeoLocation() {
		if (this.flgMap) {
			GeoUtility.getLocation(
				(position) => {
					this.mapGeo1 = position.coords.latitude;
					this.mapGeo2 = position.coords.longitude;
					this.mapAddressText = "<strong>I'm here</strong>";
				},
				() => {
					console.error('Geolocation is not supported by this browser.');
				},
			);
		}
	}
	fnChangeStreetInfo(hasStreet: boolean) {
		if (hasStreet) {
			const term = this.buildTerm();
			this.subMap = this.esriService
				.searchEsriLocationUnique(term)
				.pipe(
					map((el) => {
						if (el) {
							this.mapGeo1 = el.feature.geometry.y;
							this.mapGeo2 = el.feature.geometry.x;
							const address = this.exportAddress(this.form);
							this.mapAddressText = address.html_address;
						}
					}),
				)
				.subscribe();
		}
	}

	private buildTerm(): string {
		let term: string = '';
		if (this.form) {
			if (this.form.get(this.fieldStreet) && this.form.get(this.fieldStreet).value) {
				term += this.form.get(this.fieldStreet).value + ',';
			}
			if (this.form.get(this.fieldNum) && this.form.get(this.fieldNum).value) {
				term += this.form.get(this.fieldNum).value + ',';
			}
			const citySelected = this.getCitySelected();
			if (citySelected) {
				if (citySelected.place) {
					term += ',' + citySelected.place;
				}
				if (citySelected.province) {
					term += ',' + citySelected.province;
				}
				if (citySelected.region) {
					term += ',' + citySelected.region;
				}
			}
		}
		return term;
	}

	// OTHERS
	addressByOpenstreet(location: { lat; lon; display_name }) {
		let addressModel: AddressModel;
		let cityModel: CityModel;
		this.subOpenstreetSelect = this.openstreetmap
			.reverseOpenstreetLocationUnique(location.lat, location.lon)
			.pipe(
				switchMap((res) => {
					const address: OpenstreetAddressModel = res.address;
					addressModel = AddressUtility.convertOpenstreetMapAddress(address);
					let $obs: Observable<OptionListModel[]>;
					if (address.buildPlace) {
						let term: string = address.postcode ? address.postcode : '';
						if (address.buildPlace) {
							term += ' ' + address.buildPlace;
						}
						$obs = term ? this.fnSearchAutocomplete(term) : of(undefined);
					} else {
						$obs = of(undefined);
					}
					return $obs.pipe(
						map((opt) => {
							if (opt && opt.length) {
								cityModel = opt[0].payload;
								addressModel.city = cityModel;
								if (addressModel.nation && cityModel.nation) {
									addressModel.nation.id = cityModel.nation.id;
								}
								if (!addressModel.region) {
									addressModel.region = cityModel.region;
								}
								if (!addressModel.province) {
									addressModel.province = cityModel.province;
								}
								if (!addressModel.zip) {
									addressModel.zip = cityModel.postalcode;
								}
								if (!addressModel.geo1) {
									addressModel.geo1 = cityModel.geo1;
								}
								if (!addressModel.geo2) {
									addressModel.geo2 = cityModel.geo2;
								}
							}
							return addressModel;
						}),
					);
				}),
			)
			.subscribe((addr) => {
				this.address = addr;
			});
	}

	// COMMONS
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'InputAddressComponent';
	}
}
