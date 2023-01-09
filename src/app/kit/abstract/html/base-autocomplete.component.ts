import { BaseComponent } from '../base.component';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { EventEmitter, Output, Input, Directive } from '@angular/core';
import { StringTranslate } from '../../translation/models/string-translate.model';
import { OptionListModel } from '../../html/models/option-list.model';
import { component } from '../../../../environments/template/component';

/**
 * Gestisce un componente di autocompletamento implementando le funzioni di ricerca da un input testuale.
 *
 * L'item usato è di tipo [OptionListModel]{@link OptionListModel}
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseAutocompleteComponent extends BaseComponent {
	@Output() searchEmit = new EventEmitter<string>(); // evento che scatta quando viene avviata la ricerca (emette il parametro di ricerca)
	@Output() termEmit = new EventEmitter<string>(); // evento che scatta quando al keyup (emette il parametro di ricerca)
	@Output() selectEmit = new EventEmitter<OptionListModel>(); // evento che scatta al click di un item (emette l'item)
	@Output() overEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando si passa con il mouse sopra l'item (emette l'item)
	@Output() outEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando il mouse lascia un item (emette l'item)
	@Output() focusEmit = new EventEmitter<string>(); // evento che scatta quando il componente di input prende il focus
	// input
	_list: OptionListModel[];
	get list(): OptionListModel[] {
		return this._list;
	}
	@Input('list')
	set list(list: OptionListModel[]) {
		this._list = list;
	}
	@Input() listAll: OptionListModel[];
	@Input() maxDigit: number;
	@Input() readonly: boolean;
	// used
	showNoResult: boolean;
	onItem: boolean;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.list = [];
		this.maxDigit = component.autocomplete.maxDigit;
	}

	// EVENTO DIGIT

	/**
	 * Da richiamare al keyup del componente: (keyup)="onKeyUp($event.target.value)".
	 *
	 * Emette il parametro di ricerca tramite searchEmit
	 * @param term valore digitato ($event.target.value)
	 */
	onKeyUp(term: string) {
		this.termEmit.emit(term);
		if (!term) {
			this.list = this.listAll && this.listAll.length ? this.listAll : [];
		} else if (term.length >= this.maxDigit) {
			this.showNoResult = true;
			this.searchEmit.emit(term);
		} else {
			this.showNoResult = false;
			this.list = [];
		}
	}

	onFocus(term: string) {
		this.focusEmit.emit(term);
		if (!term) {
			this.list = this.listAll && this.listAll.length ? this.listAll : [];
		}
	}

	// manage focus out
	onFocusOut() {
		if (this.listAll && this.listAll.length && !this.onItem) {
			// this.list = [];
		}
	}

	// EVENTI ITEM

	/**
	 * Da richiamare al click sull'item: (click)="onClickItem(item)"
	 *
	 * Emette l'item tramite selectEmit
	 * @param item item che ha generato l'evento
	 */
	onClickItem(item: OptionListModel) {
		this.showNoResult = false;
		this.list = [];
		this.selectEmit.emit(item);
	}
	/**
	 * Da richiamare al mouseover sull'item: (mouseover)="onOverItem(item)"
	 *
	 * Emette l'item tramite overEmit
	 * @param item item che ha generato l'evento
	 */
	onOverItem(item: OptionListModel) {
		this.overEmit.emit(item);
	}
	/**
	 * Da richiamare al mouseout sull'item: (mouseout)="onOutItem(item)"
	 *
	 * Emette l'item tramite outEmit
	 * @param item item che ha generato l'evento
	 */
	onOutItem(item: OptionListModel) {
		this.outEmit.emit(item);
	}

	/**
	 * Ritorna il testo da mostrare se non ci sono risultati durante la ricerca
	 */
	abstract getTextNotFoundResults(): string | StringTranslate;
}
