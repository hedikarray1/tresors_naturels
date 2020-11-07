import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaiementEtLivraisonPageRoutingModule } from './paiement-et-livraison-routing.module';

import { PaiementEtLivraisonPage } from './paiement-et-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaiementEtLivraisonPageRoutingModule
  ],
  declarations: [PaiementEtLivraisonPage]
})
export class PaiementEtLivraisonPageModule {}
