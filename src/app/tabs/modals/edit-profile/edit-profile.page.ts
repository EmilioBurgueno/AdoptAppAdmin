import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  @Input() uID: string;

  editUserForm: FormGroup;

  user: User;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navParams: NavParams,
              private userService: UserService) { }

  ngOnInit() {
    const uID = this.navParams.get('uID');
    this.getUser(uID);
    this.initForm();
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user[0] as User;
      this.patchForm();
    })
  }

  updateItem() {
    const updatedUser = {
      ...this.editUserForm.value
    };

    this.userService.updateUser(this.uID, updatedUser).then(() => {
      this.editAlert();
    }).catch((error) => {
      console.log(error)
    });
  }  

  patchForm() {
    this.editUserForm.patchValue({
      fname: this.user.fname,
      lname: this.user.lname,
      birthday: this.user.birthdate,
      address: this.user.address,
      email: this.user.email,
      username: this.user.username,
      phone: this.user.phone
    })
  }

  initForm() {
    this.editUserForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async editAlert() {
    const alert = await this.alertCtrl.create({
      header: '¡Exito!',
      message: 'Tu perfil ha sido modificado exitosamente',
      buttons: [
        {
          text: 'OKAY',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

}
