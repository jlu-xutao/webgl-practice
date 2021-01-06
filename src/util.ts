/*
 * @Descripttion: 
 * @Author: xutao
 * @Date: 2020-11-04 16:37:29
 * @LastEditors: xutao
 * @LastEditTime: 2020-12-31 09:46:40
 * @FilePath: \webgl-practice\src\util.ts
 */
/**
 * 创建着色器方法
 * @param gl {WebGLRenderingContext} 渲染上下文
 * @param type {number} 着色器类型
 * @param source {string} 数据源
 */
export function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    var shader = gl.createShader(type) as WebGLShader; // 创建着色器对象
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
   
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }


  export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    var program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  export function loadImage(src: string, cb: Function){
    var image = new Image();
    image.src = src;  // 必须在同一域名下
    image.onload = function() {
      cb(image);
    }
  }