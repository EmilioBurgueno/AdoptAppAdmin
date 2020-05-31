import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.page.html',
  styleUrls: ['./edit-credentials.page.scss'],
})
export class EditCredentialsPage implements OnInit {

  editUserForm: FormGroup;
  user: User;
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  patchForm() {
    this.editUserForm.patchValue({
      email: this.user.email
    });
  }

  initForm() {
    this.editUserForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
