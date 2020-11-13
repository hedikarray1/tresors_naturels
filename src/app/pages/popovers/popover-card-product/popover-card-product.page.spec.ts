import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverCardProductPage } from './popover-card-product.page';

describe('PopoverCardProductPage', () => {
  let component: PopoverCardProductPage;
  let fixture: ComponentFixture<PopoverCardProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverCardProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverCardProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
