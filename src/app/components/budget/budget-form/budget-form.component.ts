import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../../../service/budget/budget.service';
import { Budget } from '../../../model/budget.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss'
})
export class BudgetFormComponent implements OnInit{
  budgetService=inject(BudgetService);

  budgets:any[]=[];
  isEditing:boolean=false;

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

  deleteBudget(budget: any) {
   alert(budget.category)
  }
    
  editBudget(budget: Budget) {
    this.budgetForm.amount=budget.amount;
    this.budgetForm.category=budget.category;
    this.budgetForm.month=budget.month
    this.isEditing=true;
  }
  
  addOrUpdateBudget() {
    if(this.budgetForm.amount && this.budgetForm.category.trim() && this.budgetForm.month)
    {
      if(this.isEditing)
      {
        const updateBudget:Budget={
          category:this.budgetForm.category,
          amount:this.budgetForm.amount,
          month:this.budgetForm.month
        };
        this.budgetService.updateBudget(updateBudget).subscribe(
          {
            next:(res)=>{
              alert("Budget successfully updated for category: "+updateBudget.category+" and month: "+updateBudget.month);
              this.loadBudgets();
            },error:(err)=>{
              alert("Updation fails");
            }
          }
        );
        this.clearForm();
        this.isEditing=false;
      }else{
        if(!this.budgetForm.amount || !this.budgetForm.category || !this.budgetForm.month){
          alert("Enter budget details");
          return
        }
        this.budgetService.addBudget(this.budgetForm).subscribe(
          ()=>{
            this.clearForm();
            this.loadBudgets();
          });
      }
    }
  }

  clearForm(){
    this.budgetForm ={
      category:'',
      amount: 0,
      month: ''
    }
  }

}
