import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paiment-wedgit',
  templateUrl: './paiment-wedgit.component.html',
  styleUrls: ['./paiment-wedgit.component.css']
})
export class PaimentWedgitComponent {
  selectedOptionIndex: number | undefined;

  handleOptionClicked(index: number) {
    console.log('Index of clicked option:', index);
    this.selectedOptionIndex = index;
    console.log('selected',this.selectedOptionIndex);
  }

  ////////////////////////////redirect close button//////////////////////////////////

  redirectUrl: string = "https://github.com/MeskourLhoussaine/amanpay-front-w";

  constructor(private router: Router) {}

  redirectToUrl() {
    window.location.href = this.redirectUrl;
  }
}
