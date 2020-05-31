import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.page.html',
  styleUrls: ['./edit-credentials.page.scss'],
})
export class EditCredentialsPage implements OnInit {

  editUserForm: FormGroup;
  user: User;

  constructor(private modalCtrl: ModalController,
              private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editUserForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      cPassword: new FormControl(null, [Validators.required]),
      nPassword: new FormControl(null)
    });
  }

  updateEmail() {
    this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {

      this.authService.changeEmail(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.email.value);
      console.log('Email updated!');
    }).catch((error) => {
      console.log(error);
    });
    this.closeModal();
  }

  updatePassword() {
    this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {

      this.authService.changePassword(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.nPassword.value);
      console.log('Password updated');
    }).catch((error) => {
      console.log(error);
    });
    this.closeModal();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
