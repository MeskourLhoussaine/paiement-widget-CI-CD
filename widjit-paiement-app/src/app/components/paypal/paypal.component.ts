import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../service/data.service';

declare var paypal: any; // Déclarer la variable PayPal

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements AfterViewInit {
  orderAmount: string;
  currency: string;

  constructor(private http: HttpClient, public dataService: DataService) {
    this.orderAmount =
      this.dataService.amount !== undefined
        ? String(this.dataService.amount)
        : '';
    this.currency =
      this.dataService.currency !== undefined
        ? String(this.dataService.currency)
        : '';
  }

  ngAfterViewInit(): void {
    this.loadPayPalScript()
      .then(() => {
        this.renderPayPalButton();
      })
      .catch((err) => {
        console.error('PayPal SDK could not be loaded.', err);
      });
  }

  loadPayPalScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (document.getElementById('paypal-sdk')) {
        resolve(); // Le script est déjà chargé
        return;
      }
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AQsskPCpoYP2GYdQ-Y80H4irkP6BQnUjfitVD2Xwep3quqrzOJPREizLZdJzO9tWS6YQk3O2kLtq05OB&currency=USD'; // Remplacez YOUR_CLIENT_ID par votre identifiant client PayPal
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Le script PayPal SDK n'a pas pu être chargé."));
      document.body.appendChild(script);
    });
  }

  renderPayPalButton(): void {
    if (paypal) {
      paypal
        .Buttons({
          style: {
            layout: 'horizontal',
            color: 'blue',
            label: 'pay',
            height: 40,
          },
          createOrder: (data: any, actions: any) => {
            return this.http
              .post<any>('/demo/checkout/api/paypal/order/create/', {
                amount: this.orderAmount,
                currency: this.currency,
              })
              .toPromise()
              .then((order) => {
                if (order && order.id) {
                  return order.id;
                }
                throw new Error('Échec de la création de la commande');
              })
              .catch((err) => {
                console.error('Erreur de création de commande', err);
                throw err;
              });
          },
          onApprove: (data: any, actions: any) => {
            return this.http
              .post<any>(
                '/demo/checkout/api/paypal/order/' + data.orderID + '/capture/',
                {
                  paymentId: data.orderID,
                  payerId: data.payerID,
                }
              )
              .toPromise()
              .then((details) => {
                alert(
                  'Transaction complétée par ' + details.payer.name.given_name
                );
                // Rediriger ou afficher un message de confirmation
              })
              .catch((err) => {
                console.error("Erreur d'exécution du paiement", err);
                // Gérer l'erreur d'exécution du paiement ici
              });
          },
          onError: (err: any) => {
            console.error('Erreur du bouton PayPal', err);
          },
        })
        .render('#paypal-button-container');
    } else {
      console.error("Le SDK PayPal n'est pas chargé");
    }
  }
}
