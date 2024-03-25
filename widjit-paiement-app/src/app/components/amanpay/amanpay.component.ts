import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-amanpay',
  templateUrl: './amanpay.component.html',
  styleUrls: ['./amanpay.component.css']
})
export class AmanpayComponent implements OnInit {
  prix: number | undefined; // Déclaration de la propriété prix

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Code that relies on window object should be placed here
      // For example:
      // console.log(window.innerWidth);
    }
  }
}
