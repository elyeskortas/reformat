// event-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        response => {
          // Handle success response
          console.log('Event created successfully:', response);
        },
        error => {
          // Handle error response
          this.errorMessage = 'Failed to create event: ' + (error.message || 'Unknown error');
        }
      );
    }
  }
}
