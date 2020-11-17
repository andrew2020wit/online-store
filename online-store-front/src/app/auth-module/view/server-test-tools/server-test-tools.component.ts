import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseApiUrl } from '../../../../environments/environment';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-server-test-tools',
  templateUrl: './server-test-tools.component.html',
  styleUrls: ['./server-test-tools.component.scss'],
})
export class ServerTestToolsComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {}

  RegenerateTestServerData(): void {
    this.http
      .get(baseApiUrl + '/api/test/regenerate-test-data')
      .subscribe((x) => {
        console.log('RegenerateTestServerData: ', x);
      });
    this.authService.logout();
  }

  // http://127.0.0.1:3001/api/test/regenerate-goods-test-data
  RegenerateTestGoodsServerData(): void {
    this.http
      .get(baseApiUrl + '/api/test/regenerate-goods-test-data')
      .subscribe((x) => {
        console.log('RegenerateTestGoodsServerData: ', x);
      });
  }
}
