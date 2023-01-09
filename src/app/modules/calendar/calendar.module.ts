import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EventService } from './services/event.service';
import { TestCalendarComponent } from './components/test-calendar/test-calendar.component';
import { TestEventUniqueComponent } from './components/test-calendar/test-event-unique/test-event-unique.component';
import { TestEventPaginateComponent } from './components/test-calendar/test-event-paginate/test-event-paginate.component';
import { EventattachmentService } from './services/eventattachment.service';
import { EventreferenceService } from './services/eventreference.service';

@NgModule({
	declarations: [TestCalendarComponent, TestEventUniqueComponent, TestEventPaginateComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		KitModule,
		SharedModule,
		ApiModule,
	],
	exports: [TestCalendarComponent, TestEventUniqueComponent, TestEventPaginateComponent],
})
export class CalendarModule {
	static forRoot() {
		return {
			ngModule: CalendarModule,
			providers: [EventService, EventattachmentService, EventreferenceService],
		};
	}
}
