/*
 * @Descripttion: 
 * @Author: xutao
 * @Date: 2020-11-04 16:23:33
 * @LastEditors: xutao
 * @LastEditTime: 2020-11-04 17:57:15
 * @FilePath: \webgl-practice\src\app.ts
 */
function main(){
    let myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement
    myCanvas.width = document.documentElement.clientWidth
    myCanvas.height = document.documentElement.clientHeight
    let gl = myCanvas.getContext('webgl') 
    if(!gl){
        alert("无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。");
        return
    }
    // 设置清空颜色缓冲时的颜色
    gl.clearColor(0.0, 0.0, 0.0, 0.5)
    // 用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
}
main()