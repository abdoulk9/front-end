import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  //Creation d'une  variable user
  public user;

  //declaration d'une variable tableau 
  public taskList = [];

  //injection de http client pour la liaison avec la bd
  //Injection de UserService
  constructor(private httpClient: HttpClient,
    private userService: UserService) {

    this.user = userService.getUser();//recuperation des infos sur l'utilisateur

  }


  //fonction qui s'execute àpres l'affichage de la page 
  // ionDidEnter par opposotion ionWillEnter()
  ionViewDidEnter() {
    this.httpClient.get("http://localhost:3000/task/")
      .subscribe(
        (data: any) => {
          this.taskList = data;
          console.log(data);
        },
        err => console.log(err)
      );
  }


  //preparation de la requete de suppression
  //avec le chemin e la base + id de la tâche  en parametre
  deleteTask(id) {
    this.httpClient.delete("http://localhost:3000/task/" + id)
      .subscribe(
        () => {
          this.ionViewDidEnter();
        },
        err => console.log(err)
      );
  }

  updateTask(task){
    this.httpClient.put('http://localhost:3000/taks', task)
    .subscribe(
      () => console.log("update ok"),
       (err)=> console.log(err)
    );
  }

}
