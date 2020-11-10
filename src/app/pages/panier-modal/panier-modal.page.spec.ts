import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanierModalPage } from './panier-modal.page';

describe('PanierModalPage', () => {
  let component: PanierModalPage;
  let fixture: ComponentFixture<PanierModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanierModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanierModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
