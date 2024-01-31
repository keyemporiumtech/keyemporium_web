import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { GenogramLayout } from './classes/genogram.layout';
import { GenogramProperties } from './properties/genogram-properties';
import { GenogramPropertiesMaker } from './properties/genogram-properties.maker';
import { GenogramUtility } from './utility/genogram.utility';

export class GenogramTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: GenogramProperties): go.Diagram {
		GenogramPropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);
		// myDiagram.nodeTemplate = FamilyTreeUtility.makeNodeTemplate();
		// myDiagram.add(FamilyTreeUtility.makeLegendaSex());
		// myDiagram.nodeTemplate.contextMenu = FamilyTreeUtility.standardContextMenus(myDiagram);
		// myDiagram.nodeTemplate.toolTip = FamilyTreeUtility.makeTooltip();

		return myDiagram;
	}

	makeProperties(properties?: GenogramProperties) {
		GenogramPropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		GenogramPropertiesMaker.reset();
	}

	makeDiagram(divId: string) {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(
			divId, // must be the ID or reference to div
			{
				'animationManager.isEnabled': false,
				initialAutoScale: go.Diagram.Uniform,
				'undoManager.isEnabled': true,
				maxSelectionCount: 1,
				// when a node is selected, draw a big yellow circle behind it
				nodeSelectionAdornmentTemplate: $(
					go.Adornment,
					'Auto',
					{ layerName: 'Grid' }, // the predefined layer that is behind everything else
					$(go.Shape, 'Circle', { fill: '#c1cee3', stroke: null }),
					$(go.Placeholder, { margin: 2 }),
				),
				// use a custom layout, defined above
				layout: $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 }),
			},
		);

		if (GenogramUtility.diagramType === 'ARLECCHINO') {
			GenogramUtility.makeNodeTemplateArlecchino(myDiagram);
		} else if (GenogramUtility.diagramType === 'FILLED') {
			GenogramUtility.makeNodeTemplateFilled(myDiagram);
		}

		if (GenogramUtility.linkType === 'SIMPLE') {
			GenogramUtility.makeLinkSimple(myDiagram);
		} else if (GenogramUtility.linkType === 'COMPLEX') {
			GenogramUtility.makeLinkComplex(myDiagram);
		}

		myDiagram.model = new go.GraphLinksModel({
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
		});

		return myDiagram;
	}
}
