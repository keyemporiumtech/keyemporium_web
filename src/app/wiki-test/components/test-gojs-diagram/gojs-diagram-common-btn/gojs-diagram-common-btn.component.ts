import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GojsDiagramComponent } from 'gojs-diagram';

@Component({
	selector: 'wiki-gojs-diagram-common-btn',
	templateUrl: './gojs-diagram-common-btn.component.html',
	styleUrls: ['./gojs-diagram-common-btn.component.scss'],
})
export class GojsDiagramCommonBtnComponent {
	@Input() cmpDiagram: GojsDiagramComponent<any, any>;
	@Input() filename: string = 'Test.png';
	@ViewChild('textJson') textJson: ElementRef;

	download() {
		if (this.cmpDiagram) {
			this.cmpDiagram.download();
		}
	}
	saveJson() {
		if (this.cmpDiagram) {
			this.textJson.nativeElement.value = this.cmpDiagram.getJsonString();
		}
	}

	loadJson() {
		if (this.cmpDiagram) {
			this.cmpDiagram.loadJsonString(this.textJson.nativeElement.value);
		}
	}
}
