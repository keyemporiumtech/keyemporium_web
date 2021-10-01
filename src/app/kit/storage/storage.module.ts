import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStorageService } from './services/application-storage.service';

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
