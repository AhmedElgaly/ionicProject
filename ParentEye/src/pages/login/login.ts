import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignUpPage } from '../sign-up/sign-up';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage  {
 
  email:string='';
  password:string='';

	constructor(
		public navCtrl: NavController, public navParams: NavParams
		,public fire:AngularFireAuth	) {
		
  }
  logIn() {
this.fire.auth.signInWithEmailAndPassword(this.email,this.password).then(user=>{
	console.log(this.email + " "+this.password);
	this.navCtrl.push('HomePage');
  });
		
	}
	signUp_page(){
		this.navCtrl.push('SignUpPage');
	}

}
