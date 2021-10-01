import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CakeutilsModule } from '../cakeutils/cakeutils.module';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { TestfkService } from './services/testfk.service';
import { TypologicalService } from './services/typological.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, CakeutilsModule, HttpClientModule, KitModule],
})
export class CakeutilsBeModule {
	static forRoot() {
		return {
			ngModule: CakeutilsBeModule,
			providers: [TestfkService, TypologicalService],
		};
	}
}
