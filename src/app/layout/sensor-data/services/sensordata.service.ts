import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuerystringBuilderService } from './querystringbuilder.service';
import { NameValuePair } from '../../models/namevaluepair';
import { DataModel } from '../../models/datamodel';
import { Datasource } from '../../models/datasource';

@Injectable()
export class SensorDataService {
    constructor(private http: HttpClient, private qsb: QuerystringBuilderService) { }

    private dataSourceUrl = 'http://iotsensordata.azurewebsites.net/api/SensorData/';
    private dataSourcesUrl = 'http://iotsensordata.azurewebsites.net/api/DataSource/';
    //private dataSourceUrl='http://localhost:58847/api/SensorData/';

    public getData(dataSource: string, van: string, tot: string): Observable<DataModel[]> {
        let url = this.dataSourceUrl.concat(dataSource);
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

    public getDataSources(channelId: number): Observable<Datasource[]> {
        return this.http.get<Datasource[]>(this.dataSourcesUrl + "?channel=" + channelId);
            //.map(res => res).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}