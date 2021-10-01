import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimingModule } from './timing/timing.module';
import { ConfigModule } from './config/config.module';
import { LocaleModule } from './locale/locale.module';
import { StorageModule } from './storage/storage.module';
import { TranslationModule } from './translation/translation.module';
import { LoggerModule } from './logger/logger.module';
import { RoutingModule } from './routing/routing.module';
import { MessageModule } from './message/message.module';
import { EmojiModule } from './emoji/emoji.module';
import { HtmlModule } from './html/html.module';
import { FilemanagerModule } from './filemanager/filemanager.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { TreeHtmlModule } from './tree-html/tree-html.module';
import { ValidatorsModule } from './validators/validators.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// libs
		ConfigModule.forRoot(),
		StorageModule.forRoot(),
		TimingModule.forRoot(),
		TranslationModule.forRoot(),
		LoggerModule.forRoot(),
		RoutingModule.forRoot(),
		LocaleModule.forRoot(),
		MessageModule.forRoot(),
		EmojiModule.forRoot(),
		HtmlModule.forRoot(),
		FilemanagerModule.forRoot(),
		QrcodeModule.forRoot(),
		TreeHtmlModule.forRoot(),
		ValidatorsModule.forRoot(),
	],
	exports: [
		ConfigModule,
		StorageModule,
		TimingModule,
		TranslationModule,
		LoggerModule,
		RoutingModule,
		LocaleModule,
		MessageModule,
		EmojiModule,
		HtmlModule,
		FilemanagerModule,
		QrcodeModule,
		TreeHtmlModule,
		ValidatorsModule,
	],
})
export class KitModule {
	static forRoot() {
		return {
			ngModule: KitModule,
			providers: [],
		};
	}
}
