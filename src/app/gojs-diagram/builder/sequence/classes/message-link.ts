// a custom routed Link
import * as go from 'gojs';
import { SequenceUtility } from '../utility/sequence.utility';

export class MessageLink extends go.Link {
	time: number;
	constructor() {
		super();
		this.time = 0; // use this "time" value when this is the temporaryLink
	}

	getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {
		const p = port.getDocumentPoint(go.Spot.Center);
		const r = port.getDocumentBounds();
		const op = otherport.getDocumentPoint(go.Spot.Center);

		const data = this.data;
		const time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property

		const aw = this.findActivityWidth(node, time);
		const x = op.x > p.x ? p.x + aw / 2 : p.x - aw / 2;
		const y = SequenceUtility.convertTimeToY(time);
		return new go.Point(x, y);
	}

	findActivityWidth(node, time) {
		let aw = SequenceUtility.ActivityWidth;
		if (node instanceof go.Group) {
			// see if there is an Activity Node at this point -- if not, connect the link directly with the Group's lifeline
			if (
				!node.memberParts.any((mem) => {
					const act = mem.data;
					return act !== null && act.start <= time && time <= act.start + act.duration;
				})
			) {
				aw = 0;
			}
		}
		return aw;
	}

	getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {
		const p = port.getDocumentPoint(go.Spot.Center);
		const op = otherport.getDocumentPoint(go.Spot.Center);
		const right = op.x > p.x;
		return right ? 0 : 180;
	}

	computePoints() {
		if (this.fromNode === this.toNode) {
			// also handle a reflexive link as a simple orthogonal loop
			const data = this.data;
			const time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property
			const p = this.fromNode.port.getDocumentPoint(go.Spot.Center);
			const aw = this.findActivityWidth(this.fromNode, time);

			const x = p.x + aw / 2;
			const y = SequenceUtility.convertTimeToY(time);
			this.clearPoints();
			this.addPoint(new go.Point(x, y));
			this.addPoint(new go.Point(x + 50, y));
			this.addPoint(new go.Point(x + 50, y + 5));
			this.addPoint(new go.Point(x, y + 5));
			return true;
		} else {
			return super.computePoints();
		}
	}
}
// end MessageLink
