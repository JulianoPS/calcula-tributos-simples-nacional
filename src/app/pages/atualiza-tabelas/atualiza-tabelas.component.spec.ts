import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaTabelasComponent } from './atualiza-tabelas.component';

describe('AtualizaTabelasComponent', () => {
  let component: AtualizaTabelasComponent;
  let fixture: ComponentFixture<AtualizaTabelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizaTabelasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizaTabelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
