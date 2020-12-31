/*
 * @Descripttion: 
 * @Author: xutao
 * @Date: 2020-11-04 16:23:33
 * @LastEditors: xutao
 * @LastEditTime: 2020-12-31 09:58:56
 * @FilePath: \webgl-practice\src\app.ts
 */
import './css/style.scss'
import { fragmentShaderSource, vertexShaderSource } from './shader.ts'
import { createProgram, createShader } from './util.ts'
function main() {
    let myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement
    myCanvas.width = document.documentElement.clientWidth
    myCanvas.height = document.documentElement.clientHeight
    let gl = myCanvas.getContext('webgl')
    if (!gl) {
        alert("无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。");
        return
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // 设置清空颜色缓冲时的颜色111
    gl.clearColor(0.0, 0.0, 0.0, 1)
    // 用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
        console.error('vertexShader or fragmentShader error: ', vertexShader, fragmentShader)
        return
    }

    let program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
        console.error('program error:', program)
        return
    }

    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    let positionBuffer = gl.createBuffer();

    if (!positionBuffer) {
        console.error('positionBuffer error:', positionBuffer)
        return
    }

    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // 三个点坐标（裁剪空间坐标）
        let positions = [
            -1, 0, 0,
            0, 0.5, 0,
            0.7, 0, -0.5
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    }

    // 告诉它用我们之前写好的着色程序（一个着色器对）
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);

    // 将绑定点绑定到缓冲数据（positionBuffer）
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    {
        // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
        let size = 3;          // 每次迭代运行提取两个单位数据
        let type = gl.FLOAT;   // 每个单位的数据类型是32位浮点型
        let normalize = false; // 不需要归一化数据
        let stride = 0;        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
        // 每次迭代运行运动多少内存到下一个数据开始点
        let offset = 0;        // 从缓冲起始位置开始读取
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset)
    }

    {
        let primitiveType = gl.TRIANGLES;
        let offset = 0;
        let count = 3;
        gl.drawArrays(primitiveType, offset, count);
    }

}
main()