import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ddc-init-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent implements OnInit {
	_loading: boolean = false;
	@Input()
	set loading(loading: boolean) {
		this._loading = loading;
		this.classLoading = loading;
	}

	@HostBinding('class.loading') classLoading = false;

	private _list: string[] = [];
	typeCssLoader = TypCssLoading;
	@Input() color: string = '#000';
	@Input() typeCss: TypCssLoading = TypCssLoading.DEFAULT;
	@Input() imageUrl: string;
	@Input() imageClass: any;
	@Input() imageStyle: any;
	@Input() position: 'center' | 'left' | 'right' = 'center';

	constructor() {
		this.populateList();
	}

	ngOnInit() {}

	private populateList() {
		this.list.push('circle');
		this.list.push('dual-ring');
		this.list.push('fb');
		this.list.push('heart');
		this.list.push('ring');
		this.list.push('default');
		this.list.push('ellipsis');
		this.list.push('grid');
		this.list.push('hourglass');
		this.list.push('ripple');
		this.list.push('spinner');
	}

	getStylePosition(): any {
		const style: any = {};
		style['text-align'] = this.position;
		return style;
	}

	/**
	 * Getter list
	 * @return string[]
	 */
	public get list(): string[] {
		return this._list;
	}

	/**
	 * Setter list
	 * @param string[] value
	 */
	public set list(value: string[]) {
		this._list = value;
	}
}

export enum TypCssLoading {
	CIRCLE = 'circle',
	DUAL_RING = 'dual-ring',
	FACEBOOK = 'fb',
	HEART = 'heart',
	RING = 'ring',
	DEFAULT = 'default',
	ELLIPSIS = 'ellipsis',
	GRID = 'grid',
	HOURGLASS = 'hourglass',
	RIPPLE = 'ripple',
	SPINNER = 'spinner',
}
