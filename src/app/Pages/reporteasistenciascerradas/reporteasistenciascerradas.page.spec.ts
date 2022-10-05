import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteasistenciascerradasPage } from './reporteasistenciascerradas.page';

describe('ReporteasistenciascerradasPage', () => {
  let component: ReporteasistenciascerradasPage;
  let fixture: ComponentFixture<ReporteasistenciascerradasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteasistenciascerradasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteasistenciascerradasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
