import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InternetEstablishedPage } from './internet-established.page';

describe('InternetEstablishedPage', () => {
  let component: InternetEstablishedPage;
  let fixture: ComponentFixture<InternetEstablishedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetEstablishedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InternetEstablishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
