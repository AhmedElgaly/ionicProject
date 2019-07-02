import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import 'rxjs/add/operator/take';

import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AngularFireDatabaseModule,AngularFireDatabase} from 'angularfire2/database';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';



@NgModule({
  declarations: [
    MyApp,
    
   
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
   AngularFireModule.initializeApp(firebaseConfig.fire),
   NgxErrorsModule,
   AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBGNFY4bUONsKZiHv1UJmhVMsd9ebsvOfo'
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    AngularFireAuth,
    AuthProvider,
    LocalNotifications
 
  ]
})
export class AppModule {}
