import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuerystringBuilderService } from './querystringbuilder.service';
import { NameValuePair } from '../../models/namevaluepair';
import { DataModel } from '../../models/datamodel';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SensorDataService {
    host: string;
    baseUrl: string;

    constructor(private http: HttpClient, private qsb: QuerystringBuilderService) { 
        this.host = environment.services.sensorDataService.host;
        this.baseUrl = environment.services.sensorDataService.baseUrl;
    }

    public getData(dataSource: string, van: string, tot: string): Observable<DataModel[]> {
        let url = `${this.host}${this.baseUrl}/SensorData/${dataSource}`;
        console.debug('in call van: ' + van + ', tot: ' + tot);

        let params: NameValuePair[] = [];
        if (van) {
            params.push(new NameValuePair('van', van));
        }
        if (tot) {
            params.push(new NameValuePair('tot', tot));
        }

        url += this.qsb.createQuerystring(params);
        console.debug('url: ' + url);
        return this.http.get<DataModel[]>(url);
            //.map(res => res)
            //.catch(this.handleError);
    }

    // public getDataSources(channelId: number): Observable<Datasource[]> {
    //     return this.http.get<Datasource[]>(this.dataSourcesUrl + "?channel=" + channelId);
    //         //.map(res => res).catch(this.handleError);
    // }

    public getMostRecent(dataSource: string): Observable<DataModel> {
        let url = `${this.host}${this.baseUrl}/SensorData/${dataSource}/MostRecent`;
        return this.http.get<DataModel>(url);
    }
}