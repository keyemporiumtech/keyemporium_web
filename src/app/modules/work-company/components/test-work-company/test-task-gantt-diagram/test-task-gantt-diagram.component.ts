import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'wiki-test-task-gantt-diagram',
	templateUrl: './test-task-gantt-diagram.component.html',
	styleUrls: ['./test-task-gantt-diagram.component.scss'],
})
export class TestTaskGanttDiagramComponent {
	@Input() cod: string;
	@Input() piva: string;
	@Input() id_diagram: string;

	@Output() saveJsonEmit: EventEmitter<string> = new EventEmitter<string>();

	onJsonSave(id_activitydiagram: string) {
		this.saveJsonEmit.emit(id_activitydiagram);
	}
}
