import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { UmlPropertiesMaker } from './properties/uml-properties.maker';
import { UmlProperties } from './properties/uml.properties';
import { UmlUtility } from './utility/uml.utility';

export class UmlTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: UmlProperties): go.Diagram {
		UmlPropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);

		return myDiagram;
	}

	makeProperties(properties?: UmlProperties) {
		UmlPropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		UmlPropertiesMaker.reset();
	}

	private makeDiagram(divId: string): go.Diagram {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(
			divId, // must be the ID or reference to an HTML DIV
			{
				'undoManager.isEnabled': true,
				layout: $(go.TreeLayout, {
					// this only lays out in trees nodes connected by "generalization" links
					angle: 90,
					path: go.TreeLayout.PathSource, // links go from child to parent
					setsPortSpot: false, // keep Spot.AllSides for link connection spot
					setsChildPortSpot: false, // keep Spot.AllSides
					// nodes not connected by "generalization" links are laid out horizontally
					arrangement: go.TreeLayout.ArrangementHorizontal,
				}),
			},
		);

		// by default, "Inheritance" or "Generalization"
		myDiagram.linkTemplate = $(
			go.Link,
			UmlUtility.linkStyle(),
			{ isTreeLink: true },
			$(go.Shape),
			$(go.Shape, { toArrow: 'Triangle', fill: 'white' }),
		);

		myDiagram.linkTemplateMap.add('Association', $(go.Link, UmlUtility.linkStyle(), $(go.Shape)));

		myDiagram.linkTemplateMap.add(
			'Realization',
			$(
				go.Link,
				UmlUtility.linkStyle(),
				$(go.Shape, { strokeDashArray: [3, 2] }),
				$(go.Shape, { toArrow: 'Triangle', fill: 'white' }),
			),
		);

		myDiagram.linkTemplateMap.add(
			'Dependency',
			$(
				go.Link,
				UmlUtility.linkStyle(),
				$(go.Shape, { strokeDashArray: [3, 2] }),
				$(go.Shape, { toArrow: 'OpenTriangle' }),
			),
		);

		myDiagram.linkTemplateMap.add(
			'Composition',
			$(
				go.Link,
				UmlUtility.linkStyle(),
				$(go.Shape),
				$(go.Shape, { fromArrow: 'StretchedDiamond', scale: 1.3 }),
				$(go.Shape, { toArrow: 'OpenTriangle' }),
			),
		);

		myDiagram.linkTemplateMap.add(
			'Aggregation',
			$(
				go.Link,
				UmlUtility.linkStyle(),
				$(go.Shape),
				$(go.Shape, { fromArrow: 'StretchedDiamond', fill: 'white', scale: 1.3 }),
				$(go.Shape, { toArrow: 'OpenTriangle' }),
			),
		);

		return myDiagram;
	}
}
