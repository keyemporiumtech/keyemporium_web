import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { EnumFamilyLinkCategory } from './model/family-tree.model';
import { FamilyTreeProperties } from './properties/family-tree-properties';
import { FamilyTreePropertiesMaker } from './properties/family-tree-properties.maker';
import { FamilyTreeUtility } from './utility/family-tree.utility';

export class FamilyTreeTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: FamilyTreeProperties): go.Diagram {
		FamilyTreePropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);
		// myDiagram.nodeTemplate = FamilyTreeUtility.makeNodeTemplate();
		// myDiagram.add(FamilyTreeUtility.makeLegendaSex());
		// myDiagram.nodeTemplate.contextMenu = FamilyTreeUtility.standardContextMenus(myDiagram);
		// myDiagram.nodeTemplate.toolTip = FamilyTreeUtility.makeTooltip();

		return myDiagram;
	}

	makeProperties(properties?: FamilyTreeProperties) {
		FamilyTreePropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		FamilyTreePropertiesMaker.reset();
	}

	makeDiagram(divId: string) {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(
			divId, // must be the ID or reference to div
			{
				'toolManager.hoverDelay': 100, // 100 milliseconds instead of the default 850
				allowCopy: false,
				// create a TreeLayout for the family tree

				layout: $(go.TreeLayout, {
					angle: 90,
					nodeSpacing: 10,
					layerSpacing: 40,
					layerStyle: go.TreeLayout.LayerUniform,
					setsPortSpot: false, // abilita fromSpot
					setsChildPortSpot: false, // abilita toSpot
				}),
			},
		);

		myDiagram.linkTemplate = $(
			go.Link, // the whole link panel
			{
				routing: go.Link.Orthogonal,
				corner: 5,
				fromSpot: go.Spot.BottomCenter,
				toSpot: go.Spot.TopCenter,
				selectable: false,
			},
			new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
			new go.Binding('toSpot', 'toSpot', go.Spot.parse),
			$(go.Shape, { strokeWidth: 3, stroke: FamilyTreeUtility.parentChildColor }).bind(
				'stroke',
				'color',
			),
			$(go.Shape, { fromArrow: 'Line' })
				.bind('fromArrow')
				.bind('fill', 'arrowFromColor')
				.bind('scale', 'arrowFromSize'),
			$(go.Shape, { toArrow: 'Standard', scale: 1.5 })
				.bind('toArrow')
				.bind('fill', 'arrowColor')
				.bind('scale', 'arrowSize'),
			$(go.TextBlock, { margin: new go.Margin(5, 0, 0, 0) }).bind('text'),
		);

		myDiagram.linkTemplateMap.add(
			EnumFamilyLinkCategory.SPOUSE.toString(),
			$(
				go.Link, // the whole link panel
				{
					routing: go.Link.AvoidsNodes,
					corner: 10,
					fromSpot: go.Spot.LeftRightSides,
					toSpot: go.Spot.LeftRightSides,
					selectable: false,
					isTreeLink: false,
				},
				new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
				new go.Binding('toSpot', 'toSpot', go.Spot.parse),
				$(go.Shape, { strokeWidth: 3, stroke: FamilyTreeUtility.spouseColor }).bind(
					'stroke',
					'color',
				),
				$(go.Shape, { fromArrow: 'BackwardCircleFork', scale: 1.5 })
					.bind('fromArrow')
					.bind('fill', 'arrowFromColor')
					.bind('scale', 'arrowFromSize'),
				$(go.Shape, { toArrow: 'CircleFork', scale: 1.5 })
					.bind('toArrow')
					.bind('fill', 'arrowColor')
					.bind('scale', 'arrowSize'),
				$(go.TextBlock, { margin: new go.Margin(5, 0, 0, 0) }).bind('text'),
			),
		);

		myDiagram.linkTemplateMap.add(
			EnumFamilyLinkCategory.BROTHER.toString(),
			$(
				go.Link, // the whole link panel
				{
					routing: go.Link.AvoidsNodes,
					corner: 10,
					fromSpot: go.Spot.LeftRightSides,
					toSpot: go.Spot.LeftRightSides,
					selectable: false,
					isTreeLink: false,
				},
				new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
				new go.Binding('toSpot', 'toSpot', go.Spot.parse),
				$(go.Shape, { strokeWidth: 3, stroke: FamilyTreeUtility.brotherColor }).bind(
					'stroke',
					'color',
				),
				$(go.Shape, { fromArrow: 'TripleLine', scale: 1.5 })
					.bind('fromArrow')
					.bind('fill', 'arrowFromColor')
					.bind('scale', 'arrowFromSize'),
				$(go.Shape, { toArrow: 'TripleLine', scale: 1.5 })
					.bind('toArrow')
					.bind('fill', 'arrowColor')
					.bind('scale', 'arrowSize'),
				$(go.TextBlock, { margin: new go.Margin(5, 0, 0, 0) }).bind('text'),
			),
		);

		return myDiagram;
	}
}
