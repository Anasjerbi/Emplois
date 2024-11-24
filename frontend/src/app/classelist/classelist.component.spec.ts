import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasselistComponent } from './classelist.component';

describe('ClasselistComponent', () => {
  let component: ClasselistComponent;
  let fixture: ComponentFixture<ClasselistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasselistComponent]
    });
    fixture = TestBed.createComponent(ClasselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
