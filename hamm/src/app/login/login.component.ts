import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';


const loginMutation = gql`
mutation login($email:String!, $password: String!){
  login(email:\$email,password:\$password){
    token
  }
}
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string; 

  constructor(private apollo: Apollo,private route: Router) { }

  ngOnInit(){
    
  }

  login(){
    this.apollo.mutate({
      mutation: loginMutation,
      variables:{
        email: this.email,
        password: this.password
      }
    }).subscribe(({data})=>{
      console.log(data);
      const token = data.login.token;
      if(token){        
        localStorage.setItem('token', token);
        this.route.navigate(['home']);        
      }      
    },(error)=>{
      console.log(error);
    }
    )
  }

}
