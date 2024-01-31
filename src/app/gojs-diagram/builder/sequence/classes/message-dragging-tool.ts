import * as go from 'gojs';
import { SequenceUtility } from '../utility/sequence.utility';
// A custom DraggingTool that supports dragging any number of MessageLinks up and down --
// changing their data.time value.
export class MessageDraggingTool extends go.DraggingTool {
	// override the standard behavior to include all selected Links,
	// even if not connected with any selected Nodes
	computeEffectiveCollection(parts, options) {
		const result = super.computeEffectiveCollection(parts, options);
		// add a dummy Node so that the user can select only Links and move them all
		result.add(new go.Node(), new go.DraggingInfo(new go.Point()));
		// normally this method removes any links not connected to selected nodes;
		// we have to add them back so that they are included in the "parts" argument to moveParts
		parts.each((part) => {
			if (part instanceof go.Link) {
				result.add(part, new go.DraggingInfo(part.getPoint(0).copy()));
			}
		});
		return result;
	}

	// override to allow dragging when the selection only includes Links
	mayMove() {
		return !this.diagram.isReadOnly && this.diagram.allowMove;
	}

	// override to move Links (which are all assumed to be MessageLinks) by
	// updating their Link.data.time property so that their link routes will
	// have the correct vertical position
	moveParts(parts, offset, check) {
		super.moveParts(parts, offset, check);
		const it = parts.iterator;
		while (it.next()) {
			if (it.key instanceof go.Link) {
				const link = it.key;
				const startY = it.value.point.y; // DraggingInfo.point.y
				let y = startY + offset.y; // determine new Y coordinate value for this link
				const cellY = this.gridSnapCellSize.height;
				y = Math.round(y / cellY) * cellY; // snap to multiple of gridSnapCellSize.height
				const t = Math.max(0, SequenceUtility.convertYToTime(y));
				link.diagram.model.set(link.data, 'time', t);
				link.invalidateRoute();
			}
		}
	}
}
// end MessageDraggingTool
