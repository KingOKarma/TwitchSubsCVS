import { dump, load } from "js-yaml";
import { CONFIG } from "./globals";
import fs from "fs";

/**
 * This represents the config.yml
 * @class Config
 * @property {string} accessToken
 * @property {string} userID
 */
export default class Config {
    private static readonly _configLocation = "./config.yml";

    public readonly accessToken: string;
    public readonly userID: string;


    private constructor() {
        this.accessToken = "";
        this.userID = "";
    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Config {
        if (!fs.existsSync(Config._configLocation)) {
            throw new Error("Please create a config.yml");
        }
        const fileContents = fs.readFileSync(
            Config._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Config;

        return casted;
    }

    /**
   *  Safe the config to the congfig.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Config._configLocation, dump(CONFIG));
    }
}
