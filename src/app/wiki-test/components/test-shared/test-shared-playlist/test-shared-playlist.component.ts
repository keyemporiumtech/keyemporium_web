import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
	selector: 'wiki-test-shared-playlist',
	templateUrl: './test-shared-playlist.component.html',
	styleUrls: ['./test-shared-playlist.component.scss'],
})
export class TestSharedPlaylistComponent implements OnInit {
	box: string;
	collapsed: string;
	constructor() {}

	ngOnInit() {}

	openCloseBox(name: string, collapseId: string) {
		if (this.box === name) {
			this.box = undefined;
			$('#' + collapseId).collapse('hide');
			this.collapsed = undefined;
		} else {
			this.box = name;
			if (this.collapsed) {
				$('#' + this.collapsed).collapse('hide');
			}
			$('#' + collapseId).collapse('show');
			this.collapsed = collapseId;
		}
	}
}
