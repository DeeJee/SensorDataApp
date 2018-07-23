import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Datasource } from '../../models/datasource';
import { DataType } from '../../models/DataType';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DatasourceService {
    host: string;
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.host = environment.services.sensorDataService.host;
        this.baseUrl = environment.services.sensorDataService.baseUrl;
    }

    public getNewDataSources(): Observable<Datasource[]> {
        let url = `${this.host}${this.baseUrl}/DataSource/NewDatasources`;

        return this.http.get<Datasource[]>(url);
        //.map(res => res)
        //.catch(this.handleError);
    }

    public getDataSources(channelId: number): Observable<Datasource[]> {
        console.log('getDataSources: ' + new Date().toString());
        let url = `${this.host}${this.baseUrl}/DataSource/?channel=${channelId}`;
        return this.http.get<Datasource[]>(url);
    }
    public getAllDataSources(): Observable<Datasource[]> {
        console.log('getAllDataSources: ' + new Date().toString());
        let url = `${this.host}${this.baseUrl}/DataSource/`;
        //this.host + "/api/DataSource
        return this.http.get<Datasource[]>(url);
    }
    public addDatasource(datasource: Datasource): Observable<Datasource> {
        console.debug("Posting data");
        let url = `${this.host}${this.baseUrl}/DataSource/`;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        let options = { headers: headers };
        return this.http.post<Datasource>(url, datasource, options);
        // .map(res => datasource)
        //.catch(this.handleError);
    }

    public updateDatasource(datasource: Datasource): Observable<Datasource> {
        console.debug("Putting data");
        let url = `${this.host}${this.baseUrl}/DataSource/${datasource.Id}`;

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        let options = { headers: headers };
        return this.http.put<Datasource>(url, datasource, options);
        //.catch(this.handleError);
    }

    public deleteDatasource(id: number): Observable<void> {
        console.debug("Deleting datasource");
        let url = `${this.host}${this.baseUrl}/DataSource/${id}`;
        //this.host + "/api/DataSource/" + id
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        let options = { headers: headers };
        return this.http.delete<void>(url, options);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    public getDataSourceTypes(): Observable<DataType[]> {
        let url = `${this.host}${this.baseUrl}/DataTypes`;

        return this.http.get<DataType[]>(url);
        //.map(res => res)
    }
}