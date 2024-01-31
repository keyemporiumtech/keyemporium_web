import { Component } from '@angular/core';
import { UmlModel } from '../../builder/uml/model/uml.model';
import { UmlTemplate } from '../../builder/uml/uml.template';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-uml',
	templateUrl: './uml.component.html',
	styleUrls: ['./uml.component.scss'],
})
export class UmlComponent extends GojsDiagramComponent<UmlTemplate, UmlModel> {
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		const model = this.defaultModel();
		model.copiesArrays = true;
		model.copiesArrayObjects = true;
		model.linkCategoryProperty = 'relationship';
		return model;
	}
	override instanceBuilder(): UmlTemplate {
		return new UmlTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {}
}
