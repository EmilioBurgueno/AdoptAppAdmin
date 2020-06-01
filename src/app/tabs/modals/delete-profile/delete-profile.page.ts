import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController, LoadingController, NavParams, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.page.html',
  styleUrls: ['./delete-profile.page.scss'],
})
export class DeleteProfilePage implements OnInit {

  @Input() uID: string;

  user: User;

  loadingIndicator;
  loading = false;
  public password: string = "";
  public showPassword: boolean = false;

  constructor(private afa: AuthService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private userService: UserService) { }

  ngOnInit() {
    const uID = this.navParams.get('uID');
    this.getUser(uID);
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user as User;
    })
  }

  async deleteAccount(): Promise<void> {
    await this.presentLoading('Procesando petición...')

    if (this.password != "") {
      try {
        await this.userService.deleteUsername(this.user.username.toString());
        await this.userService.deleteUser(this.user.id.toString());
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
      this.presentAlert('Información incompleta', 'Por favor llena la informacion correctamente.');
    }
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
            //this.navCtrl.navigateRoot(['auth/login']);
            this.closeModal();
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
