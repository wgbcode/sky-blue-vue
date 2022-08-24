## 项目描述

该项目是一个移动端的便捷记账应用，可以简易地记录收入和支出的金额，并在统计页面以 EChart 图表的形式进行查询，也实现了账目标签的增删改查功能，技术栈包括 `Vue2` `Vue-Cli` `VueRouter`  `VueX` `TypeScript` `SCSS` `Vue-property-decorator` `ECharts` `day.js`。

## 项目使用

`git clone SSR_URL`

`yarn install`

`yarn serve`

## 项目主要开发过程
- 利用 Vue-Cli 搭建 vue 开发环境和对应的 webpack 配置。
- 利用 VueRouter 对应用的路由进行管理。
- 根据 VueX 统一管理应用的数据、状态，使项目数据和组件的状态更加容易维护。
- 使用 SCSS 代替 CSS，使 CSS 结构更加清晰，SCSS 提供的嵌套语法和有用的函数也让 CSS 编写得更加便捷。同时，也使用了 Vue-property-decorator，使在 JS 中可以写 CSS。
- 引入 ECharts 图表，完成账目数据可视化的需求。
- 引入 day.js 第三方库，对时间格式进行转换。
- 以 TypeScript 代替 JavsScript 开发项目，减少在开发过程中因样式而导致的错误，也让项目的逻辑更加清晰、严谨。
