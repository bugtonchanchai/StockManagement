import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class WarehouseService {
    private url = 'http://localhost:8888/api/warehouse';

    constructor(private http: Http) { }

    getData() {
        return this.http.get(`${this.url}/show`).pipe(map(res => res.json().message));
    }

    addData(item: any) {
        const data = {
            name: item.name,
            upd_by: item.upd_by
        };
        return this.http.post(`${this.url}/add`, data).pipe(map(res => res.json().message));
    }

    updateData(item: any) {
        const data = {
            _id: item._id,
            name: item.name,
            upd_by: item.upd_by
        };
        return this.http.post(`${this.url}/update/`, data).pipe(map(res => res.json().message));
    }

    deleteData(item: string) {
        return this.http.delete(`${this.url}/delete/${item}`).pipe(map(res => res.json().message));
    }
}
