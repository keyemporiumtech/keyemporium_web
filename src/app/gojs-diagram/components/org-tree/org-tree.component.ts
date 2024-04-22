import { Component } from '@angular/core';
import { OrgTreeModel } from '../../builder/org-tree/model/org-tree.model';
import { OrgTreeTemplate } from '../../builder/org-tree/org-tree.template';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-org-tree',
	templateUrl: './org-tree.component.html',
	styleUrls: ['./org-tree.component.scss'],
})
export class OrgTreeComponent extends GojsDiagramComponent<OrgTreeTemplate, OrgTreeModel> {
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return this.defaultModel();
	}
	override instanceBuilder(): OrgTreeTemplate {
		return new OrgTreeTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {}
}
