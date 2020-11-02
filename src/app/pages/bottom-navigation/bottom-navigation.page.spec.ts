import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BottomNavigationPage } from './bottom-navigation.page';

describe('BottomNavigationPage', () => {
  let component: BottomNavigationPage;
  let fixture: ComponentFixture<BottomNavigationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavigationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
