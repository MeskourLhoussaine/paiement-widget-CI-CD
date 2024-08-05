import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateHttpLoaderService implements TranslateLoader {
  constructor(
    private http: HttpClient,
    @Inject(String) private prefix: string = './assets/i18n/',
    @Inject(String) private suffix: string = '.json'
  ) {}
  
  public getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoaderService(http);
}