import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class StorageModule {
	static forRoot() {
		return {
			ngModule: StorageModule,
			providers: [],
		};
	}
}
