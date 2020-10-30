import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllProductsPage } from './all-products.page';

describe('AllProductsPage', () => {
  let component: AllProductsPage;
  let fixture: ComponentFixture<AllProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
