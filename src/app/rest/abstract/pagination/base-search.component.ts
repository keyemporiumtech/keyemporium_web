import {
	BaseComponent,
	ApplicationLoggerService,
	BaseModel,
	BehaviourObserverModel,
	ObjectUtility,
} from '@ddc/kit';
import { Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { PaginatorModel } from '../../pagination/models/paginator.model';
/**
 * Classe da estendere per la definizione di un componente di ricerca
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseSearchComponent<M extends BaseModel>
	extends BaseComponent
	implements OnInit, OnDestroy
{
	@Input() searchOnLoad: boolean; // avvio della ricerca all'onLoad del componente
	@Input() formFilters: FormGroup; // filtri di ricerca iniziali
	@Input() initFilters: any[]; // filtri di ricerca iniziali
	@Input() initOrders: any[]; // ordinamenti iniziali
	@Input() initPaginate: any; // parametro di paginazione iniziale
	@Input() rowsForPage: number; // numero di righe per pagina
	// used
	list: M[];
	current: number; // pagina corrente
	pages: number; // numero di pagine massimo
	records: number; // numero totale di record presenti per i parametri di ricerca
	pagesNumbers: number[]; // array dei numeri di pagina per la visualizzazione
	filters: any[];
	orders: any[];
	paginate: any;
	// sub
	subSearch: Subscription;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.list = [];
		this.current = 0;
		this.pages = 0;
		this.records = 0;
		this.pagesNumbers = [];
		this.filters = [];
		this.orders = [];
		this.paginate = {};
	}

	ngOnInit() {
		this.formFilters = this.getFilterForm();
		if (this.searchOnLoad) {
			this.reset();
		}
		super.ngOnInit();
	}

	ngOnDestroy() {
		if (this.subSearch) {
			this.subSearch.unsubscribe();
		}
		super.ngOnDestroy();
	}

	search(filters?: any[]) {
		this.startLoading();
		this.searchBehaviour().actionPre();
		this.filters = filters && filters.length > 0 ? filters : this.evalFilters();
		this.orders = this.evalOrders();
		this.paginate = this.evalPaginate();

		this.subSearch = this.fnSearch(this.filters, this.orders, this.paginate).subscribe(
			(paginator) => {
				this.searchBehaviour().actionResponse(paginator);
				this.list = paginator && paginator.list ? paginator.list : [];
				this.current = this.getCurrentByPaginate(this.paginate);
				this.records = paginator && paginator.count ? paginator.count : 0;
				this.pages = paginator && paginator.pages ? paginator.pages : 0;
				this.buildPageNumbers(this.pages);
				this.afterSearch(paginator);
				this.stopLoading();
			},
			(err) => {
				this.searchBehaviour().actionError(err);
				this.stopLoading();
			},
		);
	}

	/**
	 * Da utilizzare al submit delle ricerche
	 */
	onSearch(filters?: any[]) {
		this.orders = undefined;
		this.paginate = undefined;
		this.search(filters);
	}

	private evalFilters(): any[] {
		const filtersForm = this.getFiltersByForm(this.formFilters);
		if (!filtersForm || filtersForm.length === 0) {
			return this.initFilters ? this.initFilters : this.getDefaultFilter();
		}
		return filtersForm;
	}
	private evalOrders(): any[] {
		if (!this.orders || this.orders.length === 0) {
			return this.initOrders ? this.initOrders : this.getDefaultOrder();
		}
		return this.orders;
	}
	private evalPaginate(): any {
		if (!this.paginate || ObjectUtility.isEmptyObject(this.paginate)) {
			return this.initPaginate ? this.initPaginate : this.getDefaultPaginate(this.rowsForPage);
		}
		return this.paginate;
	}
	reset() {
		if (this.formFilters) {
			this.formFilters.reset();
		} else {
			this.formFilters = this.getFilterForm();
		}
		this.initFilters = this.initFilters ? this.initFilters : this.getDefaultFilter();
		this.orders = this.initOrders ? this.initOrders : this.getDefaultOrder();
		this.paginate = this.initPaginate
			? this.initPaginate
			: this.getDefaultPaginate(this.rowsForPage);
		this.search(this.initFilters);
	}

	private buildPageNumbers(pages: number) {
		this.pagesNumbers = [];
		for (let i = 1; i <= pages; i++) {
			this.pagesNumbers.push(i);
		}
	}

	page(num: number) {
		this.paginate = this.getPaginate(this.rowsForPage, num);
		this.search();
	}

	order(order: any) {
		const index: number = this.fnIndexOrder(order);
		let orderChange;
		if (index !== -1) {
			orderChange = this.fnEvalOrderToPush(order, index);
		} else {
			orderChange = order;
		}
		this.orders.length = 0;
		this.orders.push(orderChange);
		this.search();
	}

	orderAdd(order: any) {
		const index: number = this.fnIndexOrder(order);
		let orderChange;
		if (index !== -1) {
			orderChange = this.fnEvalOrderToPush(order, index);
			this.fnOrderRemove(index);
		} else {
			orderChange = order;
		}
		this.orders.push(orderChange);
		this.search();
	}
	orderRemove(order: any) {
		const index: number = this.fnIndexOrder(order);
		if (index !== -1) {
			this.fnOrderRemove(index);
		}
		this.search();
	}

	/**
	 * Definisce la struttura del form per i filtri di ricerca
	 */
	abstract getFilterForm(): FormGroup;
	/**
	 * Definisce i filtri iniziali della ricerca, indipendentemente dai valori settati nel form.
	 * Basta settarlo a null se vogliamo recuperare i valori iniziali di filtro direttamente dal form
	 */
	abstract getDefaultFilter(): any[];
	/**
	 * Definisce i parametri di ordinamento iniziali della ricerca
	 */
	abstract getDefaultOrder(): any[];
	/**
	 * Definisce la paginazione iniziale della lista
	 *
	 * @param rowsForPage numero di righe per pagina
	 */
	abstract getDefaultPaginate(rowsForPage: number): any;

	/**
	 * Ritorna la pagina presente nei parametri di paginazione
	 * @param paginate oggetto paginazione
	 */
	abstract getCurrentByPaginate(paginate: any): number;

	/**
	 * Ritorna un oggetto di paginazione di input alla ricerca basato sul
	 * numero di righe per pagina e pagina da visualizzare
	 * @param rowsForPage numero di righe per pagina
	 * @param page pagina richiesta
	 */
	abstract getPaginate(rowsForPage: number, page: number): any;

	/**
	 * Ritorna un array di filtri di ricerca popolati da un form
	 * @param form form dei filtri di ricerca
	 */
	abstract getFiltersByForm(form: FormGroup): any[];

	/**
	 * Ricerca
	 * @param filters filtri per la ricerca
	 * @param orders ordinamento
	 * @param paginate paginazione
	 */
	abstract fnSearch(filters: any[], orders: any[], paginate: any): Observable<PaginatorModel>;
	/**
	 * Ritona un [BehaviourObserverModel]{@link BehaviourObserverModel} per la definizione delle funzioni
	 * da eseguire prima e dopo la chiamata [search()]{@link BaseSearchComponent#search}
	 */
	abstract searchBehaviour(): BehaviourObserverModel;
	/**
	 * esegue del codice dopo che è stato eseguita la ricerca con [search]{@link BaseSearchComponent#search}
	 * @param res ritorno di [search]{@link BaseSearchComponent#search}
	 */
	abstract afterSearch(res: any);

	/**
	 * Funzione che gestisce la rimozione di un oggetto order dall'array [orders]{@link BaseSearchComponent#orders}
	 * @param index indice dell'oggetto order in [orders]{@link BaseSearchComponent#orders}
	 */
	abstract fnOrderRemove(index: number);

	/**
	 * Funzione che ritorna l'order modificato da aggiungere all'array [orders]{@link BaseSearchComponent#orders}.
	 * Usato per esempio quando viene cambiato il tipo di ordinamento da asc a desc o viceversa.
	 * @param order oggetto order da valutare
	 * @param index indice dell'oggetto order in [orders]{@link BaseSearchComponent#orders}
	 */
	abstract fnEvalOrderToPush(order: any, index: number): any;

	/**
	 * Funzione che ritorna l'indice di order nell'array [orders]{@link BaseSearchComponent#orders} se esiste, -1 altrimenti.
	 * Deve eseguire una find sull'array degli ordinamenti.
	 * @param order oggetto order o chiave da cercare in [orders]{@link BaseSearchComponent#orders}
	 */
	abstract fnIndexOrder(order: any): number;
}
