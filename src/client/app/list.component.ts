import {Component, OnInit} from '@angular/core';
import {PartsService} from './parts.service';
import {Part} from './part';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-list',
    template: `
        <div class="row">
            <div class="col-12" *ngIf="partTypes">
                <form>
                    <div class="row">
                        <div class="col">
                            <label class="label" for="search">Search</label>
                            <input type="text" id="search" class="form-control" placeholder="Search" [ngModel]="search">
                        </div>
                        <div class="col">
                            <label class="label" for="search">Type</label>
                            <select id="type" class="form-control" [ngModel]="type">
                                <option *ngFor="let type of partTypes" [value]="type">{{ type }}</option>
                            </select>
                        </div>
                        <div class="col">
                            <label class="label" for="price_order" [ngModel]="priceOrder">Price order</label>
                            <select id="price_order" class="form-control"></select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-12" *ngIf="parts">
                <table class="table table-hover table-striped">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                    </tr>
                    <tr *ngFor="let part of parts">
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
export class ListComponent implements OnInit {
    parts: Part[];
    partTypes: string[];
    search: string;
    type: string;
    priceOrder: string;

    constructor(private partsService: PartsService) {
    }

    ngOnInit(): void {
        this.partsService.getParts().pipe(
            map(parts => this.parts = parts),
        ).subscribe();

        this.partsService.getPartTypes().pipe(
            map(types => this.partTypes = types),
        ).subscribe();
    }
}
