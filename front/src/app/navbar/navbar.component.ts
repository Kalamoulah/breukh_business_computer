import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userAuth!: any;
  succursale!:string
  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('userAuth')
    this.userAuth = JSON.parse(user!)
    this.succursale = this.userAuth.succursale.nom.substring(4)
     
  }


  logout() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
