import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationStart } from '@angular/router';
import { SILStateService } from "app/infagen/sil/sil-state.service";


@Component({
    templateUrl: './sil-generate-intro.component.html'
})
export class SILGenerateIntro implements OnInit {
 



    constructor(private router: Router, private route: ActivatedRoute, private silStateService: SILStateService) {



    }



      ngOnInit(): void {


    }


    selecttable() {

        this.router.navigateByUrl('/infa/silworkflows/generate/tables');


    }


    

}