import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ChildLocation } from '../../Models/ChildLocation.class';



@IonicPage()
@Component({
  selector: 'page-set-location-modal',
  templateUrl: 'set-location-modal.html',
})
export class SetLocationModalPage {
  locationset=false;
  baseLocation:ChildLocation = new ChildLocation(30.044420,31.235712);
  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }
  click(event){
this.baseLocation.latitude=event.coords.lat;
this.baseLocation.longitude=event.coords.lng;
this.locationset=true;  
}
  setLocationOnMap(){
    this.viewCtrl.dismiss(this.baseLocation);
  }
close(){
  this.viewCtrl.dismiss();

}
}
