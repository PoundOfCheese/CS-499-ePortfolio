import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCard } from '../meal-card/meal-card';
//import { MealData } from '../services/meal-data';
import { TripData } from '../services/trip-data';
import { Meal } from '../models/meal';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-meal-listing',
  standalone: true,
  imports: [CommonModule, MealCard],
  templateUrl: './meal-listing.html',
  styleUrl: './meal-listing.css',
  providers: [TripData]
})
export class MealListing implements OnInit {
  meals!: Meal[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: Authentication
  ) {
    console.log('meal-listing constructor');
  }

  public addMeal(): void {
    this.router.navigate(['add-meal']);
  }

  private getStuff(): void {
    this.tripData.getMeals().subscribe({
      next: (value: any) => {
        this.meals = value;
        if(value.length > 0) {
          this.message = 'There are ' + value.length + ' meals available.';
        }
        else {
          this.message = 'There were no meals retrieved from the database.';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
