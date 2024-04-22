import { Component, Input } from '@angular/core';
import * as go from 'gojs';
import { FamilyTreeTemplate } from '../../builder/family-tree/family-tree.template';
import { FamilyTreeModel } from '../../builder/family-tree/model/family-tree.model';
import { FamilyTreeUtility } from '../../builder/family-tree/utility/family-tree.utility';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-family-tree',
	templateUrl: './family-tree.component.html',
	styleUrls: ['./family-tree.component.scss'],
})
export class FamilyTreeComponent extends GojsDiagramComponent<FamilyTreeTemplate, FamilyTreeModel> {
	@Input() flgLegendaSex: boolean = true;
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return this.defaultModel();
	}
	override instanceBuilder(): FamilyTreeTemplate {
		return new FamilyTreeTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {
		if (this.flgLegendaSex) {
			diagram.add(FamilyTreeUtility.makeLegendaSex());
		}
	}
	override buildDiagramModel(diagram: go.Diagram): void {}
}
