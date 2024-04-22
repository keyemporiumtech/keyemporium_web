import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'wiki-test-activity-tree-maker',
	templateUrl: './test-activity-tree-maker.component.html',
	styleUrls: ['./test-activity-tree-maker.component.scss'],
})
export class TestActivityTreeMakerComponent {
	@Input() piva: string;
	@Input() id_diagram: string;

	@Output() saveJsonEmit: EventEmitter<string> = new EventEmitter<string>();

	onJsonSave(id_activitydiagram: string) {
		this.saveJsonEmit.emit(id_activitydiagram);
	}
}
