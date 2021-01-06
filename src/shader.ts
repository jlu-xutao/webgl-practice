/*
 * @Description: 
 * @Author: xutao
 * @Date: 2020-12-31 09:35:05
 * @LastEditors: xutao
 * @LastEditTime: 2020-12-31 09:48:59
 */
export let vertexShaderSource = `
    // 一个属性变量，将会从缓冲中获取数据
    attribute vec2 a_position;

    attribute vec4 a_color;

    attribute vec2 a_texCoord;

    uniform vec2 u_resolution;

    varying vec4 v_color;

    varying vec2 v_texCoord;

    // 所有着色器都有一个main方法
    void main() {

        // 从像素坐标转换到 0.0 到 1.0
        vec2 zeroToOne = a_position / u_resolution;
    
        // 再把 0->1 转换 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
    
        // 把 0->2 转换到 -1->+1 (裁剪空间)
        vec2 clipSpace = zeroToTwo - 1.0;
    
        gl_Position = vec4(clipSpace, 0, 1);

        v_color = a_color;

        v_texCoord = a_texCoord;

    }
`

export let fragmentShaderSource = `
    // 片断着色器没有默认精度，所以我们需要设置一个精度
    // mediump是一个不错的默认值，代表“medium precision”（中等精度）
    precision mediump float;
    uniform vec4 u_color;
    varying vec4 v_color;
    varying vec2 v_texCoord;
    // 纹理
    uniform sampler2D u_image;
    void main() {
        // gl_FragColor是一个片断着色器主要设置的变量
        // gl_FragColor = v_color;
        gl_FragColor = texture2D(u_image, v_texCoord);
    }
`