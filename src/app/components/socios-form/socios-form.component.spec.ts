import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosFormComponent } from './socios-form.component';

describe('SociosFormComponent', () => {
  let component: SociosFormComponent;
  let fixture: ComponentFixture<SociosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SociosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
