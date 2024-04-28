import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf,HomeComponent],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{
  
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    
  }
  reservationForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      let reservation = this.reservationService.getReservation(id);

      if(reservation)
        this.reservationForm.patchValue(reservation);
    }
  }


  onSubmit(){
    if(this.reservationForm.valid){
      let reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.reservationService.updateReservation(id,reservation)

      }else {
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }
}
