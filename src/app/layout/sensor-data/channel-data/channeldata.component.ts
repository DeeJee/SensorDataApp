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
    @ViewChild('charts', { read: ViewContainerRef }) container;

    constructor(private datasourceService: DatasourceService,
        private sensorDataService: CachingSensorDataService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private dataTypeService: DataTypeService) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.channel = params['id'];
            this.loadDatasources();
        });
    }
    public dataSourceChanged(dataSource: Datasource): void {
        this.dataSource = dataSource;
        this.loadCharts(false);
    }

    private loadDatasources() {
        this.datasourceService.getDataSources(this.channel).subscribe(res => {
            this.dataSources = res;
            if (this.dataSources.length > 0) {
                this.dataSource = this.dataSources[0];
                this.loadCharts(false);
            }
        },
            error => { },
            () => {
                //console.log('getDataSources finished: ' + this.dataSources.length + " datasources found");
            });
    }
    private loadCharts(forceLoad: boolean) {
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
                this.container.clear();

                for (let property of properties) {
                    let feed = feeds.getValue(property);
                    this.AddGraph(factory, property, feed, labels);
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

    private AddGraph(factory: any, key: string, data: any[], labels: any[]): void {
        const ref = this.container.createComponent(factory);
        let instance = (<SensorDataChartComponent>ref.instance);
        instance.feed = key;
        instance.values = data;
        instance.lineChartLabels = labels;
    }

    public refresh(): void {
        this.loading=true;
        //this.loadCharts(true);
    }
}
