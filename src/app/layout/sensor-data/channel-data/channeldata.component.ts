import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DatasourceService } from '../services/datasource.service';
import { ActivatedRoute } from '@angular/router';
import { DataTypeService } from '../services/datatype.service';
import { CachingSensorDataService } from '../services/cachingsensordata.service';
import { routerTransition } from '../../../router.animations';
import { Datasource } from '../../models/datasource';
import { Subscription } from 'rxjs';
import * as Collections from 'typescript-collections';
import { SensorDataChartComponent } from '../sensordata-chart/sensordatachart.component';

@Component({
    selector: 'app-channeldata',
    templateUrl: './channeldata.component.html',
    styleUrls: ['./channeldata.component.scss'],
    animations: [routerTransition()]
})
export class ChanneldataComponent implements OnInit {
    tab: string;
    fromDate: any;
    toDate: any;
    loading: boolean;
    startDate: any;
    endDate: any;
    lastData: string;
    lastData2: string;
    public dataSource: Datasource;
    public dataSources: Datasource[];
    busy: Subscription;
    public chartLabels: any[] = [];

    @Input() public channel: number;
    @ViewChild('dataCharts', { read: ViewContainerRef }) dataContainer;
    @ViewChild('metadataCharts', { read: ViewContainerRef }) metadataContainer;

    constructor(private datasourceService: DatasourceService,
        private sensorDataService: CachingSensorDataService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private dataTypeService: DataTypeService) {
        this.fromDate = new Date(2018, 2, 2);
        this.toDate = new Date(2018, 4, 4);

    }

    ngOnInit() {
        this.switchTab('data');
        this.activatedRoute.params.subscribe(params => {
            this.channel = params['id'];
            this.loadDatasources();
        });
    }
    public dataSourceChanged(dataSource: Datasource): void {
        this.dataSource = dataSource;
        this.loadCharts(false);
    }

    private switchTab(tab: string): void {
        this.tab = tab;
    }

    private loadDatasources() {
        this.datasourceService.getDataSources(this.channel).subscribe(
            res => {
                this.dataSources = res;
                if (this.dataSources.length > 0) {
                    this.dataSource = this.dataSources[0];
                    this.loadCharts(false);
                }
            },
            error => { },
            () => {
                 console.log('getDataSources finished: ' + this.dataSources.length + " datasources found");
            });
    }
    private loadCharts(forceLoad: boolean) {
        console.log('from: ' + this.fromDate);
        console.debug('voor call: startDate: ' + this.startDate + ', endDate: ' + this.endDate);
        this.loading = true;
        this.sensorDataService.getMostRecent(this.dataSource.DeviceId).subscribe(res => {
            //this.lastData =  this.distanceInWordsToNowPipe.transform(res.TimeStamp);
            this.lastData = res.TimeStamp.toString();
        });

        let properties: string[];
        this.dataTypeService.getById(this.dataSource.DataTypeId).subscribe(dataType => {
            properties = dataType.Properties.split(',');

            //loading chart data
            this.busy = this.sensorDataService.getData(this.dataSource.DeviceId, this.startDate, this.endDate, forceLoad).subscribe(res => {

                var feeds = new Collections.Dictionary<string, any[]>();

                //create the feeds
                for (let property of properties) {
                    feeds.setValue(property, []);
                }

                //push the data on the correct feed
                let labels: Date[] = [];
                for (let item of res) {
                    let payload = JSON.parse(item.Payload);

                    let feedIndex = 0;
                    for (let property of properties) {
                        let feed = feeds.getValue(property);
                        if (payload.hasOwnProperty(property)) {
                            feed.push(payload[property]);
                        }
                        else {
                            feed.push(0);
                        }
                        feedIndex++;
                    }

                    labels.push(item.TimeStamp);
                };

                //create the labels
                this.chartLabels = labels;

                //create a graph for each feed
                const factory = this.componentFactoryResolver.resolveComponentFactory(SensorDataChartComponent);
                this.dataContainer.clear();
                this.metadataContainer.clear();

                for (let property of properties) {
                    let feed = feeds.getValue(property);
                    if (["Voltage", "RSSI"].indexOf(property) > -1) {
                        const ref = this.metadataContainer.createComponent(factory);
                        this.AddGraph(ref, factory, property, feed, labels);
                    }
                    else {
                        const ref = this.dataContainer.createComponent(factory);
                        this.AddGraph(ref, factory, property, feed, labels);
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

    private AddGraph(ref: any, factory: any, key: string, data: any[], labels: any[]): void {
        let instance = (<SensorDataChartComponent>ref.instance);
        instance.feed = key;
        instance.values = data;
        instance.lineChartLabels = labels;
    }

    public refresh(): void {
        this.loading = true;
        this.loadCharts(true);
    }
}
