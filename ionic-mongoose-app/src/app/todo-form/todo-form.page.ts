import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.page.html',
  styleUrls: ['./todo-form.page.scss'],
})


export class TodoFormPage implements OnInit {

  public task = {
    taskName: '',
    dateString: (new Date()).toISOString(),
    done: false
  }


  //injection du httpClient pour avoir le chemin de la base
  //injection de  Router pour la redirection de la page sur home
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  //Pour la persistance des données

  persisTask() {
    this.httpClient.post("http://localhost:3000/task/new", this.task)
      .subscribe(
        () => {
          console.log('ok');
          //rédirection sur la page d'accueil
          this.router.navigateByUrl('/home');
        },
        (err) => {
          console.log(err);
        })
  }
}
