import {
    yyEva,
    type YYEvaType
} from "yyeva";

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
        this.#player = await yyEva({
            container: this.#options.container,
            videoUrl: path,
            autoplay: true,
            alphaDirection: "left",
            resizeCanvas: "size"
        });
    }
}
