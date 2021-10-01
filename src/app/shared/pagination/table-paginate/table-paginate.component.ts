import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'ddc-init-table-paginate',
	templateUrl: './table-paginate.component.html',
	styleUrls: ['./table-paginate.component.scss'],
})
export class TablePaginateComponent implements OnInit {
	@Input() maxToShow = 10;
	// evaluation max
	private evaluationNumbers: boolean;
	pagesShow: number[];
	showMoreLeft: boolean;
	showMoreRight: boolean;
	inputSearch: number;

	private _pagesNumbers: number[];
	@Input() set pagesNumbers(val: number[]) {
		this._pagesNumbers = val;
		this.pages = val.length;
		if (!this.evaluationNumbers && this.current && this.current > 0) {
			this.evaluationNumbers = true;
			this.evalNumbers(this.current);
			this.evaluationNumbers = false;
		}
	}
	get pagesNumbers(): number[] {
		return this._pagesNumbers;
	}

	private _current: number;
	@Input() set current(val: number) {
		this._current = val;
		if (!this.evaluationNumbers && val && val > 0) {
			this.evaluationNumbers = true;
			this.evalNumbers(val);
			this.evaluationNumbers = false;
		}
	}
	get current(): number {
		return this._current;
	}

	@Output() pageEmit: EventEmitter<number> = new EventEmitter<number>();
	// used
	pages: number;

	constructor() {
		this._pagesNumbers = [];
		this.current = 0;
		this.pagesShow = [];
	}

	ngOnInit() {}

	page(val: number) {
		if (val !== this.current) {
			this.pageEmit.emit(val);
		}
	}

	search(val: number) {
		if (val) {
			if (val >= 1 && val <= this.pages) {
				this.page(val);
			} else {
				alert('Not possible');
			}
		}
	}

	private evalNumbers(current: number) {
		if (this.pages > this.maxToShow) {
			this.buildMaxToShow(current);
		} else {
			this.showMoreLeft = false;
			this.showMoreRight = false;
			this.pagesShow = this.pagesNumbers;
		}
	}

	private buildMaxToShow(current: number) {
		if (current >= this.maxToShow / 2) {
			this.pagesShow = [];
			this.showMoreLeft = true;
			for (let i = current; i <= current + this.maxToShow; i++) {
				if (i <= this.pages) {
					this.pagesShow.push(i);
				}
			}
		} else {
			this.pagesShow = [];
			this.showMoreLeft = false;
			for (let i = 1; i <= this.maxToShow; i++) {
				this.pagesShow.push(i);
			}
		}
		if (current >= this.pages - this.maxToShow) {
			this.showMoreRight = false;
		} else {
			this.showMoreRight = true;
		}
	}
}
