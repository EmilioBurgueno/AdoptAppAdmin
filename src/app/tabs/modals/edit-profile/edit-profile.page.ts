import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { ModalController, AlertController, NavParams, LoadingController } from '@ionic/angular';
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

  loadingIndicator;
  loading = false;

  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private userService: UserService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    const uID = this.navParams.get('uID');
    this.getUser(uID);
    this.initForm();
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user as User;
      this.patchForm();
    })
  }

  async updateUser() {
    await this.presentLoading('Creando tu cuenta...');
    if (this.editUserForm.valid) {
      const updatedUser = {
        email: this.user.email,
        ...this.editUserForm.value
      };

      try {
        await this.userService.updateUser(this.user.id.toString(), updatedUser)
        this.dismissLoading();
        this.presentAlertConfirm('¡Exito!', 'Tu perfil ha sido modificado exitosamente.');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo malo ha pasado', error.message);
      }
    } else {
      this.dismissLoading();
      this.presentAlert('Algo malo ha pasado', 'Por favor llena todos los campos correctamente.');
    }
  }

  patchForm() {
    this.editUserForm.patchValue({
      fname: this.user.fname,
      lname: this.user.lname,
      birthday: this.user.birthdate,
      address: this.user.address,
      phone: this.user.phone
    })
  }

  initForm() {
    this.editUserForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async presentLoading(body: string) {
    this.loadingIndicator = await this.loadingCtrl.create({
      message: body
    });
    this.loading = true;
    await this.loadingIndicator.present();
  }

  async dismissLoading() {
    this.loading = false;
    await this.loadingIndicator.dismiss();
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Listo']
    });

    await alert.present();
  }

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

}
