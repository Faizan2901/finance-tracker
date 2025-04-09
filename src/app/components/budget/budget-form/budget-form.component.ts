import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../../../service/budget/budget.service';

@Component({
  selector: 'app-budget-form',
  imports: [FormsModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss'
})
export class BudgetFormComponent implements OnInit{

  budgetService=inject(BudgetService);

  budgets:any[]=[];

  budgetForm ={
    category:'',
    amount: 0,
    month: ''
  }


  ngOnInit(): void {
    this.loadBudgets(); 
  }

  loadBudgets(){
    this.budgetService.getBudgets().subscribe(
      (data)=>{
        this.budgets=data
      }
    )
  }

  addBudget(){
    if(!this.budgetForm.amount || !this.budgetForm.category || !this.budgetForm.month){
      alert("Enter budget details");
      return
    }
    this.budgetService.addBudget(this.budgetForm).subscribe(
      ()=>{
        this.budgetForm = {
          category:'',
          amount:0,
          month:''
        }
        this.loadBudgets();
      });
  }

  
}
