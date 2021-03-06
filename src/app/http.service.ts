
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { UserData } from './two/two-child3/user-data.model';

import { HttpHeaders } from '@angular/common/http';

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

// 设置header ，angular5+的方法
export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class HttpService {
    constructor(
        @Inject('BASE_URL') private baseUrl,
        private http: Http
    ) { }
    toGet(id): Observable<UserData> {
        let url = this.baseUrl + `/${id}`;
        return this.http.get(url).map(res => res.json())
    }
    // ngrx：
    // createItem(item) {  // post请求，要记得加上 header
    //     let url = this.baseUrl + `/${item}`;
    //     this.http.post(`${url}`, JSON.stringify(item), HEADER)
    //         .map(res => res.json())
    //         .map(payload => ({ type: 'ADD_ITEMS', payload }))
    //         .subscribe(action => this.store.dispatch(action));
    // }
}