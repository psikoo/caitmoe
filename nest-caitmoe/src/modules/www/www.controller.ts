import { Controller, Get } from '@nestjs/common';

import { wwwService } from './www.service';

@Controller('www')
export class wwwController {
    constructor(private readonly wwwService: wwwService) {};

    @Get("weather")
    getWeather() {
        return this.wwwService.getWeather();
    }
    @Get("lastfm")
    getLastFM() {
        return this.wwwService.getLastFM();
    }
}
