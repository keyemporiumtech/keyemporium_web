import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { CakeutilsModule } from './cakeutils/cakeutils.module';
import { RestModule } from '@ddc/rest';
import { CakeutilsBeModule } from './cakeutils-be/cakeutils-be.module';
import { TestApiComponent } from './components/test-api/test-api.component';
import { TestApiPaginateComponent } from './components/test-api/test-api-paginate/test-api-paginate.component';
import { TestApiUniqueComponent } from './components/test-api/test-api-unique/test-api-unique.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [TestApiComponent, TestApiPaginateComponent, TestApiUniqueComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		KitModule,
		RestModule,
		SharedModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		CakeutilsModule.forRoot(),
		CakeutilsBeModule.forRoot(),
	],
	exports: [
		CakeutilsModule,
		CakeutilsBeModule,
		TestApiComponent,
		TestApiPaginateComponent,
		TestApiUniqueComponent,
	],
})
export class ApiModule {
	static forRoot() {
		return {
			ngModule: ApiModule,
			providers: [],
		};
	}
}
