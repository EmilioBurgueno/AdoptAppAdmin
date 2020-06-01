import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.page.html',
  styleUrls: ['./delete-profile.page.scss'],
})
export class DeleteProfilePage implements OnInit {

  loadingIndicator;
  loading = false;
  public password: string = "";
  public showPassword: boolean = false;

  constructor(private afa: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async deleteAccount(): Promise<void> {
    await this.presentLoading('Procesando petición...')

    if (this.password != "") {
      try {
        await this.afa.deleteUser(this.password);
        this.dismissLoading();
        this.presentAlertConfirm('La cuenta ha sido eliminada', 'Regresaras a la pagina de inicio de sesión');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Contraseña incorrecta', 'La contraseña ingresada no es correcta, favor de intentar otra vez');
      }
    }
    else {
      this.dismissLoading();
      this.presentAlert('Informacion incompleta', 'Por favor llena la informacion correctamente.');
    }
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
            this.navCtrl.navigateRoot(['auth/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

}
