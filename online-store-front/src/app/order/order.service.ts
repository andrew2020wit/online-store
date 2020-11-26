import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../auth-module/auth.service';
import { baseApiUrl } from './../../environments/environment.prod';
import { AuthService } from './../auth-module/auth.service';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
import { OrderDto, OrderHeader, OrderItem } from './dto/order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderHeader: OrderHeader;
  orderItems: OrderItem[];
  putEndPoint = baseApiUrl + '/api/orders';

  appUser: IUser; // ???

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.authService.appUser$.subscribe((user) => {
      this.appUser = user;
    });
    this.setDefaultState();
  }
  setDefaultState() {
    this.orderItems = [];
    this.orderHeader = null;
    this.orderHeader.deliverAddress = '';
    this.orderHeader.status = '';
    this.orderHeader.userNote = '';
    this.orderHeader.userId = '';
  }

  addGoods(goodsId: string, price: number, count: number) {
    const newItem = new OrderItem();
    newItem.count = count;
    newItem.goodsId = goodsId;
    newItem.isCanceled = false;
    newItem.price = price;
    this.orderItems.push(newItem);
  }

  cancelGoods(index: number) {
    this.orderItems[index].isCanceled = true;
  }

  reCancelGoods(index: number) {
    this.orderItems[index].isCanceled = false;
  }

  updateCount(index: number, count: number) {
    this.orderItems[index].count = count;
  }

  isValidOrder() {
    if (!this.orderItems) {
      return false;
    }
    // if (this.orderHeader.deliverAddress == ''){return false}
    return true;
  }

  sendOrder() {
    if (!this.isValidOrder) {
      console.error('Order not valid');
      return;
    }
    const newOrder = new OrderDto();
    newOrder.header = this.orderHeader;
    newOrder.body = this.orderItems;

    return this.httpClient.put<StatusMessageDto>(this.putEndPoint, newOrder);
  }
}
