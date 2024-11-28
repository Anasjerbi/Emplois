import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Password2Component } from './password2.component';

describe('Password2Component', () => {
  let component: Password2Component;
  let fixture: ComponentFixture<Password2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Password2Component]
    });
    fixture = TestBed.createComponent(Password2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
