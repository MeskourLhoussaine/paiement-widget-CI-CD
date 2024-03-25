import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  amount: number = 1000;
  name: string = 'Louis';
  lastName: string = 'MEskour';
  email: string = 'louis@';
  constructor() { }

  closeWidget() {
    // Mettez ici le code pour fermer le widgetjd
    console.log("Widget fermé !");
  }
  ngOnInit(): void {
    // Vous pouvez initialiser des données supplémentaires ici si nécessaire
  }

}
