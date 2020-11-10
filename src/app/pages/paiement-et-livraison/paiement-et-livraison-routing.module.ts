import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaiementEtLivraisonPage } from './paiement-et-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: PaiementEtLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaiementEtLivraisonPageRoutingModule {}
