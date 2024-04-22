import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
				loadChildren: () =>
					import('./application-public/application-public.module').then(
						(m) => m.ApplicationPublicModule,
					),
			},
			{
				path: 'reserve',
				loadChildren: () =>
					import('./application-reserve/application-reserve.module').then(
						(m) => m.ApplicationReserveModule,
					),
			},
			{
				path: 'keys',
				loadChildren: () =>
					import('./keyemporium-key/keyemporium-key.module').then((m) => m.KeyemporiumKeyModule),
			},
			{
				path: 'commons',
				loadChildren: () =>
					import('./commons-pages/commons-pages.module').then((m) => m.CommonsPagesModule),
			},
			{
				path: 'wiki',
				loadChildren: () => import('./wiki-test/wiki-test.module').then((m) => m.WikiTestModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
