import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { taskReducer } from '../../+state/task.reducer';
import { StoreModule } from '@ngrx/store';
import { TasksListComponent } from './tasks-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async(() => {

    const storeMock = {
      task: {
        ids: [],
        entities: {},
        loaded: true,
        loading: false
      }
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatCardModule,
        RouterTestingModule,
        StoreModule.forRoot({
          task: taskReducer
        }, { initialState: storeMock }),
        NoopAnimationsModule,
        FlexLayoutModule
      ],
      declarations: [TasksListComponent],
      providers: [
        { provide: MatDialog, useValue: { open: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
