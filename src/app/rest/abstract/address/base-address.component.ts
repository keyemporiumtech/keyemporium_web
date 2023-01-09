import {
	BaseComponent,
	ApplicationLoggerService,
	OptionListModel,
	BehaviourObserverModel,
	StringTranslate,
	WaitElementsUtility,
} from '@ddc/kit';
import {
	Input,
	Output,
	EventEmitter,
	OnInit,
	OnDestroy,
	AfterViewInit,
	Directive,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { GeoRefInterface } from '../../geo/interfaces/geo-ref.interface';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseAddressComponent
	extends BaseComponent
	implements OnInit, OnDestroy, AfterViewInit
{
	@Input() form: FormGroup;
	@Input() labelTitle: string | StringTranslate;
	@Input() fieldNation: string;
	@Input() fieldRegion: string;
	@Input() fieldProvince: string;
	@Input() fieldCommunity: string;
	@Input() fieldCity: string;
	@Input() fieldStreet: string;
	@Input() fieldNum: string;
	@Input() fieldZip: string;
	@Input() fieldLatitude: string;
	@Input() fieldLongitude: string;
	@Input() readonly: boolean;
	// modello di indirizzo fornito in input
	_address: any;
	get address(): any {
		return this._address;
	}
	@Input('address')
	set address(address: any) {
		this._address = address;
		if (this.loaded) {
			this.fillAddress(address);
		}
	}
	// options
	nationOptions: OptionListModel[];
	regionOptions: OptionListModel[];
	provinceOptions: OptionListModel[];
	communityOptions: OptionListModel[];
	cityOptions: OptionListModel[];
	nationSelected: any;
	regionSelected: any;
	provinceSelected: any;
	communitySelected: any;
	citySelected: any;
	// emitters
	@Output() nationEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() regionEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() provinceEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() communityEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() cityEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() streetEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() numEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() zipEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() latitudeEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() longitudeEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() geoRefEmitter: EventEmitter<GeoRefInterface> = new EventEmitter<GeoRefInterface>();
	// subscriptions
	subNations: Subscription;
	subRegions: Subscription;
	subProvinces: Subscription;
	subCommunities: Subscription;
	subCities: Subscription;
	subFieldNation: Subscription;
	subFieldRegion: Subscription;
	subFieldProvince: Subscription;
	subFieldCommunity: Subscription;
	subFieldCity: Subscription;
	subFieldStreet: Subscription;
	subFieldNum: Subscription;
	subFieldZip: Subscription;
	subFieldGeo1: Subscription;
	subFieldGeo2: Subscription;
	// sub manage
	subManageNation: Subscription;
	subManageRegion: Subscription;
	subManageProvince: Subscription;
	subManageCommunity: Subscription;
	subManageCity: Subscription;
	// used
	hasGeo: boolean;
	hasStreet: boolean;
	listForAutocomplete: OptionListModel[];
	loaded: boolean;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.nationOptions = [];
		this.regionOptions = [];
		this.provinceOptions = [];
		this.communityOptions = [];
		this.cityOptions = [];
		this.listForAutocomplete = [];
	}

	ngOnInit() {
		if (this.readonly) {
			this.form.get(this.fieldNation).disable();
			if (this.fieldStreet) {
				this.form.get(this.fieldStreet).disable();
			}
			if (this.fieldNum) {
				this.form.get(this.fieldNum).disable();
			}
			this.form.get(this.fieldZip).disable();
		}
		this.form.get(this.fieldRegion).disable();
		this.form.get(this.fieldProvince).disable();
		this.form.get(this.fieldCommunity).disable();
		this.form.get(this.fieldCity).disable();
		this.subFieldNation = this.form
			.get(this.fieldNation)
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((nationSelected) => {
				if (this.loaded) {
					this.nationSelected = nationSelected;
					this.changeNation(nationSelected);
				}
				this.nationEmitter.emit(nationSelected);
			});
		this.subFieldRegion = this.form
			.get(this.fieldRegion)
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((regionSelected) => {
				if (this.loaded) {
					this.regionSelected = regionSelected;
					this.changeRegion(regionSelected);
				}
				this.regionEmitter.emit(regionSelected);
			});
		this.subFieldProvince = this.form
			.get(this.fieldProvince)
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((provinceSelected) => {
				if (this.loaded) {
					this.provinceSelected = provinceSelected;
					this.changeProvince(provinceSelected);
				}
				this.provinceEmitter.emit(provinceSelected);
			});
		this.subFieldCommunity = this.form
			.get(this.fieldCommunity)
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((communitySelected) => {
				if (this.loaded) {
					this.communitySelected = communitySelected;
					this.changeCommunity(communitySelected);
				}
				this.communityEmitter.emit(communitySelected);
			});
		this.subFieldCity = this.form
			.get(this.fieldCity)
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((citySelected) => {
				if (this.loaded) {
					this.citySelected = citySelected;
					this.changeCity(citySelected);
				}
				this.cityEmitter.emit(citySelected);
			});
		if (this.fieldStreet) {
			this.subFieldStreet = this.form
				.get(this.fieldStreet)
				.valueChanges.pipe(distinctUntilChanged())
				.subscribe((streetVal) => {
					if (this.loaded) {
						if (this.citySelected && streetVal) {
							this.hasStreet = true;
						} else {
							this.hasStreet = false;
						}
						// this.fnChangeStreetInfo(this.hasStreet);
					}
					this.streetEmitter.emit(streetVal);
				});
		}
		if (this.fieldNum) {
			this.subFieldNum = this.form
				.get(this.fieldNum)
				.valueChanges.pipe(distinctUntilChanged())
				.subscribe((numVal) => {
					if (this.loaded) {
						if (this.citySelected && this.form.get(this.fieldStreet).value) {
							this.hasStreet = true;
						} else {
							this.hasStreet = false;
						}
						// this.fnChangeStreetInfo(this.hasStreet);
					}
					this.numEmitter.emit(numVal);
				});
		}
		if (this.fieldLatitude) {
			this.subFieldGeo1 = this.form
				.get(this.fieldLatitude)
				.valueChanges.pipe(distinctUntilChanged())
				.subscribe((latitudeSelected) => {
					if (this.loaded) {
						if (latitudeSelected && this.form.get(this.fieldLongitude).value) {
							this.geoRefEmitter.emit({
								latitude: latitudeSelected,
								longitude: this.form.get(this.fieldLongitude).value,
							});
							this.hasGeo = true;
						} else {
							this.hasGeo = false;
						}
					}
					this.latitudeEmitter.emit(latitudeSelected);
				});
		}
		if (this.fieldLongitude) {
			this.subFieldGeo2 = this.form
				.get(this.fieldLongitude)
				.valueChanges.pipe(distinctUntilChanged())
				.subscribe((longitudeSelected) => {
					if (this.loaded) {
						if (longitudeSelected && this.form.get(this.fieldLatitude).value) {
							this.geoRefEmitter.emit({
								latitude: this.form.get(this.fieldLatitude).value,
								longitude: longitudeSelected,
							});
							this.hasGeo = true;
						} else {
							this.hasGeo = false;
						}
					}
					this.longitudeEmitter.emit(longitudeSelected);
				});
		}

		this.loadNations();

		super.ngOnInit();
	}

	ngAfterViewInit() {
		super.ngAfterViewInit();
	}

	ngOnDestroy() {
		if (this.subNations) {
			this.subNations.unsubscribe();
		}
		if (this.subRegions) {
			this.subRegions.unsubscribe();
		}
		if (this.subProvinces) {
			this.subProvinces.unsubscribe();
		}
		if (this.subCommunities) {
			this.subCommunities.unsubscribe();
		}
		if (this.subCities) {
			this.subCities.unsubscribe();
		}
		if (this.subFieldNation) {
			this.subFieldNation.unsubscribe();
		}
		if (this.subFieldRegion) {
			this.subFieldRegion.unsubscribe();
		}
		if (this.subFieldProvince) {
			this.subFieldProvince.unsubscribe();
		}
		if (this.subFieldCommunity) {
			this.subFieldCommunity.unsubscribe();
		}
		if (this.subFieldCity) {
			this.subFieldCity.unsubscribe();
		}
		if (this.subFieldStreet) {
			this.subFieldStreet.unsubscribe();
		}
		if (this.subFieldNum) {
			this.subFieldNum.unsubscribe();
		}
		if (this.subFieldZip) {
			this.subFieldZip.unsubscribe();
		}
		if (this.subFieldGeo1) {
			this.subFieldGeo1.unsubscribe();
		}
		if (this.subFieldGeo2) {
			this.subFieldGeo2.unsubscribe();
		}
		if (this.subManageNation) {
			this.subManageNation.unsubscribe();
		}
		if (this.subManageRegion) {
			this.subManageRegion.unsubscribe();
		}
		if (this.subManageProvince) {
			this.subManageProvince.unsubscribe();
		}
		if (this.subManageCommunity) {
			this.subManageCommunity.unsubscribe();
		}
		if (this.subManageCity) {
			this.subManageCity.unsubscribe();
		}
		super.ngOnDestroy();
	}

	// CHANGES
	changeNation(nationSelected: any) {
		if (nationSelected) {
			if (!this.readonly) {
				this.form.get(this.fieldRegion).enable();
			}
			this.loadRegions();
		} else {
			this.resetNation();
		}
	}

	resetNation() {
		this.nationSelected = undefined;
		this.regionSelected = undefined;
		this.provinceSelected = undefined;
		this.communitySelected = undefined;
		this.citySelected = undefined;
		this.form.get(this.fieldRegion).setValue(undefined);
		this.form.get(this.fieldProvince).setValue(undefined);
		this.form.get(this.fieldCommunity).setValue(undefined);
		this.form.get(this.fieldCity).setValue(undefined);
		this.form.get(this.fieldRegion).disable();
		this.form.get(this.fieldProvince).disable();
		this.form.get(this.fieldCommunity).disable();
		this.form.get(this.fieldCity).disable();
	}

	changeRegion(regionSelected: any) {
		if (regionSelected) {
			if (!this.readonly) {
				this.form.get(this.fieldProvince).enable();
			}
			this.loadProvinces();
		} else {
			this.resetRegion();
		}
	}

	resetRegion() {
		this.regionSelected = undefined;
		this.provinceSelected = undefined;
		this.communitySelected = undefined;
		this.citySelected = undefined;
		this.form.get(this.fieldProvince).setValue(undefined);
		this.form.get(this.fieldCommunity).setValue(undefined);
		this.form.get(this.fieldCity).setValue(undefined);
		this.form.get(this.fieldProvince).disable();
		this.form.get(this.fieldCommunity).disable();
		this.form.get(this.fieldCity).disable();
	}

	changeProvince(provinceSelected: any) {
		if (provinceSelected) {
			if (!this.readonly) {
				this.form.get(this.fieldCommunity).enable();
				this.form.get(this.fieldCity).enable();
			}
			this.loadCommunities();
			this.loadCities();
		} else {
			this.resetProvince();
		}
	}

	resetProvince() {
		this.provinceSelected = undefined;
		this.communitySelected = undefined;
		this.citySelected = undefined;
		this.form.get(this.fieldCommunity).setValue(undefined);
		this.form.get(this.fieldCity).setValue(undefined);
		this.form.get(this.fieldCommunity).disable();
		this.form.get(this.fieldCity).disable();
	}

	changeCommunity(communitySelected: any) {
		if (communitySelected) {
			if (!this.readonly) {
				this.form.get(this.fieldCity).enable();
			}
			this.loadCities();
		} else {
			this.resetCommunity();
		}
	}

	resetCommunity() {
		this.communitySelected = undefined;
		this.citySelected = undefined;
		this.form.get(this.fieldCity).setValue(undefined);
		this.form.get(this.fieldCity).disable();
	}

	changeCity(citySelected: any) {
		if (citySelected) {
			this.fnChangeCity(citySelected);
		} else {
			this.resetCity();
		}
	}

	// LOADS
	loadNations() {
		this.startLoading();
		this.behaviourNations().actionPre();
		this.nationOptions.length = 0;
		this.subNations = this.fnNations().subscribe(
			(nations) => {
				this.behaviourNations().actionResponse(nations);
				if (nations && nations.length) {
					for (const nation of nations) {
						this.nationOptions.push(this.decodeNationToOptionList(nation));
					}
					// edit or detail
					this.loaded = true;
					this.fillAddress(this.address);
					this.manageAddressNation(this.address);
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourNations().actionError(err);
				this.stopLoading();
			},
		);
	}

	loadRegions() {
		this.startLoading();
		this.behaviourRegions().actionPre();
		this.regionOptions.length = 0;
		this.subRegions = this.fnRegions().subscribe(
			(regions) => {
				this.behaviourRegions().actionResponse(regions);
				if (regions && regions.length) {
					for (const region of regions) {
						this.regionOptions.push(this.decodeRegionToOptionList(region));
					}
					// edit or detail
					this.manageAddressRegion(this.address);
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourRegions().actionError(err);
				this.stopLoading();
			},
		);
	}

	loadProvinces() {
		this.startLoading();
		this.behaviourProvinces().actionPre();
		this.provinceOptions.length = 0;
		this.subProvinces = this.fnProvinces().subscribe(
			(provinces) => {
				this.behaviourProvinces().actionResponse(provinces);
				if (provinces && provinces.length) {
					for (const province of provinces) {
						this.provinceOptions.push(this.decodeProvinceToOptionList(province));
					}
					// edit or detail
					this.manageAddressProvince(this.address);
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourProvinces().actionError(err);
				this.stopLoading();
			},
		);
	}

	loadCommunities() {
		this.startLoading();
		this.behaviourCommunities().actionPre();
		this.communityOptions.length = 0;
		this.subCommunities = this.fnCommunities().subscribe(
			(communities) => {
				this.behaviourCommunities().actionResponse(communities);
				if (communities && communities.length) {
					for (const community of communities) {
						this.communityOptions.push(this.decodeCommunityToOptionList(community));
					}
					// edit or detail
					this.manageAddressCommunity(this.address);
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourCommunities().actionError(err);
				this.stopLoading();
			},
		);
	}

	loadCities() {
		this.startLoading();
		this.behaviourCities().actionPre();
		this.cityOptions.length = 0;
		this.subCities = this.fnCities().subscribe(
			(cities) => {
				this.behaviourCities().actionResponse(cities);
				if (cities && cities.length) {
					for (const city of cities) {
						this.cityOptions.push(this.decodeCityToOptionList(city));
					}
					// edit or detail
					this.manageAddressCity(this.address);
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourCities().actionError(err);
				this.stopLoading();
			},
		);
	}

	searchAutocomplete(term: string) {
		this.fnSearchAutocomplete(term).subscribe((results) => {
			this.listForAutocomplete = results;
		});
	}
	/**
	 * Funzione associata all'evento <b>selectEmit</b>
	 * di un componente di [Autocomplete]{@link BaseAutocompleteComponent#selectEmit}
	 * @param item
	 */
	clickAutocomplete(item: any) {
		this.fnClickByAutocomplete(item);
		this.form.get(this.fieldNation).setValue(this.decodeNationByClickedAutocomplete(item));
	}

	abstract mouseOutAutocomplete(item: OptionListModel);
	abstract mouseOverAutocomplete(item: OptionListModel);

	// manage edit of address
	private manageAddressNation(address: any) {
		if (address) {
			const valueForNation = this.getAddressValueForNation(address);
			this.subManageNation = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.form.get(this.fieldNation).setValue(valueForNation);
			}).subscribe();
		}
	}
	private manageAddressRegion(address: any) {
		const prevNation = this.form.get(this.fieldNation).value;
		if (address && this.getAddressValueForNation(address) === prevNation) {
			const valueForRegion = this.getAddressValueForRegion(address);
			this.subManageRegion = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.form.get(this.fieldRegion).setValue(valueForRegion);
			}).subscribe();
		}
	}
	private manageAddressProvince(address: any) {
		const prevRegion = this.form.get(this.fieldRegion).value;
		if (address && this.getAddressValueForRegion(address) === prevRegion) {
			const valueForProvince = this.getAddressValueForProvince(address);
			this.subManageProvince = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.form.get(this.fieldProvince).setValue(valueForProvince);
			}).subscribe();
		}
	}
	private manageAddressCommunity(address: any) {
		const prevProvince = this.form.get(this.fieldProvince).value;
		if (address && this.getAddressValueForProvince(address) === prevProvince) {
			const valueForCommunity = this.getAddressValueForCommunity(address);
			this.subManageProvince = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.form.get(this.fieldCommunity).setValue(valueForCommunity);
			}).subscribe();
		}
	}
	private manageAddressCity(address: any) {
		const prevProvince = this.form.get(this.fieldProvince).value;
		if (address && this.getAddressValueForProvince(address) === prevProvince) {
			const valueForCity = this.getAddressValueForCity(address);
			this.subManageProvince = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.form.get(this.fieldCity).setValue(valueForCity);
			}).subscribe();
		}
	}

	// abstracts
	abstract fnNations(): Observable<any[]>;
	abstract behaviourNations(): BehaviourObserverModel;
	abstract decodeNationToOptionList(nation: any): OptionListModel;

	abstract fnRegions(): Observable<any[]>;
	abstract behaviourRegions(): BehaviourObserverModel;
	abstract decodeRegionToOptionList(region: any): OptionListModel;

	abstract fnProvinces(): Observable<any[]>;
	abstract behaviourProvinces(): BehaviourObserverModel;
	abstract decodeProvinceToOptionList(province: any): OptionListModel;

	abstract fnCommunities(): Observable<any[]>;
	abstract behaviourCommunities(): BehaviourObserverModel;
	abstract decodeCommunityToOptionList(community: any): OptionListModel;

	abstract fnCities(): Observable<any[]>;
	abstract behaviourCities(): BehaviourObserverModel;
	abstract decodeCityToOptionList(city: any): OptionListModel;

	abstract fnChangeCity(citySelected: any);
	abstract resetCity();

	/**
	 * Comportamento da seguire quando viene settata una via o un numero della via.
	 *
	 * Da richiamare all'onblur dei campi [fieldStreet]{@link BaseAddressComponent#fieldStreet}
	 * e/o [fieldNum]{@link BaseAddressComponent#fieldNum}
	 * @param hasStreet indica se è stata selezionata una via dell'indirizzo.
	 * Usare this.hasStreet che viene settato al valueChange di street e num
	 */
	abstract fnChangeStreetInfo(hasStreet: boolean);

	// gestione address input

	abstract getAddressValueForNation(address: any): any;
	abstract getAddressValueForRegion(address: any): any;
	abstract getAddressValueForProvince(address: any): any;
	abstract getAddressValueForCommunity(address: any): any;
	abstract getAddressValueForCity(address: any): any;
	abstract getAddressValueForZip(address: any): any;
	abstract getAddressValueForStreet(address: any): any;
	abstract getAddressValueForNum(address: any): any;
	abstract getAddressValueForLatitude(address: any): any;
	abstract getAddressValueForLongitude(address: any): any;
	/**
	 * Funzione di ricerca associata all'evento <b>searchEmit</b>
	 * di un componente di [Autocomplete]{@link BaseAutocompleteComponent#onKeyUp}
	 * @param term termine di ricerca
	 */
	abstract fnSearchAutocomplete(term: string): Observable<OptionListModel[]>;
	/**
	 * Funzione da richiamare all'interno della funzione [clickAutocomplete]{@link BaseAddressComponent#clickAutocomplete}
	 * per arricchiri il comportamento al click di un item proveniente da un
	 * componente di autocomplete
	 * @param item item selezionato da un componente di autocomplete
	 */
	abstract fnClickByAutocomplete(item: OptionListModel);
	/**
	 * Funzione che dato un item selezionato da un componente di autocomplete
	 * ne ritorna il campo associato all'id della nazione
	 * @param item selezionato da un componente di autocomplete
	 */
	abstract decodeNationByClickedAutocomplete(item: OptionListModel): any;

	// gestione address
	abstract exportAddress(form: FormGroup): any;
	abstract fillAddress(address: any);
}
