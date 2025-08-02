import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

let tamagotchi = {
  name: "Tamago :3",
  state:"Alive",
  bornTime: new Date().valueOf(),
  deadTime: new Date().valueOf(),
  happiness: 10,
  hunger: 10,
  energy: 10,
  lastUpdate: new Date().valueOf()
}

@Injectable()
export class wwwService {
  constructor(private readonly configService: ConfigService) {}
  async getWeather() {
    let config = {
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?location=Madrid&unit=metric&appid="+this.configService.get("WEATHER_KEY"),
      headers: { "Content-Type": "application/json" }
    };
    await axios.request(config) .then((response) => {
      return JSON.parse(JSON.stringify(response.data));
    }) .catch((error) => {
      return JSON.parse(JSON.stringify(error));
    });
  }

  async getLastFM() {
    let config = {
      method: "get",
      url: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=psikooUwU&limit=1&format=json&api_key="+this.configService.get("LASTFM_KEY"),
      headers: { "Content-Type": "application/json" }
    };
    await axios.request(config) .then((response) => {
      return JSON.parse(JSON.stringify(response.data));
    }) .catch((error) => {
      return JSON.parse(JSON.stringify(error));
    });
  }
}
