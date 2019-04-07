import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateListPageComponent} from './template-list-page/template-list-page.component';
import {TemplatePageComponent} from './template-page/template-page.component';
import {MaterialModule} from '../core/material/material.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelForChangeTextAndFontSizeComponent} from './template-page/panel-for-change-text-and-font-size.component';

@NgModule({
  declarations: [
    TemplateListPageComponent,
    TemplatePageComponent,
    PanelForChangeTextAndFontSizeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TemplateListPageComponent,
    TemplatePageComponent,
    PanelForChangeTextAndFontSizeComponent,
  ],
  providers: [],
  entryComponents: [PanelForChangeTextAndFontSizeComponent],
})
export class PagesModule {
}
