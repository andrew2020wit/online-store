import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Loadding, error view
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  errorMessage$ = new BehaviorSubject<string>('');
  constructor() {}
}
