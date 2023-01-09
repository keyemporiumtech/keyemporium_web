import { ApplicationLoggerService, ObjectUtility } from '@ddc/kit';
import { FormGroup } from '@angular/forms';
import { BaseSearchComponent, QueryUtility, ResponseManagerInterface } from '@ddc/rest';
import { ApiModel } from '../../cakeutils/base/api.model';
import { DBPaginateInterface } from '../../cakeutils/interfaces/db-paginate.interface';
import { DBOrderInterface } from '../../cakeutils/interfaces/db-order.interface';
import { DbFilterInterface } from '../../cakeutils/interfaces/db-filter.interface';
import { Input, Directive } from '@angular/core';
import { ApiInputQueryInterface } from '../../cakeutils/interfaces/api-input-query.interface';

/**
 * Classe da estendere per la definizione di un componente di ricerca
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseApiSearchComponent<M extends ApiModel> extends BaseSearchComponent<M> {
	@Input() querySearch: ApiInputQueryInterface;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}
	fnStopLoading = () => {
		this.stopLoading();
	};

	appendResponseStopLoading(...responseIn: ResponseManagerInterface[]): ResponseManagerInterface {
		return ObjectUtility.mergeDeep({}, ...responseIn, QueryUtility.FN_ERROR(this.fnStopLoading));
	}

	getCurrentByPaginate(paginate: DBPaginateInterface): number {
		return paginate && +paginate.page ? paginate.page : 1;
	}
	getPaginate(rowsForPage: number, page: number): DBPaginateInterface {
		return rowsForPage ? { limit: rowsForPage, page: page } : null;
	}

	fnOrderRemove(index: number) {
		this.orders.splice(index, 1);
	}

	fnEvalOrderToPush(order: DBOrderInterface, index: number): DBOrderInterface {
		const orderArray = this.orders[index];
		return order.value !== orderArray.value ? order : orderArray;
	}

	fnIndexOrder(order: DBOrderInterface): number {
		return this.orders.findIndex((el) => el.key === order.key);
	}

	order(name: string, type?: 'asc' | 'desc') {
		const orderObj: DBOrderInterface = { key: name, value: type ? type : 'asc' };
		super.order(orderObj);
	}
	orderAdd(name: string, type?: 'asc' | 'desc') {
		const orderObj: DBOrderInterface = { key: name, value: type ? type : 'asc' };
		super.orderAdd(orderObj);
	}
	orderRemove(name: string) {
		const orderObj: DBOrderInterface = { key: name, value: undefined };
		super.orderRemove(orderObj);
	}

	abstract getFiltersByForm(form: FormGroup): DbFilterInterface[];

	// aggiuntive
	existOrder(name: string, type?: 'asc' | 'desc'): boolean {
		return this.orders.findIndex((el) => el.key === name && el.value === type) !== -1
			? true
			: false;
	}
	existOrderByKey(key: string): boolean {
		return this.orders.findIndex((el) => el.key === key) !== -1 ? true : false;
	}
	/**
	 * Inverte l'ordinamento corrente su una chiave se esiste o imposta ascendente se non esiste
	 * @param key chiave da invertire
	 */
	orderOneWay(key: string) {
		const index = this.orders.findIndex((el) => el.key === key);
		if (index !== -1) {
			const type = this.orders[index].value === 'asc' ? 'desc' : 'asc';
			this.order(key, type);
		} else {
			this.order(key, 'asc');
		}
	}
}
