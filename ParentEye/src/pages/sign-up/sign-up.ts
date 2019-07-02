import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { parents } from '../../Models/parents.interface';
import  {take} from 'rxjs/operators';
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  email:string='';
  password:string='';
  parent = {}as parents;
  ParentRef:FirebaseListObservable<parents[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public DB:AngularFireDatabase,public fire:AngularFireAuth) {
      this.ParentRef = this.DB.list("Parents");
  }

  
  sigUp(){
    this.fire.auth.createUserWithEmailAndPassword(this.email,this.password).then((user)=>{
      console.log(this.email + " "+this.password);
      this.parent.Email=this.email;
    //  this.ParentRef.push(+"/"+this.parent);
      this.fire.authState.pipe(take(1)).subscribe(auth=>{
        this.DB.list(`Parents/${auth.uid}`).push(this.parent)
        .then(()=> this.navCtrl.push('HomePage'));
      });
      //this.navCtrl.push('HomePage');
    });
    
  }
}
