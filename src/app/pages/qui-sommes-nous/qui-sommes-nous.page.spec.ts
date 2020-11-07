import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuiSommesNousPage } from './qui-sommes-nous.page';

describe('QuiSommesNousPage', () => {
  let component: QuiSommesNousPage;
  let fixture: ComponentFixture<QuiSommesNousPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiSommesNousPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuiSommesNousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
