import { ChanneldataModule } from "./channeldata.module";

describe('ChartsModule', () => {
    let chartsModule: ChanneldataModule;

    beforeEach(() => {
        chartsModule = new ChanneldataModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
