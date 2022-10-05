import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionusuPage } from './gestionusu.page';

describe('GestionusuPage', () => {
  let component: GestionusuPage;
  let fixture: ComponentFixture<GestionusuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionusuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionusuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
