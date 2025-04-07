import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../service/transactions/transaction.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [FormsModule,DatePipe,RouterLink],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit{

  transactionService=inject(TransactionService);

  transactions:any[]=[];

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe(
      {
        next: (res) => this.transactions = res,
        error: (err) => console.error('Failed to load transactions', err)
      }
    )
  }
  

}
