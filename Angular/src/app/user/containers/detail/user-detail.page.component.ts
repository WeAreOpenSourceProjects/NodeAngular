import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserState } from '../../+state/user.interfaces';
import { selectSelectedUser, User } from 'src/app/user';
import { Store } from '@ngrx/store';
import { fromUser } from 'src/app/user';
import { Subject, Subscription } from 'rxjs';
import { withLatestFrom, tap, delay } from 'rxjs/operators';

@Component({
  templateUrl: './user-detail.page.component.html',
  styleUrls: ['./user-detail.page.component.scss']
})
export class UserDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {

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

  public update$ = new Subject();
  private _subscriptions: Subscription;

  public editMode = false;

  private _reader = new FileReader();

  public currentUser$ = this._store.select(selectSelectedUser);
  public user: User;
  public rolesControl = this._formBuilder.control([]);
  public emailControl = this._formBuilder.control('');

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<UserState>
  ) { }

  ngOnInit(): void {
    this._reader.addEventListener('load', () => {
      this.avatar.nativeElement.style.backgroundImage = `url(${this._reader.result})`;
      this.image.nativeElement.style.background =
      `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${this._reader.result})`;
    });
  }

  ngAfterViewInit(): void {

    const userSubscription = this.currentUser$.pipe(
      delay(0),
      tap((user: any) => {
        this.user = user;
        this.rolesControl.setValue(user.roles);
        this.emailControl.setValue(user.email);
      })
    )
    .subscribe();
    this._subscriptions = userSubscription;

    const updateSubscription = this.update$
    .pipe(
      withLatestFrom(this.currentUser$, (_click, user) => ({
        id: user.id,
        username: this.userName.nativeElement.innerText,
        firstName: this.firstName.nativeElement.innerText,
        lastName: this.lastName.nativeElement.innerText,
        email: this.emailControl.value,
        roles: this.rolesControl.value,
        profileImageURL: this._reader.result || user.profileImageURL
      }))
    )
    .subscribe((updatedProfile: any) => {
      this.editMode = false;
      this._store.dispatch(new fromUser.Update({
        user: {
          id: updatedProfile.id,
          changes: updatedProfile
        }
      }));
      this._subscriptions.add(updateSubscription);
    });
  }

  public fileChanged(event: any): void {
    this._reader.readAsDataURL(event.target.files[0]);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
