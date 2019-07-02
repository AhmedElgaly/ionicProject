import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackLocationPage } from './track-location';
import {AgmCoreModule} from '@agm/core';
@NgModule({
  declarations: [
    TrackLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackLocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGNFY4bUONsKZiHv1UJmhVMsd9ebsvOfo'
    })
  ],
})
export class TrackLocationPageModule {}
