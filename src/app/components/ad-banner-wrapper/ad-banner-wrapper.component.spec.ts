import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBannerWrapperComponent } from './ad-banner-wrapper.component';

describe('AdBannerWrapperComponent', () => {
  let component: AdBannerWrapperComponent;
  let fixture: ComponentFixture<AdBannerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdBannerWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdBannerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
