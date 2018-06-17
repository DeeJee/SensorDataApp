import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneldataComponent } from './channeldata.component';

describe('ChartsComponent', () => {
    let component: ChanneldataComponent;
    let fixture: ComponentFixture<ChanneldataComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ChanneldataComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ChanneldataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
