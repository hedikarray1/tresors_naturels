import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailProduitPage } from './detail-produit.page';

describe('DetailProduitPage', () => {
  let component: DetailProduitPage;
  let fixture: ComponentFixture<DetailProduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
