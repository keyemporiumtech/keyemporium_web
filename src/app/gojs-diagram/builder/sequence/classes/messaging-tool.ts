import * as go from 'gojs';
import { SequenceUtility } from '../utility/sequence.utility';
import { MessageLink } from './message-link';

// A custom LinkingTool that fixes the "time" (i.e. the Y coordinate)
// for both the temporaryLink and the actual newly created Link
export class MessagingTool extends go.LinkingTool {
	constructor() {
		super();

		// Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
		// For details, see https://gojs.net/latest/intro/buildingObjects.html
		const $ = go.GraphObject.make;
		this.temporaryLink = $(
			MessageLink,
			$(go.Shape, 'Rectangle', { stroke: 'magenta', strokeWidth: 2 }),
			$(go.Shape, { toArrow: 'OpenTriangle', stroke: 'magenta' }),
		);
	}

	doActivate() {
		super.doActivate();
		const time = SequenceUtility.convertYToTime(this.diagram.firstInput.documentPoint.y);
		(this.temporaryLink as any).time = Math.ceil(time); // round up to an integer value
	}

	insertLink(fromnode, fromport, tonode, toport) {
		const newlink = super.insertLink(fromnode, fromport, tonode, toport);
		if (newlink !== null) {
			const model = this.diagram.model;
			// specify the time of the message
			const start = (this.temporaryLink as any).time;
			const duration = 1;
			newlink.data.time = start;
			model.setDataProperty(newlink.data, 'text', 'msg');
			// and create a new Activity node data in the "to" group data
			const newact = {
				group: newlink.data.to,
				start: start,
				duration: duration,
			};
			model.addNodeData(newact);
			// now make sure all Lifelines are long enough
			SequenceUtility.ensureLifelineHeights(this.diagram);
		}
		return newlink;
	}
}
// end MessagingTool
