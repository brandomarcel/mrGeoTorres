import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValorplanillaPage } from './valorplanilla.page';

describe('ValorplanillaPage', () => {
  let component: ValorplanillaPage;
  let fixture: ComponentFixture<ValorplanillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorplanillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValorplanillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
