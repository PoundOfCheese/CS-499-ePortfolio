import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Room } from '../models/room';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css'
})

export class RoomCard implements OnInit{
  @Input('room') room: any;

  constructor(
      private router: Router,
      private authenticationService: Authentication
      ) {}
  
    ngOnInit(): void {
  
    }
  
    public editRoom(room: Room) {
      localStorage.removeItem('roomCode');
      localStorage.setItem('roomCode', room.code);
      this.router.navigate(['edit-room']);
    }
  
    public deleteRoom(room: Room) {
      localStorage.removeItem('roomCode');
      localStorage.setItem('roomCode', room.code);
      this.router.navigate(['delete-room']);
    }
  
    public isLoggedIn()
    {
      return this.authenticationService.isLoggedIn();
    }

}
