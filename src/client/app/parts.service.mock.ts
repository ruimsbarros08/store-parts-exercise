import {Observable, of} from 'rxjs';
import {Part} from './part';
import {Injectable} from '@angular/core';

@Injectable()
export class PartsServiceMock {

    getParts(query: string, type: string): Observable<Part[]> {
        return of([{
            name: 'Mouse 1',
            type: 'Mouse',
            price: '12.00$'
        }, {
            name: 'Mouse 2',
            type: 'Mouse',
            price: '15.00$'
        }, {
            name: 'Keyboard 1',
            type: 'Keyboard',
            price: '20.00$'
        }]);
    }

    getPartByName(name: string): Observable<Part> {
        return of({
            name: 'Mouse 1',
            type: 'Mouse',
            price: '12.00$'
        });
    }

    getPartTypes(): Observable<string[]> {
        return of(['Mouse', 'Keyboard']);
    }
}
