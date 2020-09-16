import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { addAccountGQLService, addTransactionGQLService } from '../services/servicegql.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() typeAction
  constructor(
    private addAccountGQL: addAccountGQLService,
    private addTransactionGQL: addTransactionGQLService,
    public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  name:string;
  percentage: string;
  amount: string;
  detail: string;
  mount = 0;

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addAccount(type){
    if(type==1){
      console.log(type)
      this.addTransactionGQL.mutate({
        detail: this.detail,
        amount: this.amount
      }).subscribe(({data})=>{
        if(data){
          this.dialogRef.close(data);
          console.log(data);
        }
      })
    }else{
      console.log(type)
      this.addAccountGQL.mutate({
        name: this.name,
        percentage: this.percentage,
        amount: this.mount
      }).subscribe(({data})=>{
        if(data){
          this.dialogRef.close(data);
          console.log(data)
        }
      }, (error)=>{
        console.log(error);
      }
      )
    }   
  }


}
