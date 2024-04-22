import * as go from 'gojs';

export class GanttUtility {
	static GridCellHeight = 20; // document units; cannot be changed dynamically
	static GridCellWidth = 12; // document units per day; this can be modified -- see rescale()
	static TimelineHeight = 24; // document units; cannot be changed dynamically

	static MsPerDay = 24 * 60 * 60 * 1000;
	static StartDate = new Date();
	static TREEWIDTH = 160;

	static changingView = false;

	static convertDaysToUnits(n: any) {
		return n;
	}

	static convertUnitsToDays(n: any) {
		return n;
	}

	static convertStartToX(start: any) {
		return GanttUtility.convertUnitsToDays(start) * GanttUtility.GridCellWidth;
	}

	static convertXToStart(x: any, node?: any) {
		return GanttUtility.convertDaysToUnits(x / GanttUtility.GridCellWidth);
	}

	// these four functions are used in TwoWay Bindings on the task/node template
	static convertDurationToW(duration: any) {
		return GanttUtility.convertUnitsToDays(duration) * GanttUtility.GridCellWidth;
	}

	static convertWToDuration(w: any) {
		return GanttUtility.convertDaysToUnits(w / GanttUtility.GridCellWidth);
	}

	static convertStartToPosition(start: any, node: any) {
		return new go.Point(GanttUtility.convertStartToX(start), node.position.y || 0);
	}

	static convertPositionToStart(pos: any) {
		return GanttUtility.convertXToStart(pos.x);
	}

	static valueToText(n: any) {
		// N document units after StartDate
		const startDate = GanttUtility.StartDate;
		const startDateMs = startDate.getTime() + startDate.getTimezoneOffset() * 60000;
		const date = new Date(startDateMs + (n / GanttUtility.GridCellWidth) * GanttUtility.MsPerDay);
		return date.toLocaleDateString();
	}

	static dateToValue(d: any) {
		// D is a Date
		const startDate = GanttUtility.StartDate;
		const startDateMs = startDate.getTime() + startDate.getTimezoneOffset() * 60000;
		const dateInMs = d.getTime() + d.getTimezoneOffset() * 60000;
		const msSinceStart = dateInMs - startDateMs;
		return (msSinceStart / GanttUtility.MsPerDay) * GanttUtility.GridCellWidth;
	}

	static updateNodeWidths(task: go.Diagram, taskHeader: go.Part, width: any) {
		let minx = Infinity;
		task.nodes.each((n) => {
			if (n instanceof go.Node) {
				minx = Math.min(minx, n.actualBounds.x);
			}
		});
		if (minx === Infinity) return;
		const right = minx + width;
		task.nodes.each((n) => {
			if (n instanceof go.Node) {
				n.width = Math.max(0, right - n.actualBounds.x);
				n.getColumnDefinition(1).width = GanttUtility.TREEWIDTH - n.actualBounds.x;
			}
		});
		taskHeader.getColumnDefinition(1).width = GanttUtility.TREEWIDTH - taskHeader.actualBounds.x;
	}
}
