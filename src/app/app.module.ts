import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// para hacer peticiones HTTP

import { HttpClientModule } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
// sdk de firebase

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { ComponentsModule } from './components/components.module';
import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { PipesModule } from './pipes/pipes.module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { File } from '@ionic-native/file/ngx';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig, 'SIGEO'),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ComponentsModule,
    AngularFireStorageModule,
    PipesModule,
    NgxDatatableModule,
    AngularFirestoreModule.enablePersistence( {synchronizeTabs: true} ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    FiltroPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
    Geolocation,
    Location,
    LocationAccuracy,
    Diagnostic,
    ScreenOrientation,
    Camera,
    SocialSharing,
    EmailComposer,
    BackgroundGeolocation,
    SQLite,
    BackgroundMode,
    NativeAudio,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
