import { Option } from '../../../model/option/option.module';
import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { SlideConfig } from '../../../model/slide-config.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.css']
})/*jjk*/
export class SteperComponent implements OnInit, AfterViewInit {
  
  selectedItemIndex: number = -1;
  items: Option[] = [
    { id: 1, name: 'Master Card', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/master-card-icon.png' },
    { id: 2, name: 'Visa', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visa-icon.png' },
    { id: 3, name: 'Token', url: 'https://uxwing.com/wp-content/themes/uxwing/download/education-school/t-alphabet-round-icon.png' },
    { id: 4, name: 'Pay direct', url: 'https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/credit-card-color-icon.png' },
    { id: 5, name: 'Apple Pay', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/apple-pay-icon.png' },
    { id: 6, name: 'Aman pay', url: 'https://uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/safe-icon.png' },
    { id: 7, name: 'Paypal', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paypal-color-icon.png' },
  ];

  dots: number[] = [];
  activeSlideID = 1;

  @ContentChild('template')
  template: TemplateRef<any> | undefined;

  @Output('select')
  onSelect: EventEmitter<string> = new EventEmitter<string>()

  @ViewChild('slideContainer')
  slideContainer!: ElementRef;

  @Input('slideConfig')
  slideConfig = new SlideConfig();

  @Output() optionClicked = new EventEmitter<number>();


  sliderContainerWidth = 0;
  slideWidth = 0;
  elementsToShow = 1;
  sliderWidth = 0;

  sliderMarginLeft = 0;
  isSlidesOver: boolean | undefined;

  @HostListener('window:resize', ['$event'])
  onScreenResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.setUpSlider();
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.dots);
    }
  }

  getItems() {
    return this.items as any[]
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setUpSlider();
    }
  }

  setUpSlider() {
    if (isPlatformBrowser(this.platformId)) {
      const windowWidth = window.innerWidth;
      const breakpoints = this.slideConfig.breakpoints;
      const itemsLength = this.items.length;
  
      if (windowWidth < 500)
        this.elementsToShow = breakpoints.sm;
      else if (windowWidth < 900)
        this.elementsToShow = breakpoints.md;
      else
        this.elementsToShow = breakpoints.lg;
  
      if (this.items.length < this.elementsToShow) {
        this.elementsToShow = this.items.length;
      }
  
      this.elementsToShow = Math.min(this.elementsToShow, itemsLength);
  
      this.dots = Array(itemsLength - this.elementsToShow + 1);
  
      const container = this.slideContainer.nativeElement as HTMLElement;
      this.sliderContainerWidth = container.clientWidth;
      this.slideWidth = this.sliderContainerWidth / this.elementsToShow;
      this.sliderWidth = this.slideWidth * itemsLength;
  
      if (this.slideConfig.autoPlay) this.autoPlay();
    }
  }

  prev() {
    if (this.activeSlideID === 1) {
      return;
    }
    this.activeSlideID--;
    this.sliderMarginLeft = this.sliderMarginLeft + this.slideWidth;
  }

  next() {
    const notShowingElementsCount = this.items.length - this.elementsToShow;
    const possibleMargin = -(notShowingElementsCount * this.slideWidth);
    if (this.sliderMarginLeft <= possibleMargin) {
      this.isSlidesOver = true;
      return
    }
    this.isSlidesOver = false;
    this.activeSlideID++;
    this.sliderMarginLeft = this.sliderMarginLeft - this.slideWidth;
  }

  move(slideID: number) {
    let difference = slideID - this.activeSlideID;
    if (difference > 0) {
      // Next
      for (let index = 0; index < difference; index++) {
        this.next()
      }
    } else if (difference < 0) {
      //prev
      for (let index = 0; index < Math.abs(difference); index++) {
        this.prev()
      }
    }
  }

  autoPlay() {
    setTimeout(() => {
      if (this.isSlidesOver === true) {
        this.sliderMarginLeft = this.slideWidth;
      }
      this.next()
      this.autoPlay()
    }, 1000);
  }

  handleOptionClick(index: number) {
    this.optionClicked.emit(index);
    this.selectedItemIndex = index;
  }

  moveToSlide(slideID: number) {
    this.activeSlideID = slideID;
    this.move(slideID);
  }

}
