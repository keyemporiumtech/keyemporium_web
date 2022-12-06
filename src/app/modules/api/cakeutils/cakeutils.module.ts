import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class CakeutilsModule {
	static forRoot() {
		return {
			ngModule: CakeutilsModule,
			providers: [],
		};
	}
}
