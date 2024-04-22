import { Component, Input } from '@angular/core';
import * as go from 'gojs';
import { GenogramTemplate } from '../../builder/genogram/genogram.template';
import { GenogramModel } from '../../builder/genogram/model/genogram.model';
import { GenogramUtility } from '../../builder/genogram/utility/genogram.utility';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-genogram',
	templateUrl: './genogram.component.html',
	styleUrls: ['./genogram.component.scss'],
})
export class GenogramComponent extends GojsDiagramComponent<GenogramTemplate, GenogramModel> {
	@Input() flgLegendaSex: boolean = true;
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return new go.GraphLinksModel({
			// declare support for link label nodes
			linkLabelKeysProperty: 'labelKeys',
			// this property determines which template is used
			nodeCategoryProperty: 's',
			// if a node data object is copied, copy its data.a Array
			copiesArrays: true,
			nodeKeyProperty: 'key',
			// linkToPortIdProperty: 'toPort',
			// linkFromPortIdProperty: 'fromPort',
			linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksMode
			nodeDataArray: this.diagramModel.diagramNodeData,
			linkDataArray: this.diagramModel.diagramLinkData,
		});
	}
	override instanceBuilder(): GenogramTemplate {
		return new GenogramTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {
		GenogramUtility.setupMarriages(diagram);
		GenogramUtility.setupParents(diagram);

		const node = diagram.findNodeForKey(4);
		if (node !== null) node.isSelected = true;
	}
}
