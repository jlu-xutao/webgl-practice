"use strict";
/*
 * @Descripttion:
 * @Author: xutao
 * @Date: 2020-11-04 16:23:33
 * @LastEditors: xutao
 * @LastEditTime: 2020-11-04 17:57:05
 * @FilePath: \webgl-practice\src\app.ts
 */
function main() {
    var myCanvas = document.getElementById('myCanvas');
    myCanvas.width = document.documentElement.clientWidth;
    myCanvas.height = document.documentElement.clientHeight;
    var gl = myCanvas.getContext('webgl');
    if (!gl) {
        alert("无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。");
        return;
    }
    // 设置清空颜色缓冲时的颜色
    gl.clearColor(0.0, 0.0, 0.0, 0);
    // 用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
}
main();
define("util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     * @Descripttion:
     * @Author: xutao
     * @Date: 2020-11-04 16:37:29
     * @LastEditors: xutao
     * @LastEditTime: 2020-11-04 16:37:47
     * @FilePath: \webgl-practice\src\util.ts
     */
    function formatTime() {
    }
    exports.formatTime = formatTime;
});
