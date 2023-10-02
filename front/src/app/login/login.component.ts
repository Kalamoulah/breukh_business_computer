import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      telephone:"",
      password:""
    })
  }
 

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  connexion() {
    const credentials = this.loginForm.value
   
     this.authService.login(credentials).pipe(
      tap({
        next: (res)=>{
        const  token = res.token
          console.log(res);
          const userConnected = JSON.stringify(res.user)
          
          localStorage.setItem('userAuth', userConnected) 
          localStorage.setItem('token', token);
          this.router.navigate(['home'])
        },
        complete:()=>{
          console.log('observable terminé ');
        },
        error:(err)=>{
          console.error("Une erreur s'est produite :", err);
        }
      })
     ).subscribe()     
  }
}
