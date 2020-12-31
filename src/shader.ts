/*
 * @Description: 
 * @Author: xutao
 * @Date: 2020-12-31 09:35:05
 * @LastEditors: xutao
 * @LastEditTime: 2020-12-31 09:48:59
 */
export let vertexShaderSource = `
    // 一个属性变量，将会从缓冲中获取数据
    attribute vec4 a_position;

    // 所有着色器都有一个main方法
    void main() {

    // gl_Position 是一个顶点着色器主要设置的变量
    gl_Position = a_position;
    }
`

export let fragmentShaderSource = `
    // 片断着色器没有默认精度，所以我们需要设置一个精度
    // mediump是一个不错的默认值，代表“medium precision”（中等精度）
    precision mediump float;

    void main() {
    // gl_FragColor是一个片断着色器主要设置的变量
    gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“瑞迪施紫色”
    }
`