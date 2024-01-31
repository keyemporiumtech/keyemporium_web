import * as go from 'gojs';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { DecisionTreeLink } from '../model/decision-tree.link';
import { DecisionTreeModel } from '../model/decision-tree.model';

export class DecisionTreeUtility {
	// ---------- props

	static linkColor: string = 'lightblue';

	static shapeTooltip: ShapeModel = {
		background: 'whitesmoke',
		borderColor: 'lightgray',
	};
	static textTooltip: TextBlockModel = {
		font: '8pt sans-serif',
		textColor: '#000000',
	};

	static shapeDecision: ShapeModel = {
		type: EnumFigureType.ARROTONDATO,
		background: 'whitesmoke',
		borderColor: 'lightgray',
	};
	static textDecision: TextBlockModel = {
		font: '30px Roboto, sans-serif',
		textColor: '#000000',
	};

	static textButton: TextBlockModel = {
		font: '500 16px Roboto, sans-serif',
		textColor: '#000000',
	};
	static textButtonDecision1: TextBlockModel = {
		font: '500 16px Roboto, sans-serif',
		textColor: '#000000',
	};
	static textButtonDecision2: TextBlockModel = {
		font: '500 16px Roboto, sans-serif',
		textColor: '#000000',
	};

	static shapePersonality: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: 'whitesmoke',
		borderColor: 'lightgray',
	};
	static textPersonality: TextBlockModel = {
		font: '13px Roboto, sans-serif',
		textColor: '#000000',
	};

	static makeTooltipTemplate(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;
		return $(
			'ToolTip',
			{
				'Border.fill': this.shapeTooltip.background,
				'Border.stroke': this.shapeTooltip.borderColor,
			},
			$(
				go.TextBlock,
				{
					font: this.textTooltip.font,
					wrap: go.TextBlock.WrapFit,
					desiredSize: new go.Size(200, NaN),
					alignment: go.Spot.Center,
					margin: 6,
				},
				new go.Binding('text', '', (data) =>
					DecisionTreeUtility.tooltipTextConverter(data, myDiagram),
				),
			),
		);
	}

	static makeNodeDecision(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;

		return $(
			go.Node,
			'Auto',
			new go.Binding('text', 'key'),
			// define the node's outer shape, which will surround the Horizontal Panel
			$(go.Shape, this.shapeDecision.type, {
				fill: this.shapeDecision.background,
				stroke: this.shapeDecision.borderColor,
			}),
			// define a horizontal Panel to place the node's text alongside the buttons
			$(
				go.Panel,
				'Horizontal',
				$(
					go.TextBlock,
					{ font: this.textDecision.font, margin: 5 },
					new go.Binding('text', 'title'),
				),
				// define a vertical panel to place the node's two buttons one above the other
				$(
					go.Panel,
					'Vertical',
					{ defaultStretch: go.GraphObject.Fill, margin: 3 },
					$(
						'Button', // button A
						{
							name: 'ButtonA',
							click: (e, port) => DecisionTreeUtility.buttonExpandCollapse(e, port, myDiagram),
							toolTip: DecisionTreeUtility.makeTooltipTemplate(myDiagram),
						},
						new go.Binding('ButtonBorder.fill', 'buttonA', (v) => {
							return v && v.background
								? v.background
								: DecisionTreeUtility.shapeDecision.background;
						}),
						new go.Binding('_buttonFillOver', 'buttonA', (v) => {
							return v && v.backgroundOver
								? v.backgroundOver
								: v && v.background
								? v.background
								: DecisionTreeUtility.shapeDecision.background;
						}),
						new go.Binding('portId', 'buttonA', (v) => {
							return v && v.key ? v.key : '' + Math.random();
						}),
						$(
							go.TextBlock,
							{
								font: this.textButtonDecision1.font,
								name: 'TextButtonA',
								mouseOver: (e, obj) => {
									const v =
										obj.part.data && obj.part.data.buttonA ? obj.part.data.buttonA : undefined;
									obj.stroke =
										v && v.colorOver
											? v.colorOver
											: v && v.color
											? v.color
											: DecisionTreeUtility.textButtonDecision1.textColor;
								},
								mouseLeave: (e, obj) => {
									const v =
										obj.part.data && obj.part.data.buttonA ? obj.part.data.buttonA : undefined;
									obj.stroke =
										v && v.color ? v.color : DecisionTreeUtility.textButtonDecision1.textColor;
								},
							},
							new go.Binding('text', 'buttonA', (v) => {
								return v && v.title ? v.title : '';
							}),
							new go.Binding('stroke', 'buttonA', (v) => {
								return v && v.color ? v.color : DecisionTreeUtility.textButtonDecision1.textColor;
							}),
						),
					), // end button A
					$(
						'Button', // button B
						{
							name: 'ButtonB',
							click: (e, port) => DecisionTreeUtility.buttonExpandCollapse(e, port, myDiagram),
							toolTip: DecisionTreeUtility.makeTooltipTemplate(myDiagram),
						},
						new go.Binding('ButtonBorder.fill', 'buttonB', (v) => {
							return v && v.background
								? v.background
								: DecisionTreeUtility.shapeDecision.background;
						}),
						new go.Binding('_buttonFillOver', 'buttonB', (v) => {
							return v && v.backgroundOver
								? v.backgroundOver
								: v && v.background
								? v.background
								: DecisionTreeUtility.shapeDecision.background;
						}),
						new go.Binding('portId', 'buttonB', (v) => {
							return v && v.key ? v.key : '' + Math.random();
						}),
						$(
							go.TextBlock,
							{
								font: this.textButtonDecision2.font,
								name: 'TextButtonB',
								mouseOver: (e, obj) => {
									const v =
										obj.part.data && obj.part.data.buttonB ? obj.part.data.buttonB : undefined;
									obj.stroke =
										v && v.colorOver
											? v.colorOver
											: v && v.color
											? v.color
											: DecisionTreeUtility.textButtonDecision1.textColor;
								},
								mouseLeave: (e, obj) => {
									const v =
										obj.part.data && obj.part.data.buttonB ? obj.part.data.buttonB : undefined;
									obj.stroke =
										v && v.color ? v.color : DecisionTreeUtility.textButtonDecision1.textColor;
								},
							},
							new go.Binding('text', 'buttonB', (v) => {
								return v && v.title ? v.title : '';
							}),
							new go.Binding('stroke', 'buttonB', (v) => {
								return v && v.color ? v.color : DecisionTreeUtility.textButtonDecision2.textColor;
							}),
						),
					), // end button B
				), // end Vertical Panel
			), // end Horizontal Panel
		);
	}

	static makeNodePersonality(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;

		return $(
			go.Node,
			'Auto',
			new go.Binding('text', 'key'),
			$(go.Shape, this.shapePersonality.type, {
				fill: this.shapePersonality.background,
				stroke: this.shapePersonality.borderColor,
			}),
			$(
				go.TextBlock,
				{
					font: this.textPersonality.font,
					wrap: go.TextBlock.WrapFit,
					desiredSize: new go.Size(200, NaN),
					margin: 5,
				},
				new go.Binding('text', 'text'),
			),
		);
	}

	static makeComponents(tree: DecisionTreeModel[]): { nodes; links } {
		const links: DecisionTreeLink[] = [];
		let d1, d2;
		tree.forEach((el) => {
			if (el.category === 'decision') {
				d1 = tree.find((n) => el.buttonA && n.key === el.buttonA.key);
				d2 = tree.find((n) => el.buttonB && n.key === el.buttonB.key);

				if (d1) {
					links.push({
						key: el.key + '-' + el.buttonA.key,
						from: el.key,
						fromPort: el.buttonA.key,
						to: d1.key,
					});
				}
				if (d2) {
					links.push({
						key: el.key + '-' + el.buttonB.key,
						from: el.key,
						fromPort: el.buttonB.key,
						to: d2.key,
					});
				}
			}
		});
		return {
			nodes: tree,
			links: links,
		};
	}

	// ---------- functions

	// custom behavior for expanding/collapsing half of the subtree from a node
	static buttonExpandCollapse(e, port, myDiagram: go.Diagram) {
		var node = port.part;
		node.diagram.startTransaction('expand/collapse');
		var portid = port.portId;
		node.findLinksOutOf(portid).each((l) => {
			if (l.visible) {
				// collapse whole subtree recursively
				DecisionTreeUtility.collapseTree(node, portid);
			} else {
				// only expands immediate children and their links
				l.visible = true;
				var n = l.getOtherNode(node);
				if (n !== null) {
					n.location = node.getDocumentPoint(go.Spot.TopRight);
					n.visible = true;
				}
			}
		});
		myDiagram.toolManager.hideToolTip();
		node.diagram.commitTransaction('expand/collapse');
	}

	// recursive function for collapsing complete subtree
	static collapseTree(node, portid) {
		node.findLinksOutOf(portid).each((l) => {
			l.visible = false;
			var n = l.getOtherNode(node);
			if (n !== null) {
				n.visible = false;
				DecisionTreeUtility.collapseTree(n, null); // null means all links, not just for a particular portId
			}
		});
	}

	// get the text for the tooltip from the data on the object being hovered over
	static tooltipTextConverter(data: DecisionTreeModel, myDiagram: go.Diagram) {
		var str = '';
		var e = myDiagram.lastInput;
		var currobj = e.targetObject;
		if (
			currobj !== null &&
			(currobj.name === 'ButtonA' || (currobj.panel !== null && currobj.panel.name === 'ButtonA'))
		) {
			str = data.buttonA ? data.buttonA.description : '';
		} else {
			str = data.buttonB ? data.buttonB.description : '';
		}
		return str;
	}
	// --------------- utils
}
