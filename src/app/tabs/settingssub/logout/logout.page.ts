import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  user: any;

  constructor(private authService: AuthService,
              private userService: UserService,
              private navCtrl: NavController
  ) { }

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot(['']);
    });
  }

}
