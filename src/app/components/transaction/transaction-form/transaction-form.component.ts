import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../service/transactions/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {

  transactionService=inject(TransactionService);
  router=inject(Router);

  transaction={
    title: '',
    amount: 0,
    category: '',
    date: ''
  }

  addTransaction(){
    this.transactionService.addTransaction(this.transaction).subscribe(
      {
        next: () => {
          alert('Transaction added successfully!');
          this.router.navigate(['/transactions']);
        },
        error: (err) => {
          alert(err.error)
          this.router.navigate(['/set-budget'])
        }
        
      }
    )
  }


}
