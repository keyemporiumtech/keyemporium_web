import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitModule } from '@ddc/kit';
import { RestModule } from '@ddc/rest';
import { SharedModule } from '../shared/shared.module';
import { InitService } from './services/init.service';
import { InitGuard } from './services/init.guard';
import { LoadAppComponent } from './components/load-app/load-app.component';
import { InitRoutingModule } from './init-routing.module';
import { ApiInitService } from './services/api-init.service';

@NgModule({
	declarations: [LoadAppComponent],
	imports: [CommonModule, InitRoutingModule, KitModule, RestModule, SharedModule],
	exports: [LoadAppComponent],
})
export class InitModule {
	static forRoot() {
		return {
			ngModule: InitModule,
			providers: [InitService, InitGuard, ApiInitService],
		};
	}
}
