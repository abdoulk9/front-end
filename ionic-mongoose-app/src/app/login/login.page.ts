import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Creation d'une variable avec les champs concerné
  public contact = {
    login: '',
    password: ''
  };


  constructor(private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private toaster: ToastController) {


  }


  ngOnInit() {
  }

  validateLogin() {
    this.httpClient.post('http://localhost:3000/login', this.contact)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.success) {
            this.userService.setUser(response.user);
            this.router.navigateByUrl('/home');
          } else {
            let myToast = this.toaster.create(
              {
                message: "Fail authentication!!",
                color: "danger",
                duration: 3000,
                position: 'middle'
              });
            myToast.then((toast) => toast.present())//permet l'affichage du toast
          }
        },
        (err) => { console.log(err) }
      );

  }


  loginInterface() {
    this.httpClient.post("http://localhost:3000/persons", this.contact)
      .subscribe(
        () => {
          console.log("ok");
        },
        (err) => {
          console.log(err);
        }
      )
  }


}
