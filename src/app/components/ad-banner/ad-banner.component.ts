// src/app/components/ad-banner/ad-banner.component.ts
import { Component, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdBannerComponent implements AfterViewInit {
  @Input() adClient!: string;
  @Input() adSlot!: string;
  @Input() adFormat: string = 'auto';

  ngAfterViewInit(): void {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error('Erro ao renderizar anúncio AdSense:', e);
    }
  }
}
