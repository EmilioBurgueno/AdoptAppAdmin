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
    if (this.email != "") {
      this.afa.resetPassword(this.email).then(() => {
        console.log('enviado');
      }).catch(() => {
        console.log('error');
      });
    } else {
      alert('Favor de llenar la informacion requerida')
    }

  }
}
