import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { FlowchartPropertiesMaker } from './properties/flowchart-properties.maker';
import { FlowchartProperties } from './properties/flowchart.properties';
import { FlowchartUtility } from './utility/flowchart.utility';

export class FlowchartTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: FlowchartProperties): go.Diagram {
		FlowchartPropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);
		// myDiagram.nodeTemplate = FamilyTreeUtility.makeNodeTemplate();
		// myDiagram.add(FamilyTreeUtility.makeLegendaSex());
		// myDiagram.nodeTemplate.contextMenu = FamilyTreeUtility.standardContextMenus(myDiagram);
		// myDiagram.nodeTemplate.toolTip = FamilyTreeUtility.makeTooltip();

		return myDiagram;
	}

	makeProperties(properties?: FlowchartProperties) {
		FlowchartPropertiesMaker.setValues(properties);
	}

	resetProperties(): void {
		FlowchartPropertiesMaker.reset();
	}

	private makeDiagram(divId: string) {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(
			divId, // must name or refer to the DIV HTML element
			{
				LinkDrawn: FlowchartUtility.showLinkLabel, // this DiagramEvent listener is defined below
				LinkRelinked: FlowchartUtility.showLinkLabel,
				'undoManager.isEnabled': true, // enable undo & redo
			},
		);

		// when the document is modified, add a "*" to the title and enable the "Save" button
		/*
		myDiagram.addDiagramListener('Modified', (e) => {
			var button = document.getElementById('SaveButton');
			if (button) button.disabled = !myDiagram.isModified;
			var idx = document.title.indexOf('*');
			if (myDiagram.isModified) {
				if (idx < 0) document.title += '*';
			} else {
				if (idx >= 0) document.title = document.title.slice(0, idx);
			}
		});
    */

		myDiagram.linkTemplate = $(
			go.Link, // the whole link panel
			{
				routing: go.Link.AvoidsNodes,
				curve: go.Link.JumpOver,
				corner: 5,
				toShortLength: 4,
				relinkableFrom: true,
				relinkableTo: true,
				reshapable: true,
				resegmentable: true,
				// mouse-overs subtly highlight links:
				mouseEnter: (e, link) =>
					((link as any).findObject('HIGHLIGHT').stroke = FlowchartUtility.highlightPortColor),
				mouseLeave: (e, link) => ((link as any).findObject('HIGHLIGHT').stroke = 'transparent'),
				selectionAdorned: false,
			},
			new go.Binding('points').makeTwoWay(),
			$(
				go.Shape, // the highlight shape, normally transparent
				{ isPanelMain: true, strokeWidth: 8, stroke: 'transparent', name: 'HIGHLIGHT' },
			),
			$(
				go.Shape, // the link path shape
				{ isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
				new go.Binding('stroke', 'isSelected', (sel) =>
					sel
						? FlowchartUtility.linkHighlight.highlightColor
						: FlowchartUtility.linkHighlight.linkColor,
				).ofObject(),
			),
			$(
				go.Shape, // the arrowhead
				{
					toArrow: FlowchartUtility.linkHighlight.arrowType,
					strokeWidth: FlowchartUtility.linkHighlight.arrowSize,
					fill: FlowchartUtility.linkHighlight.arrowColor,
				},
			),
			$(
				go.Panel,
				'Auto', // the link label, normally not visible
				{ visible: false, name: 'LABEL', segmentIndex: 2, segmentFraction: 0.5 },
				new go.Binding('visible', 'visible').makeTwoWay(),
				$(
					go.Shape,
					FlowchartUtility.shapeConditionalLink.type, // the label shape
					{
						fill: FlowchartUtility.shapeConditionalLink.background,
						strokeWidth: FlowchartUtility.shapeConditionalLink.borderSize,
					},
				),
				$(
					go.TextBlock,
					FlowchartUtility.textConditionalLink.defaultText, // the label
					{
						textAlign: FlowchartUtility.textConditionalLink.textAlign,
						font: FlowchartUtility.textConditionalLink.font,
						stroke: FlowchartUtility.textConditionalLink.textColor,
						editable: true,
					},
					new go.Binding('text').makeTwoWay(),
				),
			),
		);

		return myDiagram;
	}

	makePalette(divId: string, myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;
		const myPalette = new go.Palette(
			divId, // must name or refer to the DIV HTML element
			{
				// Instead of the default animation, use a custom fade-down
				'animationManager.initialAnimationStyle': go.AnimationManager.None,
				InitialAnimationStarting: FlowchartUtility.animateFadeDown, // Instead, animate with this function

				nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
				model: new go.GraphLinksModel([
					// specify the contents of the Palette
					{ category: 'Start', text: FlowchartUtility.shapeStart.defaultText },
					{ text: FlowchartUtility.shapeStep.defaultText },
					{ category: 'Conditional', text: FlowchartUtility.shapeConditional.defaultText },
					{ category: 'End', text: FlowchartUtility.shapeEnd.defaultText },
					{ category: 'Comment', text: FlowchartUtility.shapeComment.defaultText },
				]),
			} as any,
		);

		return myPalette;
	}
}
