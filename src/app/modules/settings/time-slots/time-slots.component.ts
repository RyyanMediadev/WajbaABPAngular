import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsComponent } from "../../../shared/icons/icons.component";
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeSlotsModalComponent } from "../../../shared/time-slots-modal/time-slots-modal.component";

@Component({
  selector: 'app-time-slots',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsComponent,
    SettingsSidebarComponent,
  ],
  templateUrl: './time-slots.component.html',
  styleUrls: ['./time-slots.component.scss']
})
export class TimeSlotsComponent implements OnInit {
  isModalOpen: boolean = false;
  weekDayTimeSlots: { weekDay: number; timeSlots: { id: number; openingTime: string; closingTime: string }[] }[] = [];
  weekDayIdForModal!: number;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTimeSlots();
  }

  // Initialize static time slot data
  getTimeSlots(): void {
    this.weekDayTimeSlots = [
      {
        weekDay: 1,
        timeSlots: [
          { id: 1, openingTime: '09:00', closingTime: '12:00' },
          { id: 2, openingTime: '13:00', closingTime: '17:00' }
        ]
      },
      {
        weekDay: 2,
        timeSlots: [
          { id: 1, openingTime: '10:00', closingTime: '14:00' }
        ]
      },
      {
        weekDay: 3,
        timeSlots: [
          { id: 1, openingTime: '08:00', closingTime: '11:00' },
          { id: 2, openingTime: '12:00', closingTime: '16:00' }
        ]
      }
    ];
  }

  // Save updated time slots
  onSave(): void {
    console.log("Updated Weekday Time Slots:", this.weekDayTimeSlots);
    alert('Time slots saved successfully!');
  }

  // Get the weekday name based on number (1-7)
  getWeekDayName(weekDay: number): string {
    const weekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    return weekDays[weekDay - 1]; // Adjust the index for 1-7
  }

  // Open the modal to add or edit a time slot
  openModal(weekDayId: number): void {
    this.weekDayIdForModal = weekDayId;
    const weekDay = this.weekDayTimeSlots.find(day => day.weekDay === weekDayId);
    const modalRef = this.modalService.open(TimeSlotsModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.weekDayId = weekDayId;
    modalRef.componentInstance.timeSlots = weekDay?.timeSlots || [];

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.componentInstance.saveTimeSlot.subscribe((timeSlotData) => {
      this.addNewTimeSlot(timeSlotData, weekDayId);
      modalRef.close();
    });
  }

  // Add a new time slot to the selected weekday
  addNewTimeSlot(newSlot: { openingTime: string; closingTime: string }, weekDayId: number): void {
    const weekDay = this.weekDayTimeSlots.find(day => day.weekDay === weekDayId);
    if (weekDay) {
      const newSlotId = this.getNextSlotId(weekDay.timeSlots);
      weekDay.timeSlots.push({ id: newSlotId, ...newSlot });
    }
  }

  // Generate the next slot ID
  private getNextSlotId(timeSlots: { id: number }[]): number {
    return timeSlots.length > 0 ? Math.max(...timeSlots.map(slot => slot.id)) + 1 : 1;
  }

  // Delete a specific time slot
  deleteTimeSlot(weekDayId: number, slotId: number): void {
    const weekDay = this.weekDayTimeSlots.find(day => day.weekDay === weekDayId);
    if (weekDay) {
      weekDay.timeSlots = weekDay.timeSlots.filter(slot => slot.id !== slotId);
    }
  }
}
