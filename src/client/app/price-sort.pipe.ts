import {Pipe, PipeTransform} from '@angular/core';
import {Part} from './part';

@Pipe({
    name: 'priceSort'
})
export class PriceSortPipe implements PipeTransform {

    transform(parts: Part[], order = ''): Part[] {
        if (order === '') return parts;

        return parts.sort((a, b) => {
            if (order === 'asc') {
                return this.transformPrice(a.price) - this.transformPrice(b.price);
            }

            return this.transformPrice(b.price) - this.transformPrice(a.price)
        });
    }

    private transformPrice(price: string): number {
        return parseFloat(price.replace('$', '').trim());
    }
}
