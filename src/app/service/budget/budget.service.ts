import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Budget } from '../../model/budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private baseUrl='http://localhost:8080/api/budget';

  http=inject(HttpClient);

  getBudgets(){
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addBudget(budget:any){
    return this.http.post(`${this.baseUrl}`,budget);
  }

  updateBudget(updateBudget: Budget) {
    return this.http.post(`${this.baseUrl}/update-budget`,updateBudget);
  }
  
}
