import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Meal } from '../models/meal';

@Component({
  selector: 'app-edit-meal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-meal.html',
  styleUrl: './edit-meal.css'
})

export class EditMeal implements OnInit{

  public editForm!: FormGroup;
  meal!: Meal;
  submitted = false;
  message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    // Retrieve stashed meal ID
    let mealCode = localStorage.getItem("mealCode");
    if (!mealCode) {
      alert("Something wrong, couldn't find where I stashed mealCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTrip::ngOnInit');
    console.log('mealCode: ' + mealCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      image: ['', Validators.required],
      name_detail: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripData.getMeal(mealCode)
      .subscribe({
        next: (value: any) => {
          this.meal = value;
          // Populate our record into the form
          this.editForm.patchValue(value);
          if(!value)
          {
            this.message = 'No Meal Retrieved!';
          }
          else {
            this.message = 'Meal: ' + mealCode + ' retrieved!';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  public onSubmit()
  {
    this.submitted = true;

    if(this.editForm.valid)
    {
      this.tripData.updateMeal(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['meal-listing']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  // get the short form name to access the form fields
  get f() { return this.editForm.controls; }

}
