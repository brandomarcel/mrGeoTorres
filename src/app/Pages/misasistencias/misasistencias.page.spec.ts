import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisasistenciasPage } from './misasistencias.page';

describe('MisasistenciasPage', () => {
  let component: MisasistenciasPage;
  let fixture: ComponentFixture<MisasistenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisasistenciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisasistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
