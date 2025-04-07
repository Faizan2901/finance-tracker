import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { TransactionListComponent } from './components/transaction/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction/transaction-form/transaction-form.component';
import { BudgetFormComponent } from './components/budget/budget-form/budget-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'transactions',
        component: TransactionListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'add-transaction',
        component: TransactionFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'set-budget',
        component: BudgetFormComponent,
        canActivate: [authGuard]
    }
];
