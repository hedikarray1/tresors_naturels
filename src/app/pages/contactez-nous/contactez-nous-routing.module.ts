import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactezNousPage } from './contactez-nous.page';

const routes: Routes = [
  {
    path: '',
    component: ContactezNousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactezNousPageRoutingModule {}
