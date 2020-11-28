import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../auth-module/auth.service';
import { baseApiUrl } from './../../environments/environment';
import { AuthService } from './../auth-module/auth.service';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
import { OrderDto, OrderHeader, OrderItem } from './dto/order.dto';

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

  isValidOrder() {
    // if (!this.orderItems) {
    //   return false;
    // }
    // // if (this.orderHeader.deliverAddress == ''){return false}
    return true;
  }

  buildOrder(
    orderItems: OrderItem[],
    address: string,
    userNote: string,
    user: IUser
  ): OrderDto {
    const order = new OrderDto();
    order.header = {
      deliverAddress: address,
      userId: user.id,
      userNote: userNote,
    };
    order.body = [];
    orderItems.forEach((item) => {
      if (item.count > 0) {
        order.body.push(item);
      }
    });
    return order;
  }

  sendOrder(orderDto: OrderDto) {
    return this.httpClient.put<StatusMessageDto>(this.putEndPoint, orderDto);
  }
}
