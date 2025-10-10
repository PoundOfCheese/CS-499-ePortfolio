import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Room } from '../models/room';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-room.html',
  styleUrl: './edit-room.css'
})
export class EditRoom implements OnInit{

  public editForm!: FormGroup;
    room!: Room;
    submitted = false;
    message : string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    
    // Retrieve stashed trip ID
    let roomCode = localStorage.getItem("roomCode");
    if (!roomCode) {
      alert("Something wrong, couldn't find where I stashed roomCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditRoom::ngOnInit');
    console.log('roomCode:' + roomCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      rate: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripData.getRoom(roomCode)
      .subscribe({
        next: (value: any) => {
          this.room = value;
          // Populate our record into the form
          this.editForm.patchValue(value);
          if(!value)
          {
            this.message = 'No Room Retrieved!';
          }
          else {
            this.message = 'Room: ' + roomCode + ' retrieved';
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
      this.tripData.updateRoom(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['room-listing']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}
