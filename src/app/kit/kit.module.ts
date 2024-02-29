import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChartsModule } from './charts/charts.module';
import { ConfigModule } from './config/config.module';
import { EmojiModule } from './emoji/emoji.module';
import { FilemanagerModule } from './filemanager/filemanager.module';
import { HtmlModule } from './html/html.module';
import { LocaleModule } from './locale/locale.module';
import { LoggerModule } from './logger/logger.module';
import { MessageModule } from './message/message.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { QuillEditorModule } from './quill-editor/quill-editor.module';
import { RoutingModule } from './routing/routing.module';
import { StorageModule } from './storage/storage.module';
import { TimingModule } from './timing/timing.module';
import { TranslationModule } from './translation/translation.module';
import { TreeHtmlModule } from './tree-html/tree-html.module';
import { ValidatorsModule } from './validators/validators.module';
import { SeoModule } from './seo/seo.module';
import { GRecaptchaModule } from './g-recaptcha/g-recaptcha.module';

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
		ChartsModule.forRoot(),
		QuillEditorModule.forRoot(),
		ChatbotModule.forRoot(),
		SeoModule.forRoot(),
		GRecaptchaModule.forRoot(),
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
		ChartsModule,
		QuillEditorModule,
		ChatbotModule,
		SeoModule,
		GRecaptchaModule,
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
