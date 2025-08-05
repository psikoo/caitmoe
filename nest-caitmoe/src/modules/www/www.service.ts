import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class wwwService {
  constructor(private readonly configService: ConfigService) {}
  async getWeather() {
    let finalResponse = "empty";
    let config = {
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?lat=-3.705&lon=40.420&units=metric&appid="+this.configService.get("WEATHER_KEY"),
      headers: { "Content-Type": "application/json" }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }

  async getLastFM(): Promise<JSON> {
    let finalResponse = "empty";
    let config = {
      method: "get",
      url: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=psikooUwU&limit=1&format=json&api_key="+this.configService.get("LASTFM_KEY"),
      headers: { "Content-Type": "application/json" }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }
}
