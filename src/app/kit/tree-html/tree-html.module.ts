import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from '@circlon/angular-tree-component';
import { TreeHtmlComponent } from './components/tree-html/tree-html.component';

@NgModule({
	declarations: [TreeHtmlComponent],
	imports: [CommonModule, TreeModule],
	exports: [TreeHtmlComponent],
})
export class TreeHtmlModule {
	static forRoot() {
		return {
			ngModule: TreeHtmlModule,
			providers: [],
		};
	}
}
