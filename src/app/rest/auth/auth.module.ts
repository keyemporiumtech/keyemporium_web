import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class AuthModule {
	static forRoot() {
		return {
			ngModule: AuthModule,
			providers: [],
		};
	}
}
