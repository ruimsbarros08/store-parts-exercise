import {Component, OnInit} from '@angular/core';
import {PartsService} from './parts.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {Part} from './part';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-detail',
    template: `
        <div class="row">
            <div class="col">
                <a routerLink="/"><button class="btn btn-primary">Back to list</button></a>
            </div>
        </div>
        <div class="row" *ngIf="(part$ | async) as part">
            <div class="col-12">Name: {{part.name}}</div>
            <div class="col-12">Type: {{part.type}}</div>
            <div class="col-12">Price: {{part.price}}</div>
        </div>
    `,
    styles: []
})
export class DetailComponent implements OnInit {
    part$: Observable<Part>;

    constructor(private partsService: PartsService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.part$ = this.route.paramMap.pipe(
            filter(params => !!params.get('name')),
            map(params => params.get('name') || ''),
            switchMap(name => this.partsService.getPartByName(name))
        );
    }
}
