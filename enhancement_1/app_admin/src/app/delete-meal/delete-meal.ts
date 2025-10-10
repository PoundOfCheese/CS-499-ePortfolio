import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-delete-meal',
  imports: [],
  templateUrl: './delete-meal.html',
  styleUrl: './delete-meal.css'
})
export class DeleteMeal implements OnInit{

  constructor(
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    let mealCode = localStorage.getItem('mealCode');
    if(!mealCode) {
      alert("Something wrong, couldn't find where I stashed mealCode!");
      this.router.navigate(['meal-listing']);
      return;
    }

    this.tripData.deleteMeal(mealCode)
      .subscribe({
        next: (mealCode: any) => {
          console.log(mealCode);
          this.router.navigate(['meal-listing']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
}
