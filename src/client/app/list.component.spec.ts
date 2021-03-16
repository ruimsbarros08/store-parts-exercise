import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppRoutingModule} from './app-routing.module';
import {ListComponent} from './list.component';
import {FormsModule} from '@angular/forms';
import {PartsService} from './parts.service';
import {PartsServiceMock} from './parts.service.mock';
import {HttpClientModule} from '@angular/common/http';
import {PriceSortPipe} from './price-sort.pipe';
import {By} from '@angular/platform-browser';

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let component: ListComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                PriceSortPipe
            ],
            imports: [
                AppRoutingModule,
                FormsModule,
                HttpClientModule
            ],
            providers: [
                {provide: PartsService, useClass: PartsServiceMock}
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ListComponent);
            component = fixture.componentInstance;
        });
    });

    it('should be initialized with parts', () => {
        fixture.detectChanges();
        expect(component.parts.length).toEqual(3);
    });

    it('should have table rows', function () {
        fixture.detectChanges();
        let rows = fixture.debugElement.nativeElement.querySelectorAll('tr');

        expect(rows.length).toEqual(4);
    });

    it('should be initialized with part types', () => {
        fixture.detectChanges();
        expect(component.partTypes.length).toEqual(2);
    });

    it('should fill type select options', function () {
        fixture.detectChanges();

        let typeSelectOptions = fixture.debugElement.nativeElement.querySelectorAll('#type option');
        expect(typeSelectOptions.length).toEqual(3);
    });
})
