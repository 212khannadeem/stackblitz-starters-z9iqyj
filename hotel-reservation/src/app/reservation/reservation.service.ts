import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private reservations: Reservation[] = [];

  //read
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation  | undefined {
    return this.reservations.find(res=> res.id === id);
  }

  // create
  addReservation(newReservation: Reservation) : void {
    this.reservations.push(newReservation);
  }

  // delete
}
