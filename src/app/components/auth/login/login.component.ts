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

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        
        this.authService.saveToken(res.token);
        alert(res.message); 
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
  
  
  

}
