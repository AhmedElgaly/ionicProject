import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Child } from '../../Models/Child.class';
import { InitLocation } from '../../Models/intLocation.class';

import Firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-track-location',
  templateUrl: 'track-location.html',
})
export class TrackLocationPage {
child:Child = new Child();
trackLocation={} as InitLocation;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.child = this.navParams.data;
    Firebase.database().ref('TrackLocation').on('value', (snapshot) => {
    
      this.trackLocation.latitude=snapshot.val().latitude;
      this.trackLocation.longitude =snapshot.val().longitude;
     // this.track_lat=snapshot.val().latitude;
    //this.track_long =snapshot.val().longitude;
      console.log(snapshot.val().latitude+" "+snapshot.val().longitude) ;
      //console.log(this.track_long+" "+ this.track_lat) ;
    return false;
    
    });  
  }

  ionViewDidLoad() {
    console.log(this.trackLocation.latitude+" "+ this.trackLocation.longitude);
    console.log('ionViewDidLoad TrackLocationPage');
  }

}
