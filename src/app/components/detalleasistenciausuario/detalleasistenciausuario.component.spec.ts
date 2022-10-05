import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleasistenciausuarioComponent } from './detalleasistenciausuario.component';

describe('DetalleasistenciausuarioComponent', () => {
  let component: DetalleasistenciausuarioComponent;
  let fixture: ComponentFixture<DetalleasistenciausuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleasistenciausuarioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleasistenciausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
