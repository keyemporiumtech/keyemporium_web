import { Component, OnInit } from '@angular/core';
import * as versioning from '../../../../../versioning.json';

@Component({
	selector: 'wiki-versioning',
	templateUrl: './versioning.component.html',
	styleUrls: ['./versioning.component.scss'],
})
export class VersioningComponent implements OnInit {
	versioningJson = versioning['default'];
	modules = [];
	constructor() {}

	ngOnInit() {
		this.loadModules();
	}

	private loadModules() {
		for (const key in this.versioningJson) {
			if (Object.prototype.hasOwnProperty.call(this.versioningJson, key)) {
				this.modules.push({ module: key, version: this.versioningJson[key] });
			}
		}
	}
}
