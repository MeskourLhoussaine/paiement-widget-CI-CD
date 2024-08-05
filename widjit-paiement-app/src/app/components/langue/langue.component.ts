import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrl: './langue.component.css'
})
export class LangueComponent { languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
 
  
];

constructor(private translate: TranslateService) {}

changeLanguage(event: Event) {
  const select = event.target as HTMLSelectElement;
  this.translate.use(select.value);
}}
