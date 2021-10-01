import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivityuserService } from './services/activityuser.service';
import { WorkexperienceService } from './services/workexperience.service';
import { WorkexperiencecompanyService } from './services/workexperiencecompany.service';
import { WorkexperienceroleService } from './services/workexperiencerole.service';
import { WorkexperienceskillService } from './services/workexperienceskill.service';
import { WorkroleService } from './services/workrole.service';
import { WorkskillService } from './services/workskill.service';

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
			],
		};
	}
}
