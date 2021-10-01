import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CommonsPagesRoutingModule } from './commons-pages-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, CommonsPagesRoutingModule, SharedModule],
})
export class CommonsPagesModule {
	static forRoot() {
		return {
			ngModule: CommonsPagesModule,
			providers: [],
		};
	}
}
