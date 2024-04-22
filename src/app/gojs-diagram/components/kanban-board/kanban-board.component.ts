import { Component, Input } from '@angular/core';
import { KanbanBoardTemplate } from '../../builder/kanban-board/kanban-board.template';
import { KanbanBoardModel } from '../../builder/kanban-board/model/kanban-board.model';
import { KanbanBoardUtility } from '../../builder/kanban-board/utility/kanban-board.utility';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-kanban-board',
	templateUrl: './kanban-board.component.html',
	styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent extends GojsDiagramComponent<
	KanbanBoardTemplate,
	KanbanBoardModel
> {
	@Input() flgLegendaStatus: boolean = true;
	@Input() textStatus: string;
	@Input() flgLegendaButtons: boolean = true;

	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return this.defaultModel();
	}
	override instanceBuilder(): KanbanBoardTemplate {
		return new KanbanBoardTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {
		if (this.flgLegendaStatus) {
			diagram.add(KanbanBoardUtility.makeLegendaStatus(this.textStatus));
		}
		if (this.flgLegendaButtons) {
			diagram.add(KanbanBoardUtility.makeLegendaAdd(diagram));
		}
	}

	override buildDiagramModel(diagram: go.Diagram): void {
		KanbanBoardUtility.setInfo(diagram.model.nodeDataArray as KanbanBoardModel[]);
		// KanbanBoardUtility.relayoutDiagram(diagram);
	}
}
