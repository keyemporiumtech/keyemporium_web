import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'wiki-test-cu-sequence-diagram',
	templateUrl: './test-cu-sequence-diagram.component.html',
	styleUrls: ['./test-cu-sequence-diagram.component.scss'],
})
export class TestCuSequenceDiagramComponent {
	@Input() cod: string;
	@Input() piva: string;
	@Input() id_diagram: string;

	@Output() saveJsonEmit: EventEmitter<string> = new EventEmitter<string>();

	onJsonSave(id_activitydiagram: string) {
		this.saveJsonEmit.emit(id_activitydiagram);
	}
}
