import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public email: string = ""
  constructor(private afa: AuthService) { }

  ngOnInit() {
  }

  sendLink() {
    this.afa.resetPasword(this.email).then(() => {
      console.log('enviado');
    }).catch(() => {
      console.log('error');
    });
  }
}
