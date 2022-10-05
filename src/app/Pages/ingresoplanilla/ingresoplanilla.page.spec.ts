import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresoplanillaPage } from './ingresoplanilla.page';

describe('IngresoplanillaPage', () => {
  let component: IngresoplanillaPage;
  let fixture: ComponentFixture<IngresoplanillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoplanillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoplanillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
