import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  template: '{{ data }}'
})
export class UserSnackComponent {

  @HostBinding('class.mat-typography')
  matTypo(): boolean {
    return true;
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
