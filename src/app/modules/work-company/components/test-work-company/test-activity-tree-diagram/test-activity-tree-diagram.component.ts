import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'wiki-test-activity-tree-diagram',
	templateUrl: './test-activity-tree-diagram.component.html',
	styleUrls: ['./test-activity-tree-diagram.component.scss'],
})
export class TestActivityTreeDiagramComponent {
	@Input() piva: string;
	@Input() id_diagram: string;

	@Output() saveJsonEmit: EventEmitter<string> = new EventEmitter<string>();

	onJsonSave(id_activitydiagram: string) {
		this.saveJsonEmit.emit(id_activitydiagram);
	}
}
