import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordaComponent } from './dashborda.component';

describe('DashbordaComponent', () => {
  let component: DashbordaComponent;
  let fixture: ComponentFixture<DashbordaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordaComponent]
    });
    fixture = TestBed.createComponent(DashbordaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
