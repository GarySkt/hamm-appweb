import { Component, OnInit, Inject, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ITEMLIST } from '../models/queryGraphQL';
import { ItemComponent } from '../item/item.component';
import { dataItemAccount } from '../models/item-account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() dataItemAccount: dataItemAccount
  constructor(private apollo: Apollo, private route: Router, public dialog: MatDialog) { }
  loading: any;
  nameAccount: String;
  percentageAccount: String;
  itemAccountContainer: dataItemAccount[];
  mensaje: String;
  ngOnInit() {
    this.listItemsAccount()

  }
  listItemsAccount() {
    this.apollo.watchQuery<any>({
      query: ITEMLIST
    }).valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      if (loading) {
        this.mensaje = "Cargando...";
      }
      this.itemAccountContainer = data.getItems;
    }, (error) => {
      console.log(error);
    })
  }
  openDialog(dato) {
    const dialogRef = this.dialog.open(ItemComponent, {
      data: {
        typeAction: dato
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemAccountContainer = this.itemAccountContainer.concat(result.addItem);
      }
    });
  }
  logOut() {
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

}

