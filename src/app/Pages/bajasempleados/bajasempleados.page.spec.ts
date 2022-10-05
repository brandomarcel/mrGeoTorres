import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BajasempleadosPage } from './bajasempleados.page';

describe('BajasempleadosPage', () => {
  let component: BajasempleadosPage;
  let fixture: ComponentFixture<BajasempleadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajasempleadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BajasempleadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
