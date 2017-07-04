import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StompConfig } from "app/shared/services/stomp";


/**
 * An injected class which grabs the application
 * config variables (e.g. STOMP credentials)
 * for the user application.
 *
 * This makes an AJAX request to the server
 * api containing some user token and secret
 *
 * @type ConfigService
 */
@Injectable()
export class ConfigService {

  /** Constructor */
  constructor(private _http: Http) { }
//lngoxfappd072

  public getConfig(): Promise<StompConfig> {
    return new Promise((resolve, reject) => {
      resolve({
        "host": "lngoxfappd072",
        "port": 9704,
        "https": false,

        "user": "username",
        "pass": "changeme",

        "subscribe": ["/topic/puddles"],
        "publish": ["/topic/puddles"],

        "heartbeat_in": 0,
        "heartbeat_out": 20000,

        "debug": true
      }
      );
    });
  }
}
