import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TemplateListPageComponent} from './pages/template-list-page/template-list-page.component';
import {TemplatePageComponent} from './pages/template-page/template-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/patterns', pathMatch: 'full'},
  {path: 'patterns', component: TemplateListPageComponent},
  {path: 'pattern/:id', component: TemplatePageComponent},
  {path: '**', redirectTo: '/patterns', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
