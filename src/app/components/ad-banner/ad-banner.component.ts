// ad-banner.component.ts
import { Component, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="!hasAdError">
      <ins class="adsbygoogle"
           style="display:block"
           [attr.data-ad-client]="adClient"
           [attr.data-ad-slot]="adSlot"
           [attr.data-ad-format]="adFormat"
           data-full-width-responsive="true"></ins>
    </ng-container>
  `,
})
export class AdBannerComponent implements AfterViewInit {
  @Input() adClient!: string;
  @Input() adSlot!: string;
  @Input() adFormat = 'auto';

  hasAdError = false;

  ngAfterViewInit(): void {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.warn('AdSense blocked or failed to load:', e);
      this.hasAdError = true;
    }
  }
}
