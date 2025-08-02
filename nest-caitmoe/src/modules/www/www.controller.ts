import { Controller, Get } from '@nestjs/common';

import { wwwService } from './www.service';

@Controller('www')
export class wwwController {
    constructor(private readonly wwwService: wwwService) {};

    @Get("weather")
    getWeather(): Promise<JSON> {
        return this.wwwService.getWeather();
    }
    @Get("lastfm")
    getLastFM(): Promise<JSON> {
        return this.wwwService.getLastFM();
    }
}
