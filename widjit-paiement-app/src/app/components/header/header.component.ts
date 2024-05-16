import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { PlatformService } from '../../service/platform.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  imageUrl: string = '';

  constructor(
    public dataService: DataService,
    private platformService: PlatformService
  ) {}

  ngOnInit(): void {
    this.imageUrl = 'https://i.ibb.co/gFZGbV3/Logopng.png';
    if (this.platformService.isBrowser()) {
      this.toggleImage(false);
    }
  }

  reloadPage() {
    if (this.platformService.isBrowser()) {
      window.location.reload();
    }
  }

  toggleImage(hovering: boolean): void {
    if (this.platformService.isBrowser()) {
      if (window.innerWidth <= 1023) {
        this.imageUrl = 'https://i.ibb.co/7K50gbw/Pay-Pikpng.png';
      } else {
        if (hovering) {
          this.imageUrl = 'https://i.ibb.co/yyyD2SV/Logohover.png';
        } else {
          this.imageUrl = 'https://i.ibb.co/gFZGbV3/Logopng.png';
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.platformService.isBrowser()) {
      this.toggleImage(false);
    }
  }
}
