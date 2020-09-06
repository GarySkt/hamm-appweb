import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://3.128.156.146:4000/'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  
  return {
    link: httpLink.create({uri,  headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')})}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  
}
