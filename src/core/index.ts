import {
    yyEva,
    type YYEvaType
} from "yyeva";
import { type AlphaDirection } from "yyeva/types/type/mix";

export interface Options {
    container: HTMLElement;
}

export class Core {
    #options = {} as Options;

    #loaded = false;

    #player = {} as YYEvaType;

    public get loaded() {
        return this.#loaded;
    }
    public get player() {
        return this.#player;
    }

    constructor(options: Options) {
        this.#options = options;
    }

    public async loadFile(path: string) {
        const suffix = path.substring(path.lastIndexOf(".") + 1);
        const alphaDirection = {
            eva: "right",
            vap: "left",
            afx: "left"
        }[suffix] as AlphaDirection;
        this.#player = await yyEva({
            container: this.#options.container,
            videoUrl: path,
            autoplay: true,
            useMetaData: true,
            alphaDirection,
            resizeCanvas: "size",
            logLevel: "error"
        });
    }
}
