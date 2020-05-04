import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logInForm: FormGroup;
  constructor(
              private navCtrl: NavController,
              private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot(['']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.logInForm.valid) {
      console.log(this.logInForm.value);

      const email = this.logInForm.controls.email.value;
      const password = this.logInForm.controls.password.value;

      this.authService.login(email, password);

    } else {
      console.log('Error');
    }
  }

  goToSignUp(): void {
    this.navCtrl.navigateForward(['']);
  }
}
