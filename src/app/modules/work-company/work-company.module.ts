import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitModule } from '@ddc/kit';
import { TranslateModule } from '@ngx-translate/core';
import { GojsDiagramModule } from '../../gojs-diagram';
import { SharedModule } from '../../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { ActivityTreeDiagramComponent } from './components/activity-tree-diagram/activity-tree-diagram.component';
import { ActivityTreeFormComponent } from './components/activity-tree-diagram/activity-tree-form/activity-tree-form.component';
import { ActivityTreeMakerComponent } from './components/activity-tree-maker/activity-tree-maker.component';
import { ActivityTreeMkFormComponent } from './components/activity-tree-maker/activity-tree-mk-form/activity-tree-mk-form.component';
import { JsonSaveFormComponent } from './components/commons/json-save-form/json-save-form.component';
import { CuSequenceDiagramComponent } from './components/cu-sequence-diagram/cu-sequence-diagram.component';
import { TaskGanttDiagramComponent } from './components/task-gantt-diagram/task-gantt-diagram.component';
import { TestActivityTreeDiagramComponent } from './components/test-work-company/test-activity-tree-diagram/test-activity-tree-diagram.component';
import { TestActivityTreeMakerComponent } from './components/test-work-company/test-activity-tree-maker/test-activity-tree-maker.component';
import { TestCuSequenceDiagramComponent } from './components/test-work-company/test-cu-sequence-diagram/test-cu-sequence-diagram.component';
import { TestTaskGanttDiagramComponent } from './components/test-work-company/test-task-gantt-diagram/test-task-gantt-diagram.component';
import { TestWorkCompanyComponent } from './components/test-work-company/test-work-company.component';
import { ActivityprojectService } from './services/activityproject.service';
import { ActivityuserService } from './services/activityuser.service';
import { ProjecttaskService } from './services/projecttask.service';
import { ProjectuserService } from './services/projectuser.service';
import { TaskusecaseService } from './services/taskusecase.service';
import { UsecaseoperationService } from './services/usecaseoperation.service';
import { WorkexperienceService } from './services/workexperience.service';
import { WorkexperiencecompanyService } from './services/workexperiencecompany.service';
import { WorkexperienceroleService } from './services/workexperiencerole.service';
import { WorkexperienceskillService } from './services/workexperienceskill.service';
import { WorkroleService } from './services/workrole.service';
import { WorkskillService } from './services/workskill.service';

@NgModule({
	declarations: [
		ActivityTreeDiagramComponent,
		ActivityTreeFormComponent,
		TestWorkCompanyComponent,
		TestActivityTreeDiagramComponent,
		CuSequenceDiagramComponent,
		TestCuSequenceDiagramComponent,
		TaskGanttDiagramComponent,
		TestTaskGanttDiagramComponent,
		ActivityTreeMakerComponent,
		ActivityTreeMkFormComponent,
		TestActivityTreeMakerComponent,
		JsonSaveFormComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		KitModule,
		SharedModule,
		ApiModule,
		GojsDiagramModule,
	],
	exports: [
		ActivityTreeDiagramComponent,
		ActivityTreeFormComponent,
		TestWorkCompanyComponent,
		TestActivityTreeDiagramComponent,
		CuSequenceDiagramComponent,
		TestCuSequenceDiagramComponent,
		TaskGanttDiagramComponent,
		TestTaskGanttDiagramComponent,
		ActivityTreeMakerComponent,
		ActivityTreeMkFormComponent,
		TestActivityTreeMakerComponent,
		JsonSaveFormComponent,
	],
})
export class WorkCompanyModule {
	static forRoot() {
		return {
			ngModule: WorkCompanyModule,
			providers: [
				ActivityuserService,
				WorkexperienceService,
				WorkexperiencecompanyService,
				WorkexperienceroleService,
				WorkexperienceskillService,
				WorkroleService,
				WorkskillService,
				ActivityprojectService,
				ProjecttaskService,
				ProjectuserService,
				TaskusecaseService,
				TaskusecaseService,
				UsecaseoperationService,
			],
		};
	}
}
