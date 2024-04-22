import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutKeyComponent } from './template/layout-key/layout-key.component';
import { HomeKeyComponent } from './pages/home-key/home-key.component';
import { Auth2faKeyComponent } from './pages/auth2fa-key/auth2fa-key.component';
import { CaptchaKeyComponent } from './pages/captcha-key/captcha-key.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutKeyComponent,
		children: [
			{ path: '', component: HomeKeyComponent },
			{
				path: 'auth2fa',
				component: Auth2faKeyComponent,
			},
			{ path: 'captcha', component: CaptchaKeyComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class KeyemporiumKeyRoutingModule {}
