import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginGQLService, RegisterGQLService } from '../services/servicegql.service';
import { modelo,modeloSignup } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  logIn: boolean = true;

  name:string;
  phone: string;
  email: string;
  password: string; 
 

  constructor(    
    private route: Router,
    private loginGQL: LoginGQLService,
    private registerGQL: RegisterGQLService
    ) { }

  ngOnInit(){
    
  }
  


  login(){
   if (this.logIn) {
    this.loginGQL.mutate({
      email: this.email,
      password: this.password
    }).subscribe(({data})=>{
      let datos = <modelo> data
      const token = datos.login.token;
      if(token){        
        localStorage.setItem('token', token);
        this.route.navigate(['home']);        
      }  
    },(error)=>{
      console.log(error);
    }
    )
   }else{
    this.registerGQL.mutate({
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password
    }).subscribe(({data})=>{
      let datos = <modeloSignup> data
      console.log(datos.signUp)
      const token = datos.signUp.token;
      if(token){
        localStorage.setItem('token',token);
        this.route.navigate(['home']);
      }
    },(error)=>{
      console.log(error);
    }
    )
   }
  }

}
