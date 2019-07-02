import { Component,NgZone } from '@angular/core';
import { NavController, Note } from 'ionic-angular';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { AngularFireDatabase,FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import Firebase from 'firebase';
import 'rxjs/add/operator/filter';
import {filter} from 'rxjs/operators'; 
import { InitLocation } from '../../Models/intLocation.class';
import { currentLocation } from '../../Models/currentLocation.class';
import { Child } from '../../Models/Child.class';
import { parents } from '../../Models/parents.interface';
import  {take} from 'rxjs/operators';
import { Note_Record } from '../../Models/note.interface';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
lat : number = 0;
long:number = 0;
  currentLocation = {}as InitLocation;
  Location = {}as currentLocation;
  parent = {} as parents;
  note = {}as Note_Record ;
  childs:Child=new Child();
 locationRef :FirebaseObjectObservable<InitLocation>;
 NoteRef :FirebaseObjectObservable<Note_Record>;
watch:any;
  constructor(public navCtrl: NavController,
    public zone:NgZone,
  public backgroundgeolocation:BackgroundGeolocation,
  public geolocation:Geolocation,public DB:AngularFireDatabase) {
    this.locationRef=this.DB.object(`TrackLocation`);
    this.NoteRef = this.DB.object('Notes');
  }
  ionViewDidLoad(){
    this.getLocation();
   // this.start();
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then((locationdata)=>{
    this.currentLocation.latitude=locationdata.coords.latitude;
    this.currentLocation.longitude=locationdata.coords.longitude;
  //const  Ref = Firebase.database().ref("cuurLocation");
  console.log(this.currentLocation);
    this.locationRef.set(this.currentLocation); 
    
    })
    .catch((error)=>{
      console.log(error);
    })
    setTimeout(()=>{
      this.getLocation();
    },180000);
  }
  start(){

var config = {
  desiredAccuracy :0,
  stationaryRadius:20,
  distanceFilter:9,
  debug:true,
  interval:180000
}
this.backgroundgeolocation.configure(config).subscribe((location)=>{
console.log('BackGround Running'+location.latitude+" "+location.longitude);
this.zone.run(()=>{
  this.currentLocation.latitude=location.latitude;
  this.currentLocation.longitude= location.longitude;
  
  //this.locationRef.push(this.currentLocation);
});

},(error)=>{
  console.log('errror:'+error);
})
var Options ={
  frequency:3000,
  enableHighAccuracy:true

};

this.backgroundgeolocation.start();
var options ={
  frequency:3000,
  enableHighAccuracy:true,
  timeout:180000
};
this.watch=this.geolocation.watchPosition(options).pipe(filter((post:any)=>post.code === undefined)).subscribe((position:Geoposition)=>{
console.log(position);
this.zone.run(()=>{
  
  this.currentLocation.latitude=position.coords.latitude;
    this.currentLocation.longitude=position.coords.longitude;
 
  this.locationRef.set(this.currentLocation);
  
  
});
});
//this.locationRef.push(this.currentLocation); 
  }
stop(){
this.backgroundgeolocation.finish();
this.watch.unsubscribe();
console.log('stoppped');
}
sendNote(){
this.NoteRef.set(this.note);
}
}