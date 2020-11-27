import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../auth-module/auth.service';
import { baseApiUrl } from './../../environments/environment';
import { AuthService } from './../auth-module/auth.service';
import { OrderHeader, OrderItem } from './dto/order.dto';

const keyLocalStorItems = 'keyLocalStorItems';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderHeader: OrderHeader;
  orderItemsMap = new Map<string, OrderItem>();
  orderItemsMap$ = new BehaviorSubject<Map<string, OrderItem>>(
    this.orderItemsMap
  );

  putEndPoint = baseApiUrl + '/api/orders';

  appUser: IUser; // ???

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.authService.appUser$.subscribe((user) => {
      this.appUser = user;
    });
    this.loadOrderItemsMap();
  }
  setDefaultState() {
    this.orderItemsMap.clear();
    this.orderItemsMap$.next(this.orderItemsMap);

    const newOrderHeader = new OrderHeader();
    newOrderHeader.deliverAddress = '';
    newOrderHeader.status = '';
    newOrderHeader.userNote = '';
    newOrderHeader.userId = '';
    this.orderHeader = newOrderHeader;
  }

  setOrderItem(item: OrderItem) {
    if (item.count < 0) {
      this.orderItemsMap.delete(item.goodsId);
    } else {
      this.orderItemsMap.set(item.goodsId, item);
    }
    this.orderItemsMap$.next(this.orderItemsMap);
    this.saveOrderItemsMap();
  }

  saveOrderItemsMap() {
    if (!this.orderItemsMap) {
      return;
    }
    const arr = [];
    this.orderItemsMap.forEach((value, key) => {
      arr.push([key, value]);
    });
    localStorage.setItem(keyLocalStorItems, JSON.stringify(arr));
  }

  loadOrderItemsMap() {
    const jsonItemMap = localStorage.getItem(keyLocalStorItems);

    if (jsonItemMap) {
      const arr = JSON.parse(jsonItemMap) as Array<[string, OrderItem]>;
      const map = new Map<string, OrderItem>(arr);
      this.orderItemsMap = map;
      this.orderItemsMap$.next(map);
    } else {
      this.setDefaultState();
    }
  }

  isValidOrder() {
    // if (!this.orderItems) {
    //   return false;
    // }
    // // if (this.orderHeader.deliverAddress == ''){return false}
    return true;
  }

  sendOrder() {
    // if (!this.isValidOrder) {
    //   console.error('Order not valid');
    //   return;
    // }
    // const newOrder = new OrderDto();
    // newOrder.header = this.orderHeader;
    // return this.httpClient.put<StatusMessageDto>(this.putEndPoint, newOrder);
  }
}
