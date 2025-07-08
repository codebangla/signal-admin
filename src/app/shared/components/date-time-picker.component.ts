import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="flex space-x-2">
      <mat-form-field appearance="outline" class="flex-1">
        <mat-label>{{ label }}</mat-label>
        <input matInput [matDatepicker]="picker" [value]="date" (dateChange)="onDateChange($event.value)">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-32">
        <mat-label>Time</mat-label>
        <input matInput type="time" [value]="time" (input)="onTimeChange($event.target.value)">
      </mat-form-field>
    </div>
  `
})
export class DateTimePickerComponent {
  @Input() label = 'Select Date & Time';
  @Input() value: Date | null = null;
  @Output() dateTimeChange = new EventEmitter<Date | null>();

  get date(): Date | null {
    return this.value ? new Date(this.value) : null;
  }
  get time(): string {
    if (!this.value) return '';
    const h = this.value.getHours().toString().padStart(2, '0');
    const m = this.value.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  onDateChange(date: Date | null) {
    if (!date) {
      this.dateTimeChange.emit(null);
      return;
    }
    const current = this.value || new Date();
    date.setHours(current.getHours(), current.getMinutes());
    this.dateTimeChange.emit(date);
  }
  onTimeChange(time: string) {
    if (!this.value) return;
    const [h, m] = time.split(':').map(Number);
    const newDate = new Date(this.value);
    newDate.setHours(h, m);
    this.dateTimeChange.emit(newDate);
  }
} 