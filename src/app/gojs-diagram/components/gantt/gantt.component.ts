import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';
import { GanttTemplate } from '../../builder/gantt/gantt.template';
import { GanttModel } from '../../builder/gantt/model/gantt.model';
import { GanttUtility } from '../../builder/gantt/utility/gantt.utility';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-gantt',
	templateUrl: './gantt.component.html',
	styleUrls: ['./gantt.component.scss'],
})
export class GanttComponent
	extends GojsDiagramComponent<GanttTemplate, GanttModel>
	implements OnInit
{
	taskId: string;
	dataInizio: Date;

	ngOnInit(): void {
		super.ngOnInit();
		if (this.divId) {
			this.taskId = this.divId + '_task';
		}
	}
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return this.defaultModel();
	}
	override instanceBuilder(): GanttTemplate {
		return new GanttTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}

	override buildDiagramModel(diagram: go.Diagram): void {
		this.builder.myTask.model = this.getModel();
		this.dataInizio = GanttUtility.StartDate;
	}
}
