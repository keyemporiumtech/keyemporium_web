import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadAppComponent } from './init/components/load-app/load-app.component';

const routes: Routes = [
	{
		path: '',
		component: LoadAppComponent,
		children: [
			{
				path: '',
				redirectTo: 'app',
				pathMatch: 'full',
			},
			{
				path: 'app',
				loadChildren: './application-public/application-public.module#ApplicationPublicModule',
			},
			{
				path: 'reserve',
				loadChildren: './application-reserve/application-reserve.module#ApplicationReserveModule',
			},
			{
				path: 'commons',
				loadChildren: './commons-pages/commons-pages.module#CommonsPagesModule',
			},
			{
				path: 'wiki',
				loadChildren: './wiki-test/wiki-test.module#WikiTestModule',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
