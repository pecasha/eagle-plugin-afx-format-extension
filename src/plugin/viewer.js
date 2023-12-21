const { Core } = require("../core/index.ts");

const urlParams = new URLSearchParams(window.location.search);
const filePath = urlParams.get("path");

(async function() {
    const core = new Core({
        container: document.querySelector(".player")
    });

    try {
        await core.loadFile(filePath);
    } catch (err) {
        console.error(err);
        const message = err.message || err || "未知错误";
        eagle.log.error(`MP4 透明格式扩展插件错误: ${message}`);
    }
})();
