import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactezNousPage } from './contactez-nous.page';

describe('ContactezNousPage', () => {
  let component: ContactezNousPage;
  let fixture: ComponentFixture<ContactezNousPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactezNousPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactezNousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
