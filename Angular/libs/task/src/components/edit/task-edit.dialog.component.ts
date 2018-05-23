import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  templateUrl: './task-edit.dialog.component.html',
  styleUrls: ['./task-edit.dialog.component.scss']
})
export class TaskEditDialogComponent {
  public taskForm = this._formBuilder.group({
    title: this._formBuilder.control(this.data.task && this.data.task.title || '', Validators.required),
    description: this._formBuilder.control(this.data.task && this.data.task.description || '', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder) { }

  onSubmit(): void {
    this.dialogRef.close({
      ...this.data.task,
      ...cloneDeep(this.taskForm.value)
    });
  }
}
