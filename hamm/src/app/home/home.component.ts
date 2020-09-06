import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const itemList = gql`
    query{
      getItems{
        name
      }     
    }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apollo: Apollo) { }
    cuentas:any;
  ngOnInit(){
    this.apollo.watchQuery<any>({
      query:itemList
    }).valueChanges.subscribe(({data, loading})=>{
      console.log(loading);
      console.log(data);
      this.cuentas = data.getItems;
    },(error)=>{
      console.log(error);
    }
    )

  }

}
