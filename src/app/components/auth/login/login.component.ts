import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(
      (token)=>{
        this.authService.saveToken(token);
        alert('Login Successful!');
        this.router.navigate(['/dashboard']);
        },(error)=>{
        alert('Oops something went wrong')
      }
    );
  }
  

}
