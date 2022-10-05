import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeolocalizarPage } from './geolocalizar.page';

describe('GeolocalizarPage', () => {
  let component: GeolocalizarPage;
  let fixture: ComponentFixture<GeolocalizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocalizarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocalizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
