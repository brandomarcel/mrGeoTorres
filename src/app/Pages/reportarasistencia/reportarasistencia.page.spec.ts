import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportarasistenciaPage } from './reportarasistencia.page';

describe('ReportarasistenciaPage', () => {
  let component: ReportarasistenciaPage;
  let fixture: ComponentFixture<ReportarasistenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportarasistenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportarasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
