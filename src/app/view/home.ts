import { Component, OnInit } from '@angular/core';
import { Measure, MeasureResponse } from "app/shared/models/measure.model";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";
import { BarChartData } from "app/shared/models/bar-chart.model";

@Component({
    templateUrl: './home.html'
})
export class Home implements OnInit {


    measuresList: Measure[];
    puddleCount: number;
    puddleSize: number;
    sourceCount: number;
    top10Tables: Measure[] = [];
    top10TablesBySize: Measure[] = [];
    sizeBySource;
    colours: string[] = ['#ED5565', '#FC6E51', '#FFCE54', '#A0D468', '#48CFAD', '#4FC1E9', '#SD9CEC', '#AC92EC', '#EC87C0', '#656D78', '#DA4453', '#E9573F'];
    barChartOptions = {
        legend: {
            display: false
        }
    }

    ngOnInit(): void {

        this.sizeBySource = {
            labels: [],
            datasets: [{ label: [], backgroundColor: [], borderColor: [], data: [] }]
        }



        this.route.data.subscribe(
            (data: { measureResp: MeasureResponse }) => {
                this.measuresList = data.measureResp._embedded.measures;


                var measure$ = Observable.from(data.measureResp._embedded.measures);

                // var measureTop10Sources$ = Observable.from(this.measuresList.filter(measure => measure.type === "SIZEGB_BY_SRC"));

                // measureTop10Sources$.groupBy(measure => measure.dimension).flatMap(dimgroup => dimgroup.reduce((acc, curr) => [...acc, curr], []))
                //     .subscribe(out => console.log(out))


                measure$.subscribe(measure => {

                    switch (measure.type) {
                        case "PUDDLECOUNT_TOTAL": {
                            this.puddleCount = measure.measure;
                            break;
                        }
                        case "PUDDLESIZEGB_TOTAL": {
                            this.puddleSize = measure.measure;
                            break;
                        }
                        case "COUNT_BY_TABLE": {
                            this.top10Tables.push(measure);
                            break;
                        }
                        case "SIZEGB_BY_SRC": {

                            this.sizeBySource.labels.push(measure.dimension);
                            this.sizeBySource.datasets[0].label = "size in GB";

                            this.sizeBySource.datasets[0].data.push(measure.measure);

                            this.sizeBySource.datasets[0].backgroundColor.push(this.colours[this.sizeBySource.datasets[0].data.length]);

                            break;
                        }
                        case "SOURCECOUNT_TOTAL": {
                            this.sourceCount = measure.measure;
                            break;
                        }

                        case "SIZEGB_BY_TABLETOP10": {
                            this.top10TablesBySize.push(measure);
                            break;
                        }



                        default: {
                            //statements; 
                            break;
                        }
                    }

                });


                console.log(this.sizeBySource);

            }
        );


    }


    constructor(private router: Router, private route: ActivatedRoute) {




    }


}