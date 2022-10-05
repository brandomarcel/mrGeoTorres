import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsignartareaPage } from './asignartarea.page';

describe('AsignartareaPage', () => {
  let component: AsignartareaPage;
  let fixture: ComponentFixture<AsignartareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignartareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignartareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
