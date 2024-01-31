import { Component } from '@angular/core';
import * as go from 'gojs';
import { DecisionTreeTemplate } from '../../builder/decision-tree/decision-tree.template';
import { DecisionTreeModel } from '../../builder/decision-tree/model/decision-tree.model';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-decision-tree',
	templateUrl: './decision-tree.component.html',
	styleUrls: ['./decision-tree.component.scss'],
})
export class DecisionTreeComponent extends GojsDiagramComponent<
	DecisionTreeTemplate,
	DecisionTreeModel
> {
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		const model = this.defaultModel();
		model.nodeKeyProperty = 'key';
		model.linkFromPortIdProperty = 'fromPort';
		model.linkKeyProperty = 'key';
		return model;
	}
	override instanceBuilder(): DecisionTreeTemplate {
		return new DecisionTreeTemplate();
	}

	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {
		diagram.nodes.each((n) => {
			if (n.key !== 'Start') n.visible = false;
		});
		diagram.links.each((l) => {
			l.visible = false;
		});
	}
}
