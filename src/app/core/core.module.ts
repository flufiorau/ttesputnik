import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImitationDataServerService} from './imitation-data-server.service';
import {MaterialModule} from './material/material.module';
import {SaveFullHtmlPipe} from './save-full-html.pipe';

@NgModule({
  declarations: [SaveFullHtmlPipe],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    ImitationDataServerService
  ],
  exports: [SaveFullHtmlPipe]
})
export class CoreModule {
}
