import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarServiceService {

  constructor() { }
  private PanierNbr= new Subject<any>();
  private UserState= new Subject<any>();
  publishSomeData(data: any) {
      this.PanierNbr.next(data);
  }

  getObservable(): Subject<any> {
      return this.PanierNbr;
  }

  publishSomeDataUserState(data: any) {
    this.UserState.next(data);
}

getObservableUserState(): Subject<any> {
    return this.UserState;
}

}
