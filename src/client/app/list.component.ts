import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartsService} from './parts.service';
import {Part} from './part';
import {map, switchMap} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';

@Component({
    selector: 'app-list',
    template: `
        <div class="row">
            <div class="col-12" *ngIf="partTypes">
                <div class="row">
                    <div class="col">
                        <label class="label" for="search">Search</label>
                        <input type="text"
                               name="search"
                               id="search"
                               class="form-control"
                               placeholder="Search"
                               [(ngModel)]="query"
                               ngDefaultControl
                               (keyup)="query$.next(query)">
                    </div>
                    <div class="col">
                        <label class="label" for="type">Type</label>
                        <select id="type"
                                name="type"
                                class="form-control"
                                [(ngModel)]="type"
                                ngDefaultControl
                                (change)="type$.next(type)">
                            <option [value]="''">All</option>
                            <option *ngFor="let type of partTypes" [value]="type">{{ type }}</option>
                        </select>
                    </div>
                    <div class="col">
                        <label class="label" for="price_order">Price order</label>
                        <select id="price_order"
                                name="price_order"
                                class="form-control"
                                [(ngModel)]="priceOrder"
                                ngDefaultControl>
                            <option value="''"></option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12" *ngIf="parts">
                <table class="table table-hover table-striped">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                    </tr>
                    <tr *ngFor="let part of parts | priceSort:priceOrder">
                        <td> {{ part.name }}</td>
                        <td> {{ part.type }}</td>
                        <td> {{ part.price }}</td>
                    </tr>
                </table>
            </div>
        </div>
    `,
    styles: []
})
export class ListComponent implements OnInit, OnDestroy {
    parts: Part[];
    partTypes: string[];
    query = '';
    type = '';
    priceOrder = '';
    query$ = new Subject<string>();
    type$ = new Subject<string>();

    private subscription = new Subscription();

    constructor(private partsService: PartsService) {
    }

    ngOnInit(): void {
        const initialPartsSub = this.getParts(this.query, this.type).subscribe();
        this.subscription.add(initialPartsSub);

        const partTypesSub = this.partsService.getPartTypes().pipe(
            map(types => this.partTypes = types),
        ).subscribe();
        this.subscription.add(partTypesSub);

        const searchSub = this.query$.pipe(
            switchMap(term => this.getParts(term, this.type)),
        ).subscribe();
        this.subscription.add(searchSub);

        const typeSub = this.type$.pipe(
            switchMap(type => this.getParts(this.query, type)),
        ).subscribe();
        this.subscription.add(typeSub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getParts(query: string, type: string): Observable<Part[]> {
        return this.partsService.getParts(query, type).pipe(
            map(parts => this.parts = parts),
        );
    }
}
