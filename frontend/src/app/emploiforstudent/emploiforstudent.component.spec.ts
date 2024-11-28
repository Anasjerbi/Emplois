import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiforstudentComponent } from './emploiforstudent.component';

describe('EmploiforstudentComponent', () => {
  let component: EmploiforstudentComponent;
  let fixture: ComponentFixture<EmploiforstudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploiforstudentComponent]
    });
    fixture = TestBed.createComponent(EmploiforstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
