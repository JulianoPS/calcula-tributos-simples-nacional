import { bootstrapApplication } from '@angular/platform-browser';
import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode } from 'ngx-currency';  // ← import
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideNgxMask }        from 'ngx-mask';
import { API_BASE_URL } from './app/api.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNgxMask(),
    provideEnvironmentNgxCurrency({           // ← configurações globais
      align: 'right',                         // alinhamento do texto
      allowNegative: true,                    // permite valores negativos
      decimal: ',',                            // separador decimal padrão Brasil
      precision: 2,                            // 2 casas decimais
      prefix: '',                              // sem prefixo "R$"
      thousands: '.',                          // separador de milhar
      nullable: false,                         // valor vazio vira 0
      inputMode: NgxCurrencyInputMode.Natural  // digitação natural
    }),
   { 
      provide: API_BASE_URL, useValue: '/apisn/api' 
      //provide: API_BASE_URL, useValue: 'https://jpstecdev.com.br/apisn/api' 
   }
  ]
}).catch(err => console.error(err));
