import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nameUser!: any

  ngOnInit(): void {
    const user = localStorage.getItem('userAuth')
    this.nameUser = JSON.parse(user!)

    console.log(this.nameUser);
    

  }
}
