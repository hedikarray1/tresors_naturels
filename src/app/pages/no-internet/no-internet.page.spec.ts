import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoInternetPage } from './no-internet.page';

describe('NoInternetPage', () => {
  let component: NoInternetPage;
  let fixture: ComponentFixture<NoInternetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoInternetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoInternetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
