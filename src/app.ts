/*
 * @Descripttion: 
 * @Author: xutao
 * @Date: 2020-11-04 16:23:33
 * @LastEditors: xutao
 * @LastEditTime: 2020-12-31 09:58:56
 * @FilePath: \webgl-practice\src\app.ts
 */
import './css/style.scss'
import { fragmentShaderSource, vertexShaderSource } from './shader'
import { createProgram, createShader, loadImage } from './util'
function getShaderProgram(gl: WebGLRenderingContext) {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) {
        console.error('vertexShader or fragmentShader error: ', vertexShader, fragmentShader)
        return
    }

    let program = createProgram(gl, vertexShader, fragmentShader)

    return program
}
function drawScene(image: HTMLImageElement) {
    let myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement
    // myCanvas.width = document.documentElement.clientWidth
    // myCanvas.height = document.documentElement.clientHeight
    myCanvas.width = 600
    myCanvas.height = 600
    let gl = myCanvas.getContext('webgl')
    if (!gl) {
        alert("无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。")
        return
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    // gl.scissor(0, 0, gl.canvas.width >> 2, gl.canvas.height >> 2)
    console.log(gl.getParameter(gl.VIEWPORT), gl.canvas.width, gl.canvas.height, gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)

    let viewport = gl.getParameter(gl.VIEWPORT) as Int32Array
    console.log(viewport[3])
    // 设置清空颜色缓冲时的颜色111
    gl.clearColor(0.0, 0.0, 0.0, 0.3)
    // 用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT)

    let program = getShaderProgram(gl)

    if (!program) {
        console.error('program error:', program)
        return
    }

    let positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionAttributeLocation)
    let colorAttributeLocation = gl.getAttribLocation(program, "a_color")
    gl.enableVertexAttribArray(colorAttributeLocation)
    // 找到纹理的地址
    let texCoordLocation = gl.getAttribLocation(program, "a_texCoord")

    let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
    let colorUniformLocation = gl.getUniformLocation(program, "u_color")


    // 告诉它用我们之前写好的着色程序（一个着色器对）
    gl.useProgram(program)

    let positionBuffer = gl.createBuffer()

    {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        // 点坐标像素坐标
        let positions = [
            0.0, 0.0,
            0.0, 60.0,
            184.0, 60.0,
            184.0, 60.0,
            0.0, 0.0,
            184.0, 0.0,
        ]
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    }

    {
        // 将绑定点绑定到缓冲数据（positionBuffer）
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        console.log(gl.getParameter(gl.ARRAY_BUFFER))
        // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
        let size = 2          // 每次迭代运行提取两个单位数据
        let type = gl.FLOAT   // 每个单位的数据类型是32位浮点型
        let normalize = false // 不需要归一化数据
        let stride = 0        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
        // 每次迭代运行运动多少内存到下一个数据开始点
        let offset = 0        // 从缓冲起始位置开始读取
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset)
    }

    let colorBuffer = gl.createBuffer()

    {

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        // 点坐标像素坐标
        let colors = [
            Math.random() * 256, Math.random() * 256, Math.random() * 256, 255,
            Math.random() * 256, Math.random() * 256, Math.random() * 256, 255,
            Math.random() * 256, Math.random() * 256, Math.random() * 256, 255,
        ]
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW)
    }

    {
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        let size = 4
        let type = gl.UNSIGNED_BYTE
        let normalize = true
        let stride = 0
        let offset = 0
        gl.vertexAttribPointer(
            colorAttributeLocation, size, type, normalize, stride, offset)
    }

    let texCoordBuffer = gl.createBuffer()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
        let texCoords = [
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
        ]
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(texCoordLocation)
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

        // 创建纹理
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 设置参数，让我们可以绘制任何尺寸的图像
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // 将图像上传到纹理
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }


    gl.uniform2f(resolutionUniformLocation, viewport[2], viewport[3])

    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1)

    {
        let primitiveType = gl.TRIANGLES
        let offset = 0
        let count = 6
        gl.drawArrays(primitiveType, offset, count)
    }

}
function main() {
    loadImage('./images/googlelogo.png', (image: HTMLImageElement) => {
        drawScene(image)
    })

}
main()
