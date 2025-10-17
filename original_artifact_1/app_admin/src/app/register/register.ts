import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../services/authentication';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  ngOnInit(): void {
  }

  public onRegisterSubmit(): void {
    this.formError = '';
    if(!this.credentials.email || !this.credentials.password ||
      !this.credentials.name) {
        this.formError = 'All fields are required, please try again';
        this.router.navigateByUrl('#'); // Return to login page
      } else {
        this.doRegister();
      }
  }

  private doRegister(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.authenticationService.register(newUser,
      this.credentials.password);

    try {
      this.authenticationService.login(newUser,
        this.credentials.password);
      if(this.authenticationService.isLoggedIn())
      {
        this.router.navigate(['']);
      } else {
        var timer = setTimeout(() => {
          if(this.authenticationService.isLoggedIn())
          {
            this.router.navigate(['']);
          }}, 3000);
      }
    } catch(err) {
      console.log({ error: err });
    }
    
  }
}
