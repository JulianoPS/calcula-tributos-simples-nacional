import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosFormComponent } from './funcionarios-form.component';

describe('FuncionariosFormComponent', () => {
  let component: FuncionariosFormComponent;
  let fixture: ComponentFixture<FuncionariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
