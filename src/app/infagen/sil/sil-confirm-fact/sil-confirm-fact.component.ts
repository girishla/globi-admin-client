import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SILStateService } from "app/infagen/sil/sil-state.service";
import { SilMetadata } from "app/shared/models/sil-metadata.model";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-sil-confirm-fact',
  templateUrl: './sil-confirm-fact.component.html',
  styleUrls: ['./sil-confirm-fact.component.css']
})
export class SilConfirmFactComponent implements OnInit {


  silMetadata: SilMetadata[];
  selectedTable: String;

  constructor(private router: Router, private route: ActivatedRoute, private silStateService: SILStateService) {



  }

  

  ngOnInit() {

    this.selectedTable = this.route.params['table'];

    this.route.data.subscribe(

      (data: { silMetadata: SilMetadata[] }) => {
        this.silMetadata = data.silMetadata;

        console.log(this.silMetadata);

      }


    );

  }



}
