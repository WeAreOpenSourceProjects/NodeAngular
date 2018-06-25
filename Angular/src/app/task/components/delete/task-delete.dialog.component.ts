import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  templateUrl: './task-delete.dialog.component.html'
})
export class TaskDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
