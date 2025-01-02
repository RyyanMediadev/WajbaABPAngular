import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AfterActionService } from 'src/app/services/after-action/after-action-service.service';
import { IconsComponent } from "../../../../shared/icons/icons.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsSidebarComponent } from "../../settings-sidebar/settings-sidebar.component";
import { TableComponent } from "../../../../shared/table/table.component";
import { ConfirmDeleteModalComponent } from 'src/app/shared/confirm-delete-modal/confirm-delete-modal.component';
import { CreateUpdateItemTaxDto } from '@proxy/dtos/item-tax-contract';
import { AddTaxesComponent } from '../add-taxes/add-taxes.component';
import { ItemTaxService } from '@proxy/controllers';
import { PagedAndSortedResultRequestDto } from '@abp/ng.core';

@Component({
  selector: 'app-taxes',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsComponent, SettingsSidebarComponent, TableComponent],
  templateUrl: './taxes.component.html',
  styleUrl: './taxes.component.scss'
})
export class TaxesComponent {
  isModalOpen: boolean = false;
  isMenuOpen: boolean = false;
  taxes: CreateUpdateItemTaxDto[] = [];
  selectedCurrency: CreateUpdateItemTaxDto | null = null;

  isConfirmDeleteModalOpen: boolean = false;
  currencyToDeleteId!: number;

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'taxRate', header: 'Tax Rate' },
    { field: 'code', header: 'Code' },
    { field: 'status', header: 'Status' }
  ];

  actions = [
    {
      icon: 'assets/images/edit.svg',
      tooltip: 'Edit',
      show: (row: any) => true,
      callback: (row: any) => this.openAddEditModal(row),
    },
    {
      icon: 'assets/images/delete.svg',
      tooltip: 'Delete',
      show: (row: any) => row.status === 1, // Show only for active taxes
      callback: (row: any) => this.openConfirmDeleteModal(row.id, row.name),
    },
  ];


  constructor(
    private itemTaxService: ItemTaxService,
    private afterActionService: AfterActionService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies() {
    const defaultInput: PagedAndSortedResultRequestDto = {
      sorting: '',
      skipCount: 0,
      maxResultCount: 10
    };

    this.itemTaxService.getList(defaultInput).subscribe((response: any) => {
      if (response) {
        this.taxes = response.data;
        console.log("tax : " + response.data)
      } else {
        console.error('The response is not an array:', response);
        this.taxes = [];
      }
    }, (error) => {
      console.error('Failed to load taxes:', error);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openAddEditModal(tax?: CreateUpdateItemTaxDto): void {
    const modalRef = this.modalService.open(AddTaxesComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.tax = tax || null;

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.result
      .then((result) => {
        if (result === 'saved') {
          this.loadCurrencies();
        }
      })
      .catch((reason) => {
        console.log('Modal dismissed:', reason);
      });
  }

  openConfirmDeleteModal(taxId: number, taxName: string): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    // Pass data to the modal instance
    modalRef.componentInstance.id = taxId;
    modalRef.componentInstance.name = taxName;

    // Handle modal result
    modalRef.componentInstance.confirmDelete.subscribe((id) => {
      this.deleteCurrency(id); // Call the delete method with the tax ID
    });

    modalRef.componentInstance.cancelDelete.subscribe(() => {
      modalRef.close(); // Close modal on cancel
    });
  }

  deleteCurrency(id: number): void {
    this.itemTaxService.delete(id).subscribe(() => {
      console.log(`Currency with id: ${id} deleted successfully.`);
      this.afterActionService.reloadCurrentRoute();
    }, (error) => {
      console.error('Failed to delete currency:', error);
    });
  }
}
