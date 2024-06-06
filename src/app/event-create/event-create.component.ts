import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  errorMessage: string | null = null;
  events: Event[] = [];
  ongoingEvents: Event[] = [];
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      photo: [null] // Add the 'photo' form control
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      events => {
        this.events = events;
        this.categorizeEvents();
      },
      error => {
        this.errorMessage = 'Failed to load events: ' + (error.message || 'Unknown error');
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  categorizeEvents(): void {
    const now = new Date();
    this.ongoingEvents = this.events.filter(event => new Date(event.startDate) <= now && new Date(event.endDate) >= now);
    this.upcomingEvents = this.events.filter(event => new Date(event.startDate) > now);
    this.pastEvents = this.events.filter(event => new Date(event.endDate) < now);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('name', this.eventForm.get('name')?.value);
      formData.append('description', this.eventForm.get('description')?.value);
      formData.append('dateStart', this.eventForm.get('dateStart')?.value);
      formData.append('dateEnd', this.eventForm.get('dateEnd')?.value);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }
      this.eventService.createEvent(formData).subscribe(
        response => {
          console.log('Event created successfully:', response);
          this.loadEvents();
        },
        error => {
          this.errorMessage = 'Failed to create event: ' + (error.message || 'Unknown error');
        }
      );
    }
  }

  // ... other methods ...
}
