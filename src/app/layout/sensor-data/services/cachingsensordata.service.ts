//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuerystringBuilderService } from './querystringbuilder.service';
import { HttpClient } from '@angular/common/http';
import { NameValuePair } from '../../models/namevaluepair';
import { DataModel } from '../../models/datamodel';

@Injectable()
export class CachingSensorDataService {
    constructor(private http: HttpClient, private qsb: QuerystringBuilderService) { }


    private data: any[];
    private observable: Observable<any>;
    private calls: any[] = [];

    private sensorDataUrl = 'https://iotsensordata.azurewebsites.net/api/SensorData/';
     sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    public getData(dataSource: string, van: string, tot: string, forceGet: boolean = false): Observable<DataModel[]> {
        let url = this.sensorDataUrl.concat(dataSource);
        console.debug('in call van: ' + van + ', tot: ' + tot);

        let params: NameValuePair[] = [];
        if (van) {
            params.push(new NameValuePair('van', van));
        }
        if (tot) {
            params.push(new NameValuePair('tot', tot));
        }

        url += this.qsb.createQuerystring(params);
        // let params = new URLSearchParams();
        // params.set('van', van);
        // params.set('tot', tot);


        var theCall;
        if (!forceGet) {
            for (let index = 0; index < this.calls.length; index++) {
                let item = this.calls[index];
                if (item.key === url) {
                    console.debug("Cache hit: " + item.key);
                    theCall = item.value;
                    break;
                }
            }
        }

        if (!theCall) {
            console.debug('url: ' + url);
            theCall = this.http.get<DataModel[]>(url);
            this.calls.push({ "key": url, "value": theCall });
        }
        return theCall;
        //nieuw
        // if (this.data) {
        //     // if `data` is available just return it as `Observable`
        //     return Observable.of(this.data);
        // } else if (this.observable) {
        //     // if `this.observable` is set then the request is in progress
        //     // return the `Observable` for the ongoing request
        //     return this.observable;
        // } else {
        //     // example header (not necessary)
        //     let headers = new Headers();
        //     headers.append('Content-Type', 'application/json');
        //     // create the request, store the `Observable` for subsequent subscribers
        //     this.observable = this.http.get(url)
        //         .map(res => {
        //             // when the cached data is available we don't need the `Observable` reference anymore
        //             this.observable = null;

        //             if (res.status == 400) {
        //                 return "FAILURE";
        //             } else if (res.status == 200) {
        //                 this.data = <DataModel[]>res.json();
        //                 return this.data;
        //             }
        //             // make it shared so more than one subscriber can get the result
        //         })
        //         .share();
        //     return this.observable;
        // }
    }

    public getMostRecent(dataSource: string): Observable<DataModel> {
        let url = this.sensorDataUrl.concat(dataSource).concat('/MostRecent');

        return this.http.get<DataModel>(url);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
