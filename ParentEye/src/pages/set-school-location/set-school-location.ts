import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SchoolLocation } from '../../Models/SchoolLocation.class';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SetSchoolLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-school-location',
  templateUrl: 'set-school-location.html',
})
export class SetSchoolLocationPage {
  locationset=false;
  baseSchoolLocation={}as SchoolLocation;
  SchoolRef:FirebaseObjectObservable<SchoolLocation>;
  constructor(public viewCtrl:ViewController,public navCtrl: NavController,public database:AngularFireDatabase, public navParams: NavParams) {
    this.SchoolRef = this.database.object('SchoolLocation');
  }

  click(event){
    this.baseSchoolLocation.latitude=event.coords.lat;
    this.baseSchoolLocation.longitude=event.coords.lng;
    this.SchoolRef.set(this.baseSchoolLocation);
    this.locationset=true;  
    }
      setLocationOnMap(){
        this.viewCtrl.dismiss(this.baseSchoolLocation);
      }
    close(){
      this.viewCtrl.dismiss();
    
    }

}
