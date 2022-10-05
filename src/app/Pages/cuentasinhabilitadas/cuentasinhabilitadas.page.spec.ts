import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuentasinhabilitadasPage } from './cuentasinhabilitadas.page';

describe('CuentasinhabilitadasPage', () => {
  let component: CuentasinhabilitadasPage;
  let fixture: ComponentFixture<CuentasinhabilitadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasinhabilitadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuentasinhabilitadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
