import {
    yyEva,
    type YYEvaType,
    type AlphaDirection,
    type YYEvaOptionsType
} from "@pecasha/alpha-video-player";
import AdmZip from "adm-zip";

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
    public get player(): YYEvaType {
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

        let options = {
            container: this.#options.container,
            autoplay: true,
            useMetaData: true,
            resizeCanvas: "size",
            logLevel: "error"
        } as YYEvaOptionsType;

        if(suffix === "bav") {
            const zip = new AdmZip(path);
            const zipEntries = zip.getEntries();
            const files: Record<string, Buffer> = {};
            for(const entry of zipEntries) {
                if(!entry.isDirectory) {
                    files[entry.entryName] = entry.getData();
                }
            }
            if(files["config.json"]) {
                const config = JSON.parse(files["config.json"].toString("utf8"));
                if(config.portrait) {
                    const blob = new Blob([files[config.portrait.path]], { type: "video/mp4" });
                    options.videoUrl = new File([blob], config.portrait.path, { type: "video/mp4" });
                    if(config.portrait.align === 2) {
                        options.alphaDirection = "left";
                    } else {
                        options.alphaPosition = config.portrait.aFrame;
                        options.rgbPosition = config.portrait.rgbFrame;
                    }
                }
            }
        } else {
            options.videoUrl = path;
            options.alphaDirection = alphaDirection;
        }

        this.#player = await yyEva(options);
    }
}
