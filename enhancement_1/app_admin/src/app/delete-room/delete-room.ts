import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../models/room';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-delete-room',
  imports: [],
  templateUrl: './delete-room.html',
  styleUrl: './delete-room.css'
})
export class DeleteRoom implements OnInit{

  constructor(
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    let roomCode = localStorage.getItem("roomCode");
    if (!roomCode) {
      alert("Something wrong, couldn't find where I stashed roomCode!");
      this.router.navigate(['']);
      return;
    }

    this.tripData.deleteRoom(roomCode)
      .subscribe({
        next: (roomCode: any) => {
          console.log(roomCode);
          this.router.navigate(['room-listing']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
}
