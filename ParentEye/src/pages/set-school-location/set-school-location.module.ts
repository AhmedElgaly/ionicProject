import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetSchoolLocationPage } from './set-school-location';
import {AgmCoreModule} from '@agm/core';
@NgModule({
  declarations: [
    SetSchoolLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetSchoolLocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGNFY4bUONsKZiHv1UJmhVMsd9ebsvOfo'
    })
  ],
})
export class SetSchoolLocationPageModule {}
