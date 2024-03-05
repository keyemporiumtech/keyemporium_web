import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilePageComponent } from '../shared/pages/file-page/file-page.component';
import { MessagePageComponent } from '../shared/pages/message-page/message-page.component';
import { ReloadPageComponent } from '../shared/pages/reload-page/reload-page.component';
import { CookiePageComponent } from '../shared/pages/cookie-page/cookie-page.component';
import { Auth2faPageComponent } from '../modules/authentication/pages/auth2fa-page/auth2fa-page.component';

const routes: Routes = [
	{ path: 'reload', component: ReloadPageComponent },
	{ path: 'message', component: MessagePageComponent },
	{ path: 'file/:page', component: FilePageComponent },
	{ path: 'cookies', component: CookiePageComponent },
	{ path: 'keys', component: Auth2faPageComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CommonsPagesRoutingModule {}
