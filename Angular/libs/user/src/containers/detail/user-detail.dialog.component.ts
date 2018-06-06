import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './user-detail.dialog.component.html',
  styleUrls: ['./user-detail.dialog.component.scss']
})
export class UserDetailDialogComponent implements OnInit {

  @ViewChild('userName')
  public userName;

  @ViewChild('firstName')
  public firstName;

  @ViewChild('lastName')
  public lastName;

  @ViewChild('email')
  public email;

  @ViewChild('uploadInput')
  public uploadInput;

  @ViewChild('avatar')
  public avatar;

  @ViewChild('image')
  public image;

  public editMode = false;
  public rolesControl = this._formBuilder.control(this.user.roles);
  public emailControl = this._formBuilder.control(this.user.email);

  private _reader = new FileReader();

  constructor(
    @Inject(MAT_DIALOG_DATA) public user,
    private _dialogRef: MatDialogRef<UserDetailDialogComponent>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._reader.addEventListener('load', () => {
      this.avatar.nativeElement.style.backgroundImage = `url(${this._reader.result})`;
      this.image.nativeElement.style.background =
      `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${this._reader.result})`;
    });
  }

  public fileChanged(event: any): void {
    this._reader.readAsDataURL(event.target.files[0]);
  }

  public saveOnClose(): void {

    const updateProfile = {
      id: this.user.id,
      username: this.userName.nativeElement.innerText,
      firstName: this.firstName.nativeElement.innerText,
      lastName: this.lastName.nativeElement.innerText,
      email: this.emailControl.value,
      roles: this.rolesControl.value,
      profileImageURL: this._reader.result || this.user.profileImageURL
    };

    this._dialogRef.close(updateProfile);
  }

}
