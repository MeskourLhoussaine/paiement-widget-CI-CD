import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './service/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currentLang: string;
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    public dataService: DataService
  ) {
    // Initialiser la langue par défaut
    this.translate.setDefaultLang('fr');
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;

    // Mettre à jour la langue actuelle lors du changement
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.dataService.accessKey = params['access_key'];
      this.dataService.host = params['host'];
      this.dataService.setMarchandId(params['marchand_id']);
      this.dataService.marchandId = params['marchand_id'];
      this.dataService.orderId = params['order_id'];
      this.dataService.amount = params['amount'];
      this.dataService.currency = params['currency'];
      this.dataService.hmac = params['hmac'];
      this.dataService.setMarchandId(params['marchand_id']);
    });
  }
}
/*dd*/