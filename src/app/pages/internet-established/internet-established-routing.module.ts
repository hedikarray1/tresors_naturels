import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternetEstablishedPage } from './internet-established.page';

const routes: Routes = [
  {
    path: '',
    component: InternetEstablishedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternetEstablishedPageRoutingModule {}
