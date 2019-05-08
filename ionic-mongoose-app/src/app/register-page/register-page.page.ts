import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  [x: string]: any;

  private userInput = {
    userName: '',
    password: '',
    login: ''

  }
  //Injection de userservice
  constructor(private httpClient: HttpClient,
    private user: UserService,
    private router: Router,
    private tostCtrl: ToastController) { }

  ngOnInit() {
  }

  //On verifit la valisdité de tous les champs
  private isformValid() {
    return this.userInput.userName && this.userInput.userName.length > 0
      && this.userInput.login!! && this.userInput.login.length > 0
      && this.userInput.password && this.userInput.password.length > 0;
  }

  validateForm() {
    if (this.isformValid()) {
      this.httpClient.post("http://localhost:3000/register", this.userInput)
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.data) {
              this.user.setUser(response.data);//on recupère juste la data de user generer par user.save
              // dans app.js
              this.router.navigateByUrl('/home');
            } else {      // si l'utilisateur existe on  fait appel au toast
              this.tostCtrl.create(
                {
                  message: " Ce compte existe déja",
                  duration: 2000,
                  color: "danger",
                  showCloseButton: true,
                  closeButtonText: "close"
                }
              ).then(toast => toast.present());
            }
          },
          err => console.log(err)
        )
    }
  }
}
