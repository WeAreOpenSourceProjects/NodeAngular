import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { taskReducer } from '../../+state/task.reducer';
import { StoreModule } from '@ngrx/store';
import { TasksListComponent } from './tasks-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
        BrowserModule,
        HttpClientTestingModule,
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

  beforeEach(inject([MatIconRegistry, DomSanitizer], (matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    ['image', 'content', 'action'].forEach(iconSet =>
      matIconRegistry.addSvgIconSetInNamespace(
        iconSet,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`)
      )
    );

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
