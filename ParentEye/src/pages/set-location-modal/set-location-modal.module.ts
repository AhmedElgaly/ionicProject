import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationModalPage } from './set-location-modal';
import {AgmCoreModule} from '@agm/core';
@NgModule({
  declarations: [
    SetLocationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationModalPage)
    ,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGNFY4bUONsKZiHv1UJmhVMsd9ebsvOfo'
    })
  ],
})
export class SetLocationModalPageModule {}
