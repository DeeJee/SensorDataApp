import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DatasourceService } from '../services/datasource.service';
import { ActivatedRoute } from '@angular/router';
import { DataTypeService } from '../services/datatype.service';
import { routerTransition } from '../../../router.animations';
import { Datasource } from '../../models/datasource';
import { Subscription } from 'rxjs';
import * as Collections from 'typescript-collections';
import { SensorDataChartComponent } from '../sensordata-chart/sensordatachart.component';
import { SdDatePickerComponent } from '../../bs-component/components';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SignalR, ISignalRConnection, BroadcastEventListener } from 'ng2-signalr';
import { DataModel } from '../../models/datamodel';
import { SensorDataService } from '../services/sensordata.service';
import { forEach } from '../../../../../node_modules/typescript-collections/dist/lib/arrays';

@Component({
    selector: 'app-channeldata',
    templateUrl: './channeldata.component.html',
    styleUrls: ['./channeldata.component.scss'],
    animations: [routerTransition()]
})
export class ChanneldataComponent implements OnInit {
    tab: string;
    loading: boolean;
    startDate: any;
    endDate: any;
    lastData: string;
    public dataSource: Datasource;
    public chartLabels: any[] = [];
    labels: Date[] = [];
    feeds = new Collections.Dictionary<string, any[]>();
    graphs: any[];

    @Input() public channel: number;
    @ViewChild('dataCharts', { read: ViewContainerRef }) dataContainer;
    @ViewChild('metadataCharts', { read: ViewContainerRef }) metadataContainer;
    @ViewChild('fromPicker', { read: SdDatePickerComponent }) fromPicker: SdDatePickerComponent;
    @ViewChild('toPicker', { read: SdDatePickerComponent }) toPicker: SdDatePickerComponent;
    private connection: ISignalRConnection;
    private _subscription: Subscription;

    constructor(private datasourceService: DatasourceService,
        private sensorDataService: SensorDataService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private dataTypeService: DataTypeService,
        private _signalR: SignalR) {
        this.graphs = [];
    }

    ngOnInit() {
        this.switchTab('data');
        this.activatedRoute.params.subscribe(params => {
            this.channel = params['id'];
        });

        let onSensorDataReceived$ = new BroadcastEventListener<DataModel>('SensorDataReceived');
        this._signalR.connect().then(connection => {
            this.connection = connection;
            this.connection.listen(onSensorDataReceived$);
        });

        this._subscription = onSensorDataReceived$.subscribe((data: DataModel) => {
            if (typeof data.Payload === "string") {
                data.Payload = JSON.parse(data.Payload);
            }
            console.log(`${data.DeviceId}:${JSON.stringify(data.Payload)}`);

            this.lastData = data.TimeStamp.toString();
            if (data.DeviceId === this.dataSource.DeviceId) {
                for (let graph of this.graphs) {
                    graph.addDatapoint(data);
                }
            }
            else {
                console.debug(`Data received for deviceId ${data.DeviceId} and discarded as currently deviceId ${this.dataSource.DeviceId} is selected`);
            }

            // var keys = Object.keys(data.Payload);
            // let feedIndex = 0;
            // for (let property of keys) {
            //     let feed = this.feeds.getValue(property);
            //     if (data.Payload.hasOwnProperty(property)) {
            //         feed.push(data.Payload[property]);
            //     }
            //     else {
            //         feed.push(0);
            //     }
            //     feedIndex++;
            // }

            //this.labels.push(data.TimeStamp);
        });
    }


    public dataSourceChanged(dataSource: Datasource): void {
        this.dataSource = dataSource;
        this.loadCharts(false);
    }

    switchTab(tab: string): void {
        this.tab = tab;
    }

    private convertToString(value: NgbDateStruct): string {
        if (!value) return null;
        let date = value.month.toString();
        if (date.length === 1) {
            date = `0${date}`;
        }
        return `${value.year}-${date}-${value.day}`;
    }
    private loadCharts(forceLoad: boolean) {
        this.labels = [];

        console.log('voor call: startDate: ' + this.startDate + ', endDate: ' + this.endDate);
        this.sensorDataService.getMostRecent(this.dataSource.DeviceId).subscribe(res => {
            this.lastData = res.TimeStamp.toString();
        });

        let properties: string[];
        this.dataTypeService.getById(this.dataSource.DataTypeId).subscribe(dataType => {
            properties = dataType.Properties.split(',');

            //loading chart data
            let startDate = this.convertToString(this.fromPicker.model);
            let endDate = this.convertToString(this.toPicker.model);
            console.log("getting data");
            this.sensorDataService.getData(this.dataSource.DeviceId, startDate, endDate).subscribe(res => {

                //create the feeds
                for (let property of properties) {
                    this.feeds.setValue(property, []);
                }

                //push the data on the correct feed
                for (let item of res) {
                    let payload = JSON.parse(item.Payload);

                    let feedIndex = 0;
                    for (let property of properties) {
                        let feed = this.feeds.getValue(property);
                        if (payload.hasOwnProperty(property)) {
                            feed.push(payload[property]);
                        }
                        else {
                            feed.push(0);
                        }
                        feedIndex++;
                    }

                    this.labels.push(item.TimeStamp);
                };

                //create the labels
                this.chartLabels = this.labels;

                //create a graph for each feed
                const factory = this.componentFactoryResolver.resolveComponentFactory(SensorDataChartComponent);
                this.dataContainer.clear();
                this.metadataContainer.clear();

                for (let property of properties) {
                    let feed = this.feeds.getValue(property);
                    if (["Voltage", "RSSI"].indexOf(property) > -1) {
                        const ref = this.metadataContainer.createComponent(factory);
                        this.AddGraph(ref, property, feed, this.labels, this.dataSource.DeviceId);
                    }
                    else {
                        const ref = this.dataContainer.createComponent(factory);
                        this.AddGraph(ref, property, feed, this.labels, this.dataSource.DeviceId);
                    }
                }
                this.loading = false;
            }, err => null,
                () => {
                    console.log('channel data loaded');
                    //this.showSpinner = false;
                    this.loading = false;
                });
        });
    }

    private AddGraph(ref: any, key: string, data: any[], labels: any[], deviceId: string): void {
        let instance = (<SensorDataChartComponent>ref.instance);
        instance.feed = key;
        instance.values = data;
        instance.lineChartLabels = labels;
        instance.datasource = deviceId;
        this.graphs.push(instance);
    }

    public refresh(): void {
        this.loading = true;

        this.loadCharts(true);
    }
}
