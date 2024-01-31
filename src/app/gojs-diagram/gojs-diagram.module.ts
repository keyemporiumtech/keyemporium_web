import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitModule } from '@ddc/kit';
import { TranslateModule } from '@ngx-translate/core';
import { GojsAngularModule } from 'gojs-angular';
import { DecisionTreeComponent } from './components/decision-tree/decision-tree.component';
import { DoubleTreeComponent } from './components/double-tree/double-tree.component';
import { FamilyTreeComponent } from './components/family-tree/family-tree.component';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { GenogramComponent } from './components/genogram/genogram.component';
import { GojsModalOperationsComponent } from './components/gojs-modal-operations/gojs-modal-operations.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { OrgTreeComponent } from './components/org-tree/org-tree.component';
import { SequenceComponent } from './components/sequence/sequence.component';
import { TournmentComponent } from './components/tournment/tournment.component';
import { UmlComponent } from './components/uml/uml.component';

@NgModule({
	declarations: [
		GojsModalOperationsComponent,
		FamilyTreeComponent,
		GanttComponent,
		KanbanBoardComponent,
		OrgTreeComponent,
		FlowchartComponent,
		SequenceComponent,
		GenogramComponent,
		UmlComponent,
		DoubleTreeComponent,
		TournmentComponent,
		DecisionTreeComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		GojsAngularModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// libs
		KitModule,
	],
	exports: [
		GojsModalOperationsComponent,
		FamilyTreeComponent,
		GanttComponent,
		KanbanBoardComponent,
		OrgTreeComponent,
		FlowchartComponent,
		SequenceComponent,
		GenogramComponent,
		UmlComponent,
		DoubleTreeComponent,
		TournmentComponent,
		DecisionTreeComponent,
	],
})
export class GojsDiagramModule {
	static forRoot() {
		// extensions
		// FigureBuilder.run();
		return {
			ngModule: GojsDiagramModule,
			providers: [],
		};
	}
}
