import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPublicComponent } from './template/layout-public/layout-public.component';
import { HomePublicComponent } from './pages/home-public/home-public.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmLoginComponent } from './pages/confirm-login/confirm-login.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutPublicComponent,
		children: [
			{ path: '', component: HomePublicComponent },
			{
				path: 'login',
				component: LoginComponent,
			},
			{ path: 'confirm_login', component: ConfirmLoginComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApplicationPublicRoutingModule {}
