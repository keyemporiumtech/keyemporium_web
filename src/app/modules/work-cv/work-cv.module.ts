import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProfessionService } from './services/profession.service';
import { ProfessionattachmentService } from './services/professionattachment.service';
import { ProfessionexperienceService } from './services/professionexperience.service';
import { ProfessionreferenceService } from './services/professionreference.service';
import { ProfessionroleService } from './services/professionrole.service';
import { ProfessionschoolService } from './services/professionschool.service';
import { ProfessionskillService } from './services/professionskill.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		KitModule,
		SharedModule,
		ApiModule,
	],
	exports: [],
})
export class WorkCvModule {
	static forRoot() {
		return {
			ngModule: WorkCvModule,
			providers: [
				ProfessionService,
				ProfessionattachmentService,
				ProfessionexperienceService,
				ProfessionreferenceService,
				ProfessionroleService,
				ProfessionschoolService,
				ProfessionskillService,
			],
		};
	}
}
