import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-banner-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-banner-wrapper.component.html',
  styleUrls: ['./ad-banner-wrapper.component.scss']
})
export class AdBannerWrapperComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    try {
      // Renderiza as duas caixas de anúncio
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.warn('AdSense script bloqueado ou falha ao carregar:', e);
    }
  }
}
