import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { TransactionService } from '../../../service/transactions/transaction.service';
import { groupBy } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  transactionService=inject(TransactionService);

  public pieChartType : 'pie'= 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Expenses'
      }
    }
  };

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(){
    this.transactionService.getAllTransactions().subscribe(
      transaction => {
        const grouped= transaction.reduce((acc, tx)=>{
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        },{} as Record<string,number>);
        
        this.pieChartData.labels = Object.keys(grouped);
        this.pieChartData.datasets[0].data = Object.values(grouped);
        this.pieChartData.datasets[0].backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];
      }
    )
  }

}
