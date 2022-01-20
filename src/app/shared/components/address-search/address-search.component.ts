import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
	BaseComponent,
	ApplicationLoggerService,
	OptionListModel,
	StringTranslate,
} from '@ddc/kit';
import {
	OpenstreetmapService,
	OpenstreetLocationModel,
	EsriGeoService,
	RequestUtility,
} from '@ddc/rest';
import { Subscription } from 'rxjs';
import { FormFieldModel } from '../../models/form/form-field.model';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
	selector: 'ddc-init-address-search',
	templateUrl: './address-search.component.html',
	styleUrls: ['./address-search.component.scss'],
})
export class AddressSearchComponent extends BaseComponent {
	@Input() limit: number = 5;
	@Input() debounce: number = 1000;
	@Input() extratags: boolean = true;
	@Input() field: FormFieldModel;
	@Input() textNotFound: string | StringTranslate;
	@Input() inputClass: any;
	@Input() inputStyle: any;
	@Input() infoClass: any;
	@Input() infoStyle: any;
	@Input() flgEsri: boolean;
	// more
	@Input() flgMore: boolean;
	@Output() addressEmit: EventEmitter<OpenstreetLocationModel> = new EventEmitter<
		OpenstreetLocationModel
	>();
	@Output() overEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando si passa con il mouse sopra l'item (emette l'item)
	@Output() outEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando il mouse lascia un item (emette l'item)
	results: OptionListModel[];
	excludeids: string[];
	showNoResults: boolean;
	// sub
	subResult: Subscription;
	subInputChange: Subscription;
	// flags
	loadingResults: boolean;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private openstreetService: OpenstreetmapService,
		private esriService: EsriGeoService,
	) {
		super(applicationLogger);
		this.results = [];
		this.excludeids = [];
		this.textNotFound = 'MESSAGE.NO_RECORDS';
		this.flgEsri = true;
	}

	ngOnInitForChildren() {
		if (this.flgEsri) {
			this.flgMore = false;
		}
		this.subInputChange = this.field.formControl.valueChanges
			.pipe(distinctUntilChanged())
			.subscribe((val) => {
				if (!val) {
					this.results.length = 0;
					this.showNoResults = false;
				}
			});
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subResult) {
			this.subResult.unsubscribe();
		}
		if (this.subInputChange) {
			this.subInputChange.unsubscribe();
		}
	}
	getClassName(): string {
		return 'AddressSearchComponent';
	}

	fnSearch() {
		const term: string = this.field.formControl.value;
		this.results.length = 0;

		const $obsOpenstreet = this.openstreetService
			.searchOpenstreetLocationList(term, this.limit, undefined, this.extratags)
			.pipe(
				map((res) => {
					if (!res || !res.length) {
						this.showNoResults = true;
					} else {
						this.showNoResults = false;
						res.forEach((el) => {
							this.results.push(new OptionListModel(el.place_id, el.display_name, el));
							this.excludeids.push('' + el.place_id);
						});
					}
					return true;
				}),
			);

		const $obsEsri = this.esriService.searchEsriLocation(term).pipe(
			map((res) => {
				if (!res || !res.length) {
					this.showNoResults = true;
				} else {
					this.showNoResults = false;
					res.forEach((el) => {
						const payload = {
							lat: el.feature.geometry.y,
							lon: el.feature.geometry.x,
							display_name: el.name,
						};
						this.results.push(new OptionListModel(el.name, el.name, payload));
					});
				}
				return true;
			}),
		);

		this.loadingResults = true;
		this.subResult = RequestUtility.debounceAsyncByValue(
			term,
			this.debounce,
			this.flgEsri ? $obsEsri : $obsOpenstreet,
		).subscribe(
			(res) => {
				this.loadingResults = false;
			},
			(err) => {
				this.loadingResults = false;
			},
		);
	}

	more() {
		const term: string = this.field.formControl.value;
		const $obs = this.openstreetService.searchOpenstreetLocationList(
			term,
			this.limit,
			this.excludeids,
			this.extratags,
		);

		this.loadingResults = true;
		this.subResult = RequestUtility.debounceAsyncByValue(term, this.debounce, $obs).subscribe(
			(res) => {
				res.forEach((el) => {
					this.results.push(new OptionListModel(el.place_id, el.display_name, el));
					this.excludeids.push('' + el.place_id);
				});
				if (this.results && this.results.length) {
					this.showNoResults = true;
				} else {
					this.showNoResults = false;
				}
				this.loadingResults = false;
			},
			(err) => {
				this.loadingResults = false;
			},
		);
	}

	fnSelect(item: OptionListModel) {
		this.addressEmit.emit(item.payload);
	}
	onOverItem(item: OptionListModel) {
		this.overEmit.emit(item);
	}
	onOutItem(item: OptionListModel) {
		this.outEmit.emit(item);
	}
}
