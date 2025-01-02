import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string; header: string }[] = [];
  @Input() actions: {
    icon: string;
    tooltip: string;
    show: (row: any) => boolean;
    callback: (row: any) => void;
  }[] = [];

  @Output() actionTriggered = new EventEmitter<{ action: string; row: any }>();

  actionClicked(action: any, row: any) {
    action.callback(row);
    this.actionTriggered.emit({ action: action.tooltip, row });
  }
}
