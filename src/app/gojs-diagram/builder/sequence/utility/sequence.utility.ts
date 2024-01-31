import * as go from 'gojs';
import { LinkModel } from '../../../core/model/link.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { SequenceGroupModel } from '../model/sequence-group.model';
import { SequenceModel } from '../model/sequence.model';
export class SequenceUtility {
	// some parameters
	static LinePrefix = 20; // vertical starting point in document for all Messages and Activations
	static LineSuffix = 30; // vertical length beyond the last message time
	static MessageSpacing = 20; // vertical distance between Messages at different steps
	static ActivityWidth = 10; // width of each vertical activity bar
	static ActivityStart = 5; // height before start message time
	static ActivityEnd = 5; // height beyond end message time

	// props
	static shapeGroup: ShapeModel = {
		type: EnumFigureType.ARROTONDATO,
		background: '#bbdefb',
	};
	static textStyleGroup: TextBlockModel = {
		font: '400 10pt Source Sans Pro, sans-serif',
	};

	static shapeNode: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: 'white',
		borderColor: 'black',
	};

	static linkStyle: LinkModel = {
		font: '400 9pt Source Sans Pro, sans-serif',
		linkColor: 'gray',
		arrowType: 'OpenTriangle',
	};

	static resizeColor: string = 'yellow';

	static makeGroupTemplate() {
		const $ = go.GraphObject.make;
		return $(
			go.Group,
			'Vertical',
			{
				locationSpot: go.Spot.Bottom,
				locationObjectName: 'HEADER',
				minLocation: new go.Point(0, 0),
				maxLocation: new go.Point(9999, 0),
				selectionObjectName: 'HEADER',
			},
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
			$(
				go.Panel,
				'Auto',
				{ name: 'HEADER' },
				$(go.Shape, SequenceUtility.shapeGroup.type, {
					fill: $(go.Brush, 'Linear', {
						0: SequenceUtility.shapeGroup.background,
						1: go.Brush.darkenBy(SequenceUtility.shapeGroup.background, 0.1),
					}),
					stroke: null,
				}),
				$(
					go.TextBlock,
					{
						margin: 5,
						font: SequenceUtility.textStyleGroup.font,
					},
					new go.Binding('text', 'text'),
				),
			),
			$(
				go.Shape,
				{
					figure: 'LineV',
					fill: null,
					stroke: SequenceUtility.linkStyle.linkColor,
					strokeDashArray: [3, 3],
					width: 1,
					alignment: go.Spot.Center,
					portId: '',
					fromLinkable: true,
					fromLinkableDuplicates: true,
					toLinkable: true,
					toLinkableDuplicates: true,
					cursor: 'pointer',
				},
				new go.Binding('height', 'duration', SequenceUtility.computeLifelineHeight),
			),
		);
	}

	static makeNodeTemplate(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;

		return $(
			go.Node,
			{
				locationSpot: go.Spot.Top,
				locationObjectName: 'SHAPE',
				minLocation: new go.Point(NaN, SequenceUtility.LinePrefix - SequenceUtility.ActivityStart),
				maxLocation: new go.Point(NaN, 19999),
				selectionObjectName: 'SHAPE',
				resizable: true,
				resizeObjectName: 'SHAPE',
				resizeAdornmentTemplate: $(
					go.Adornment,
					'Spot',
					$(go.Placeholder),
					$(
						go.Shape, // only a bottom resize handle
						{
							alignment: go.Spot.Bottom,
							cursor: 'col-resize',
							desiredSize: new go.Size(6, 6),
							fill: SequenceUtility.resizeColor,
						},
					),
				),
			},
			new go.Binding('location', '', (act) =>
				SequenceUtility.computeActivityLocation(act, myDiagram),
			).makeTwoWay((loc, act) => SequenceUtility.backComputeActivityLocation(loc, act, myDiagram)),
			$(
				go.Shape,
				SequenceUtility.shapeNode.type,
				{
					name: 'SHAPE',
					fill: SequenceUtility.shapeNode.background,
					stroke: SequenceUtility.shapeNode.borderColor,
					width: SequenceUtility.ActivityWidth,
					// allow Activities to be resized down to 1/4 of a time unit
					minSize: new go.Size(
						SequenceUtility.ActivityWidth,
						SequenceUtility.computeActivityHeight(0.25),
					),
				},
				new go.Binding('height', 'duration', SequenceUtility.computeActivityHeight).makeTwoWay(
					SequenceUtility.backComputeActivityHeight,
				),
			),
		);
	}

	static makeComponents(
		groups: SequenceGroupModel[],
		sequences: SequenceModel[],
	): { nodes; links } {
		const sequencesDef: any[] = [];
		const linksDef: any[] = [];
		let entity: any;
		let link: any;

		sequences.forEach((el) => {
			entity = {
				group: el.toGroup,
				start: el.init,
				duration: SequenceUtility.calcDuration(el, sequences),
			};

			link = {
				from: el.fromGroup,
				to: el.toGroup,
				text: el.text,
				time: el.init,
			};
			sequencesDef.push(entity);
			linksDef.push(link);
		});

		let durationTot: number = 0;

		sequencesDef.forEach((el) => {
			durationTot += el.duration;
		});

		// groups
		const groupsDef: any = [];

		let group;
		let location: number = 0;
		groups.forEach((el) => {
			group = {
				key: el.key,
				isGroup: true,
				loc: location + ' 0',
				text: el.text,
				duration: durationTot,
			};
			location += 100;
			groupsDef.push(group);
		});

		return {
			nodes: [...groupsDef, ...sequencesDef],
			links: linksDef,
		};
	}

	static calcDuration(sequence: SequenceModel, sequences: SequenceModel[]) {
		let lastResendNode: SequenceModel;
		let current: SequenceModel;
		for (let i = 0; i < sequences.length; i++) {
			current = sequences[i];
			if (current.init > sequence.init) {
				if (current.fromGroup === sequence.toGroup) {
					lastResendNode = current;
				}
				if (current.toGroup === sequence.toGroup && lastResendNode) {
					return lastResendNode.init - sequence.init;
				} else if (current.toGroup === sequence.toGroup && !lastResendNode) {
					return 1;
				}
			}
		}

		if (lastResendNode) {
			return lastResendNode.init - sequence.init;
		}
		return 1;
	}

	// --- utils

	static ensureLifelineHeights(myDiagram: go.Diagram, e?: any) {
		// iterate over all Activities (ignore Groups)
		const arr = myDiagram.model.nodeDataArray;
		let max = -1;
		for (let i = 0; i < arr.length; i++) {
			const act = arr[i];
			if (act.isGroup) continue;
			max = Math.max(max, act.start + act.duration);
		}
		if (max > 0) {
			// now iterate over only Groups
			for (let i = 0; i < arr.length; i++) {
				const gr = arr[i];
				if (!gr.isGroup) continue;
				if (max > gr.duration) {
					// this only extends, never shrinks
					myDiagram.model.setDataProperty(gr, 'duration', max);
				}
			}
		}
	}

	static computeLifelineHeight(duration) {
		return (
			SequenceUtility.LinePrefix +
			duration * SequenceUtility.MessageSpacing +
			SequenceUtility.LineSuffix
		);
	}

	static computeActivityLocation(act, myDiagram: go.Diagram) {
		const groupdata = myDiagram.model.findNodeDataForKey(act.group);
		if (groupdata === null) return new go.Point();
		// get location of Lifeline's starting point
		const grouploc = go.Point.parse(groupdata.loc);
		return new go.Point(
			grouploc.x,
			SequenceUtility.convertTimeToY(act.start) - SequenceUtility.ActivityStart,
		);
	}
	static backComputeActivityLocation(loc, act, myDiagram: go.Diagram) {
		myDiagram.model.setDataProperty(
			act,
			'start',
			SequenceUtility.convertYToTime(loc.y + SequenceUtility.ActivityStart),
		);
	}

	static computeActivityHeight(duration) {
		return (
			SequenceUtility.ActivityStart +
			duration * SequenceUtility.MessageSpacing +
			SequenceUtility.ActivityEnd
		);
	}
	static backComputeActivityHeight(height) {
		return (
			(height - SequenceUtility.ActivityStart - SequenceUtility.ActivityEnd) /
			SequenceUtility.MessageSpacing
		);
	}

	// time is just an abstract small non-negative integer
	// here we map between an abstract time and a vertical position
	static convertTimeToY(t) {
		return t * SequenceUtility.MessageSpacing + SequenceUtility.LinePrefix;
	}
	static convertYToTime(y) {
		return (y - SequenceUtility.LinePrefix) / SequenceUtility.MessageSpacing;
	}
}
