import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCommonsPagesComponent } from './components/test-commons-pages/test-commons-pages.component';
import { TestGojsDiagramComponent } from './components/test-gojs-diagram/test-gojs-diagram.component';
import { TestKitComponent } from './components/test-kit/test-kit.component';
import { TestLayoutComponent } from './components/test-layout/test-layout.component';
import { TestRestComponent } from './components/test-rest/test-rest.component';
import { TestSharedComponent } from './components/test-shared/test-shared.component';
import { TestHomeComponent } from './pages/test-home/test-home.component';
import { TestModulesComponent } from './pages/test-modules/test-modules.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'test-home',
		pathMatch: 'full',
	},
	{ path: 'test-home', component: TestHomeComponent },
	{ path: 'test-modules', component: TestModulesComponent },
	{ path: 'layout', component: TestLayoutComponent },
	{ path: 'commons-pages', component: TestCommonsPagesComponent },
	{ path: 'shared', component: TestSharedComponent },
	{ path: 'test-kit', component: TestKitComponent },
	{ path: 'test-rest', component: TestRestComponent },
	{ path: 'test-gojs-diagram', component: TestGojsDiagramComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WikiTestRoutingModule {}
