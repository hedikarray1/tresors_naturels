import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CouponModalPage } from './coupon-modal.page';

describe('CouponModalPage', () => {
  let component: CouponModalPage;
  let fixture: ComponentFixture<CouponModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CouponModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
