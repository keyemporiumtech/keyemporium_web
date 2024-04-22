import { Component } from '@angular/core';
import * as go from 'gojs';
import { DoubleTreeTemplate } from '../../builder/double-tree/double-tree.template';
import { DoubleTreeModel } from '../../builder/double-tree/model/double-tree.model';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-double-tree',
	templateUrl: './double-tree.component.html',
	styleUrls: ['./double-tree.component.scss'],
})
export class DoubleTreeComponent extends GojsDiagramComponent<DoubleTreeTemplate, DoubleTreeModel> {
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.TreeModel {
		return new go.TreeModel(this.diagramModel.diagramNodeData);
	}
	override instanceBuilder(): DoubleTreeTemplate {
		return new DoubleTreeTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {}
}
