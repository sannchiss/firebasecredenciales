import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutivesComponent } from './executives.component';

describe('ExecutivesComponent', () => {
  let component: ExecutivesComponent;
  let fixture: ComponentFixture<ExecutivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
