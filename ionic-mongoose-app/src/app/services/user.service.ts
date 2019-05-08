import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   //creation 
   private user ={
     userName: 'Anonymous',
     password: null,
     login:''
   };

  constructor() { }

 //getter sur user
  getUser(){
    return this.user;
  }
   //setter sur user
  setUser(user){
    this.user = user;
  }
}
