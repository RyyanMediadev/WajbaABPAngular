import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderSetupService } from '@proxy/controllers';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";
import { TimeSlotsModalComponent } from 'src/app/shared/time-slots-modal/time-slots-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-setup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SettingsSidebarComponent],
  templateUrl: './order-setup.component.html',
  styleUrl: './order-setup.component.scss'
})
export class OrderSetupComponent implements OnInit {
  orderForm: FormGroup;
  isModalOpen = false;  // Track modal visibility
  modalTitle: string = '';  // Modal title (onTime, warning, delayTime)
  modalOpeningTime: string | null = null;  // Store opening time as string
  modalClosingTime: string | null = null;  // Store closing time as string
  currentField: string = '';  // To track which field is being edited

  constructor(
    private fb: FormBuilder,
    private orderSetupService: OrderSetupService,
    private modalService: NgbModal

  ) {
    this.orderForm = this.fb.group({
      foodPreparationTime: [null, [Validators.required]],
      orderSlotDuration: [null, [Validators.required]],
      takeaway: [true, [Validators.required]],
      delivery: [true, [Validators.required]],
      freeDeliveryKilometer: [null, [Validators.required]],
      basicDeliveryCharge: [null, [Validators.required]],
      chargePerKilo: [null, [Validators.required]],
      onTime: [null, [Validators.required]],
      warning: [null, [Validators.required]],
      delayTime: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchOrderSetup();
  }

  openTimeModal(field: string): void {
    const modalRef = this.modalService.open(TimeSlotsModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    const currentFieldValue = this.orderForm.get(field)?.value || {};

    modalRef.componentInstance.openingTime = currentFieldValue.openingTime || null;
    modalRef.componentInstance.closingTime = currentFieldValue.closingTime || null;
    modalRef.componentInstance.weekDayId = this.getWeekDayId(field);

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.componentInstance.saveTimeSlot.subscribe((timeSlotData) => {
      this.onSaveTimeSlot(timeSlotData, field);
      modalRef.close();
    });
  }

  onSaveTimeSlot(timeSlotData: { openingTime: string; closingTime: string; weekDayId: number }, field: string): void {
    const timeSlotString = `${timeSlotData.openingTime} - ${timeSlotData.closingTime}`;
    this.orderForm.patchValue({
      // [field]: {
      //   openingTime: timeSlotData.openingTime,
      //   closingTime: timeSlotData.closingTime
      // },
      [field]: timeSlotString // Update only the specific field
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveTime(openingTime: string, closingTime: string): void {
    if (this.modalOpeningTime && this.modalClosingTime) {
      this.orderForm.patchValue({
        [this.currentField]: {
          openingTime,
          closingTime
        }
      });
    }
    this.closeModal();
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderSetup = {
        foodPreparationTime: this.orderForm.value.foodPreparationTime,
        scheduleOrderSlotDuration: this.orderForm.value.orderSlotDuration,
        isTakeawayEnabled: this.orderForm.value.takeaway,
        isDeliveryEnabled: this.orderForm.value.delivery,
        freeDeliveryKilometer: this.orderForm.value.freeDeliveryKilometer,
        basicDeliveryCharge: this.orderForm.value.basicDeliveryCharge,
        chargePerKilo: this.orderForm.value.chargePerKilo
      };

      // Call service to save order setup (uncomment once service is implemented)
      // this.orderSetupService.updateOrderSetup(orderSetup).subscribe(...);
    }
  }

  fetchOrderSetup(): void {
    // Logic for fetching initial order setup if needed
  }

  getWeekDayId(field: string): number {
    // Logic to determine the week day ID based on the field
    return 1; // Replace with actual logic
  }
}
