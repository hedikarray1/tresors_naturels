import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaiementEtLivraisonPage } from './paiement-et-livraison.page';

describe('PaiementEtLivraisonPage', () => {
  let component: PaiementEtLivraisonPage;
  let fixture: ComponentFixture<PaiementEtLivraisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementEtLivraisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementEtLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
