import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8080/api/transaction';

  http=inject(HttpClient);

  getAllTransactions(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addTransaction(transaction:any){
    return this.http.post(`${this.baseUrl}`,transaction);
  }
  
}
