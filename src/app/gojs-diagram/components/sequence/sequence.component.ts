import { Component } from '@angular/core';
import { SequenceModel } from '../../builder/sequence/model/sequence.model';
import { SequenceTemplate } from '../../builder/sequence/sequence.template';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-sequence',
	templateUrl: './sequence.component.html',
	styleUrls: ['./sequence.component.scss'],
})
export class SequenceComponent extends GojsDiagramComponent<SequenceTemplate, SequenceModel> {
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return this.defaultModel();
	}
	override instanceBuilder(): SequenceTemplate {
		return new SequenceTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {}
}
