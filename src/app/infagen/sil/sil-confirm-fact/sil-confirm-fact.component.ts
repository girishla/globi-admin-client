import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SILStateService } from "app/infagen/sil/sil-state.service";
import { SilMetadata } from "app/shared/models/sil-metadata.model";
import { Observable } from "rxjs/Observable";
import { D3Service, D3, Selection, Simulation, Link, ForceLink, SimulationLinkDatum } from "app/shared/services/d3.service";


@Component({
  selector: 'app-sil-confirm-fact',
  templateUrl: './sil-confirm-fact.component.html',
  styleUrls: ['./sil-confirm-fact.component.css']
})
export class SilConfirmFactComponent implements OnInit, AfterViewInit, OnDestroy {


  silMetadata: SilMetadata[];
  selectedTable: String;
  svg;
  color;
  simulation;
  link;
  node;

  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;
  private dimTables: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private silStateService: SILStateService, element: ElementRef, d3Service: D3Service) {

    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;


  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.selectedTable = params['table'];

    });

    this.route.data.subscribe(

      (data: { silMetadata: SilMetadata[] }) => {
        this.silMetadata = data.silMetadata;

        let metadata$ = Observable.from(this.silMetadata);

        metadata$.map(col => col.dimTableName).distinct().subscribe(col => {
          if (col != null) {
            this.dimTables.push(col);
            console.log(col);
          }
          
        }


        );


      }


    );

  }


  ngAfterViewInit() {
    this.svg = this.d3.select("svg");

    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = this.d3.scaleOrdinal(this.d3.schemeCategory20);

    this.simulation = this.d3.forceSimulation()
      .force("link", this.d3.forceLink().id(function (d: any) { return d.id; }))
      .force("charge", this.d3.forceManyBody().strength(-10000))
      .force("center", this.d3.forceCenter(width / 2, height / 2));

         this.render(this.getData());
  }

  ticked() {
    this.link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    this.node
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });
  }

  dragged(d) {
    d.fx = this.d3.event.x;
    d.fy = this.d3.event.y;
  }

  dragended(d) {
    if (!this.d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  dragstarted(d) {
    if (!this.d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  ngOnDestroy() {

  }


  // node_increase_force(alpha) {   



  //   for (var i = 0, n = nodes_data.length; i < n; ++i) {
  //     var curr_node = nodes_data[i];
  //     if(curr_node.sex == "M"){
  //       d3.selectAll("circle")._groups[0][i].attributes.r.value = +d3.selectAll("circle")._groups[0][i].attributes.r.value + 0.003;
  //     } else if(curr_node.sex == "F"){
  //     d3.selectAll("circle")._groups[0][i].attributes.r.value = +d3.selectAll("circle")._groups[0][i].attributes.r.value - 0.003;
  //     }    
  //   }
  // }

  render(graph) {
    this.link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    this.node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 50)
      .attr("fill", (d) => { return this.color(d.group); })
      .call(this.d3.drag()
        .on("start", (d) => { return this.dragstarted(d) })
        .on("drag", (d) => { return this.dragged(d) })
        .on("end", (d) => { return this.dragended(d) }));

    this.node.append("title")
      .text(function (d) { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on("tick", () => { return this.ticked() });

    this.simulation.force("link")
      .links(graph.links);
  }



  getData() {

    let nodes: any[] = [];
    let links: any[] = [];


    console.log(this.selectedTable);
    console.log(this.dimTables);

    nodes.push({ "id": "F_" + this.selectedTable, "group": 1 });
    this.dimTables.forEach(table => nodes.push({ "id": table, "group": 1 }));
    this.dimTables.forEach(table => links.push({ "source": "F_" + this.selectedTable, "target": table, "value": 4 }))


    return {
      "nodes": nodes,
      "links": links
    }

  }





}
