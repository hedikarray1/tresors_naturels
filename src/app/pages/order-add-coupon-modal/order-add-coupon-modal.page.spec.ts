import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderAddCouponModalPage } from './order-add-coupon-modal.page';

describe('OrderAddCouponModalPage', () => {
  let component: OrderAddCouponModalPage;
  let fixture: ComponentFixture<OrderAddCouponModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddCouponModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddCouponModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
