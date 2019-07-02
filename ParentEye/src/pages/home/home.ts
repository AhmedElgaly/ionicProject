import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Child } from '../../Models/Child.class';

import  {take} from 'rxjs/operators';
import { InitLocation } from '../../Models/intLocation.class';
import Firebase from 'firebase';
import { TrackLocationPage } from '../track-location/track-location';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SchoolLocation } from '../../Models/SchoolLocation.class';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 
  ChildRef:FirebaseListObservable<Child[]>;
  TrackRef:FirebaseListObservable<InitLocation[]>;
  TrackObject:FirebaseObjectObservable<InitLocation>;
  ChildList:Child[]=[];
  TrackList:InitLocation[]=[];
  trackLocation={} as InitLocation;
  schoollocation={} as SchoolLocation;
  child:Child = new Child();
  parentid:string;



 track_lat:number;
  track_long:number;
  school_lat:number;
  school_long:number;




  constructor(public ActionSheetCtrl:ActionSheetController,public localNotifications: LocalNotifications,public database:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public fire:AngularFireAuth) {
  
  this.parentid = this.fire.auth.currentUser.uid;
}
ionViewDidLoad(){
  var latschool = this.getLocationSchool_lat();
  var longschool = this.getLocationSchool_long();
  var trackLat = this.getTrackLocation_lat();
  var trackLong = this.getTrackLocation_long();
  //console.log(lat);
if(latschool == trackLat && longschool == trackLong){
  this.localNotifications.schedule({
    id: 1,
    title:'Your Child',
    text: "Your Child Arrived The School",
    sound:null
  });
  console.log("Your Child Arrived The School");
}

Firebase.database().ref('TrackLocation').on('value', (snapshot) => {
    
  this.trackLocation.latitude=snapshot.val().latitude;
  this.trackLocation.longitude =snapshot.val().longitude;
  this.track_lat=snapshot.val().latitude;
this.track_long =snapshot.val().longitude;
  console.log(snapshot.val().latitude+" "+snapshot.val().longitude) ;
  console.log(this.track_long+" "+ this.track_lat) ;

});  

Firebase.database().ref('SchoolLocation').on('value', (snapshot) => {
this.school_lat=snapshot.val().latitude;
this.school_long=snapshot.val().longitude;
this.schoollocation.latitude = snapshot.val().latitude;
this.schoollocation.longitude =snapshot.val().longitude;
console.log(snapshot.val().latitude+" "+snapshot.val().longitude) ;
console.log(this.school_lat+" "+ this.school_long) ;

});  
  Firebase.database().ref('Notes').on('value', (snapshot) => {
    snapshot.forEach( snap => {
      this.localNotifications.schedule({
        id: 1,
        title:'Your Child',
        text: snap.val(),
        sound:null
      });
      
    return false;
    })
  });  
/*this.TrackRef.pipe(take(1)).subscribe((data)=>{
  this.TrackList=data;
});*/
  this.fire.authState.pipe(take(1)).subscribe(
    (data)=>{
      this.ChildRef = this.database.list(`Child/${data.uid}/chidData`);
      this.ChildRef.subscribe((childitem)=>{
        this.ChildList=childitem;
        
        //this.schoollocation.latitude=childitem.
      })
    }
  )
  }
  getLocationSchool_lat() {
    return Firebase.database().ref('SchoolLocation').once('value').then(function(snapshot) {
      //this.schoollocation.longitude =snapshot.val().longitude;
      return snapshot.val().latitude;

    });
  }
  getLocationSchool_long() {
    return Firebase.database().ref('SchoolLocation').once('value').then(function(snapshot) {
      //this.schoollocation.longitude =snapshot.val().longitude;
      return snapshot.val().longitude;

    });
  }
  getTrackLocation_lat() {
    return Firebase.database().ref('TrackLocation').once('value').then(function(snapshot) {
      //this.schoollocation.longitude =snapshot.val().longitude;
      return snapshot.val().latitude;

    });
  }
  getTrackLocation_long() {
    return Firebase.database().ref('TrackLocation').once('value').then(function(snapshot) {
      //this.schoollocation.longitude =snapshot.val().longitude;
      return snapshot.val().longitude;

    });
  }


  notify(){
    this.localNotifications.schedule({
      id: 1,
      title:'Your Child',
      text: 'Your Child Arrived His School ',
      sound:null
    });
    
    
  }
onItemClick(child:Child){
this.ActionSheetCtrl.create({
  title:child.Age,
  buttons:[
    {
      text:'Delete',
      handler:()=>{
        this.ChildRef.remove(child.$key);
      }
    },
    {
      text:'Track',
      handler:()=>{
        this.navCtrl.push('TrackLocationPage',child);
      }
    },
    {
      text:'Cancel',
      handler:()=>{

      }
    },
  ]
}).present();
}

  logOut(){
this.fire.auth.signOut().then(()=>{
  this.navCtrl.setRoot('LoginPage');
});
  }
  GoToAdd(){
    this.navCtrl.push('AddChildPage');
  }
}
