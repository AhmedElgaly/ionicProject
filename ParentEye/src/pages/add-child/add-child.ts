import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Child } from '../../Models/Child.class';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { ChildLocation } from '../../Models/ChildLocation.class';
import { Geolocation } from '@ionic-native/geolocation';
import { SchoolLocation } from '../../Models/SchoolLocation.class';
import { auth } from 'firebase';

import Firebase from 'firebase';
import  {take} from 'rxjs/operators';
import { currentLocation } from '../../Models/currentLocation.class';
import { InitLocation } from '../../Models/intLocation.class';


@IonicPage()
@Component({
  selector: 'page-add-child',
  templateUrl: 'add-child.html',
})
export class AddChildPage {

  locationset=false;
  locationSchoolSet=false;
  baseLocation:ChildLocation = new ChildLocation(30.044420,31.235712);
  baseSchoolLocation={}as SchoolLocation ;
  curr_location ={}as currentLocation;
  init_location = {} as InitLocation;
  childs:Child=new Child();
  childRef:FirebaseListObservable<Child[]>;
  TrackRef:FirebaseListObservable<InitLocation[]>;
  TrackList:InitLocation[]=[];
  constructor(public geolocation:Geolocation,public navCtrl: NavController, public navParams: NavParams,public fire:AngularFireAuth,public DB:AngularFireDatabase,public mdlCtrl:ModalController) {
this.childRef=this.DB.list("Child");
this.childs.ParentId=fire.auth.currentUser.uid;
//this.curr_location.latitude = 0;
//this.curr_location.longitude =0;
this.init_location.latitude=0;
this.init_location.longitude=0;
Firebase.database().ref('TrackLocation').on('value', (snapshot) => {
  snapshot.forEach( snap => {
    //this.TrackList.push(snap.val());
    console.log(snap.val().latitude+" "+snap.val().longitude) ;
    //this.curr_location.latitude = snap.val().latitude;
    //this.curr_location.longitude =snap.val().longitude;
   this.init_location.latitude=snap.val().latitude;
   this.init_location.longitude=snap.val().longitude;
  return false;
  })
});  

    
  }
  
  
  getLocation(){
this.geolocation.getCurrentPosition().then((locationdata)=>{
this.baseLocation.latitude=locationdata.coords.latitude;
this.baseLocation.longitude=locationdata.coords.longitude;
this.locationset=true;

})
.catch((error)=>{
  console.log(error);
})
  }
  setLocation(){
   const modal = this.mdlCtrl.create('SetLocationModalPage');
   modal.present();
   modal.onDidDismiss((data)=>{
     if(data){
        this.baseLocation=data;
        this.locationset=true;
     }
   });
  }
  setSchoolLocation(){
    const modal = this.mdlCtrl.create('SetSchoolLocationPage');
    modal.present();
    modal.onDidDismiss((data)=>{
      if(data){
         this.baseSchoolLocation=data;
         this.locationSchoolSet=true;
      }
    });
  }
  getSchoolLocation(){
    this.geolocation.getCurrentPosition().then((locationdata)=>{
    this.baseSchoolLocation.latitude=locationdata.coords.latitude;
    this.baseSchoolLocation.longitude=locationdata.coords.longitude;
    this.locationSchoolSet=true;
    })
    .catch((error)=>{
      console.log(error);
    })
      }
  AddChild(){
    this.childs.locationChild =this.baseLocation;
    this.childs.locationSchool=this.baseSchoolLocation;
    
    this.fire.authState.pipe(take(1)).subscribe(auth=>{
      this.DB.list(`Child/${auth.uid}/chidData`).push(this.childs)
      .then(()=>this.navCtrl.pop());
    });
    
   
  }

 

}
