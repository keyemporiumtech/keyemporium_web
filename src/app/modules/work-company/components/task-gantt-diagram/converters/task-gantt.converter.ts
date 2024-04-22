import { DateModel } from '@ddc/kit';
import { GanttModel, GojsDiagramModel, GojsLinkDataModel } from 'gojs-diagram';
import { ProjecttaskModel } from '../../../models/projecttask.model';

export class TaskGanttConverter {
	convertToDiagram(list: ProjecttaskModel[], dtaStart: DateModel): GojsDiagramModel {
		// TODO: IMPLEMENTARE FATHER

		const ganttList: GanttModel[] = [];
		const linkList: GojsLinkDataModel[] = [];
		let link: GojsLinkDataModel;
		let gantt: GanttModel;

		gantt = {
			key: 'n0',
			text: 'Project', // TODO: Mettere le informazioni di progetto
		};

		ganttList.push(gantt);

		list.forEach((el) => {
			gantt = {
				key: el.id,
				text: el.title,
				color: '#F1E904',
				start: this.calcDiff(dtaStart, el.dtainitModel),
				duration: this.calcDiff(el.dtainitModel, el.dtaendModel),
			};
			ganttList.push(gantt);

			link = {
				key: 'n0_' + el.id,
				from: 'n0',
				to: el.id,
			};

			linkList.push(link);
		});

		return { diagramNodeData: ganttList, diagramLinkData: linkList };
	}

	private calcDiff(dta1: DateModel, dta2: DateModel): number {
		if (dta1 && dta2) {
			return dta2.date.diff(dta1.date, 'days');
		}
		return 0;
	}
}
