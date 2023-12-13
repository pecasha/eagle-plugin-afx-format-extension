const fs = require("fs");
const path = require("path");
const url = require("url");
const { Core } = require("../core/index.ts");

module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {

            item.duration = 0;
            item.width = 0;
            item.height = 0;
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
