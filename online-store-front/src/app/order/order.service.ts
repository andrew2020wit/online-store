import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../auth-module/auth.service';
import { QueryEntityDto } from '../global-interface/dto/query-entity.dto';
import { baseApiUrl } from './../../environments/environment';
import { AuthService } from './../auth-module/auth.service';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
import { OrderHeader, OrderItem } from './dto/order.dto';
import { OrdersEntity } from './entity/orders.entity';

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

  cartIsOpen$ = new BehaviorSubject<boolean>(false);

  appUser: IUser; // ???

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.authService.appUser$.subscribe((user) => {
      this.appUser = user;
    });
    this.loadOrderItemsMap();
    this.orderItemsMap$.subscribe((map) => {
      this.saveOrderItemsMap();
    });
  }
  private setDefaultState() {
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
  }

  private saveOrderItemsMap() {
    if (!this.orderItemsMap) {
      localStorage.removeItem(keyLocalStorItems);
      return;
    }
    const arr = [];
    this.orderItemsMap.forEach((value, key) => {
      arr.push([key, value]);
    });
    localStorage.setItem(keyLocalStorItems, JSON.stringify(arr));
  }

  private loadOrderItemsMap() {
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

  computeOrderResults(itemMap: Map<string, OrderItem>) {
    let itemCount = 0;
    let orderSum = 0;
    itemMap.forEach((item) => {
      if (item.count > 0) {
        itemCount = itemCount + 1;
        orderSum = orderSum + item.count * item.price;
      }
    });

    return { itemCount, orderSum };
  }

  buildOrder(
    orderItems: OrderItem[],
    address: string,
    userNote: string,
    user: IUser
  ): OrdersEntity {
    const order = new OrdersEntity();
    order.deliverAddress = address;
    order.userId = user.id;
    order.userNote = userNote;
    order.items = [];
    orderItems.forEach((item) => {
      if (item.count > 0) {
        order.items.push(item);
      }
    });
    return order;
  }

  sendOrder(order: OrdersEntity) {
    const endPoint = baseApiUrl + '/api/order';
    return this.httpClient.put<StatusMessageDto>(endPoint, order);
  }

  getOrders(takeN, dateAfter) {
    const endPoint = baseApiUrl + '/api/order/query';
    const query: QueryEntityDto = {
      maxItemCount: takeN,
      createdOnLessThan: dateAfter,
    };
    return this.httpClient.post<OrdersEntity[]>(endPoint, query);
  }
  clearCart() {
    this.setDefaultState();
  }
}
