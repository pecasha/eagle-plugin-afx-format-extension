const fs = require("fs");
const path = require("path");
const url = require("url");
const { Core } = require("../core/index.ts");
const { setTimeout } = require("node:timers/promises");

module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const container = document.createElement("div");
            const core = new Core({
                container
            });
            await core.loadFile(src);

            await setTimeout(500);

            const canvas = container.querySelector("canvas");
            const blob = await new Promise(resolve => canvas.toBlob(resolve));
            if(blob) {
                await fs.promises.writeFile(dest, Buffer.from(await blob.arrayBuffer()));
            }

            // item.duration = 0;
            item.width = canvas.width;
            item.height = canvas.height;
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
