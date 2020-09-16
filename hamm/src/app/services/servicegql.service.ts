import { Injectable } from '@angular/core';
import {Mutation, Query} from 'apollo-angular';
import gql from 'graphql-tag';


export interface Item{
  name: string;
  percentage: string;
  mount: string;
}

export interface Response{
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})

export class LoginGQLService extends Mutation{
  document = gql`
    mutation logIn($email:String!, $password: String!){
      login(email:\$email,password:\$password){
        token
      }
    }
  `;
}


@Injectable({
  providedIn: 'root'
})

export class RegisterGQLService extends Mutation{
  document = gql`
    mutation signUp($name: String!, $email: String!, $phone: String, $password: String!){
      signUp(input: {
        name:\$name,
        email:\$email,
        phone:\$phone,
        password:\$password        
      }){
        token
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})

export class addAccountGQLService extends Mutation{
  document = gql`
  mutation AddAccount($name: String!,$percentage: Float!, $amount: Float!){
    addItem(input: {
      name: $name,    
      percentage: $percentage,
      amount: $amount
    }){
      name
      percentage
      amount
    }
  }
  `;
  }

  @Injectable({
    providedIn: 'root'
  })

  export class addTransactionGQLService extends Mutation{
    document = gql`
    mutation addTransaction($detail: String!, $amount: Float!){
      addTransaction(input: {detail: $detail, amount: $amount}) {
        id        
        amount        
        date_time      
      }
    }
    `;
  }