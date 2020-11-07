import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EngagementsPage } from './engagements.page';

describe('EngagementsPage', () => {
  let component: EngagementsPage;
  let fixture: ComponentFixture<EngagementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EngagementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
