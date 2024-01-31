import * as go from 'gojs';
import { GanttUtility } from '../utility/gantt.utility';

export class GanttLayout extends go.Layout {
	cellHeight: number;
	task: go.Diagram;

	constructor(task: go.Diagram) {
		super();
		this.cellHeight = GanttUtility.GridCellHeight;
		this.task = task;
	}

	override doLayout(coll: any) {
		coll = this.collectParts(coll);
		const diagram: any = this.diagram;
		diagram.startTransaction('Gantt Layout');
		const bars: any = [];
		this.assignTimes(diagram, bars);
		this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
		let y = this.arrangementOrigin.y;
		bars.forEach((node: any) => {
			const tasknode: any = this.task.findNodeForData(node.data);
			node.visible = tasknode.isVisible();
			node.moveTo(GanttUtility.convertStartToX(node.data.start), y);
			if (node.visible) y += this.cellHeight;
		});
		diagram.commitTransaction('Gantt Layout');
	}

	// Update node data, to make sure each node has a start and a duration
	assignTimes(diagram: any, bars: any) {
		const roots = diagram.findTreeRoots();
		roots.each((root: any) => this.walkTree(root, 0, bars));
	}

	walkTree(node: any, start: any, bars: any) {
		bars.push(node);
		const model = node.diagram.model;
		if (node.isTreeLeaf) {
			let dur = node.data.duration;
			if (dur === undefined || isNaN(dur)) {
				dur = GanttUtility.convertDaysToUnits(1); // default task length?
				model.set(node.data, 'duration', dur);
			}
			let st = node.data.start;
			if (st === undefined || isNaN(st)) {
				st = start; // use given START
				model.set(node.data, 'start', st);
			}
			return st + dur;
		} else {
			// first recurse to fill in any missing data
			node.findTreeChildrenNodes().each((n: any) => {
				start = this.walkTree(n, start, bars);
			});
			// now can calculate this non-leaf node's data
			let min = Infinity;
			let max = -Infinity;
			const colors = new go.Set();
			node.findTreeChildrenNodes().each((n: any) => {
				min = Math.min(min, n.data.start);
				max = Math.max(max, n.data.start + n.data.duration);
				if (n.data.color) colors.add(n.data.color);
			});
			model.set(node.data, 'start', min);
			model.set(node.data, 'duration', max - min);
			return max;
		}
	}
}
