import {PriceSortPipe} from './price-sort.pipe';
import {Part} from './part';

describe('PriceSortPipe', () => {
    const pipe = new PriceSortPipe();

    const parts: Part[] = [{
        name: 'Mouse 2',
        type: 'Mouse',
        price: '15.00$'
    }, {
        name: 'Mouse 1',
        type: 'Mouse',
        price: '12.00$'
    }, {
        name: 'Keyboard 1',
        type: 'Keyboard',
        price: '20.00$'
    }];

    it('should return the same array when order is not defined',  () => {
        const transformed = pipe.transform(parts);
        expect(transformed).toEqual(parts);
    });

    it('should order the array ascending', function () {
        const transformed = pipe.transform(parts, 'asc');

        expect(transformed[0].name).toEqual('Mouse 1');
        expect(transformed[1].name).toEqual('Mouse 2');
        expect(transformed[2].name).toEqual('Keyboard 1');
    });

    it('should order the array descending', function () {

        const transformed = pipe.transform(parts, 'desc');

        expect(transformed[0].name).toEqual('Keyboard 1');
        expect(transformed[1].name).toEqual('Mouse 2');
        expect(transformed[2].name).toEqual('Mouse 1');
    });
});
