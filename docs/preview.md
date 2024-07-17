---
nav:
  title: KOOK 消息预览
  order: 0
---

## 加载 wasm scripts

有以下两种加载方式

1. 下载 https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js 复制代码 至 html 文件中 的 script标签中

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      // https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js  里面的代码;
    </script>
  </body>
</html>
```

2. 使用组件时 传入参数 `external=cdn地址` 例如以下代码示例都使用 external https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js

```js
import { MessagePreview } from '@kookapp/kook-message-preview';

export default () => (
  <MessagePreview external="https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js" />
);
```

## 卡片消息基本使用

这是一个简单的卡片消息例子

<code src="./code_demos/demo1.jsx"></code>

## KMarkDown消息基本使用

这是一个简单的kmarkdown消息例子

<code src="./code_demos/demo2.jsx"></code>

## 折叠卡片

<code src="./code_demos/demo3.jsx"></code>

## 处理卡片组件事件

<code src="./code_demos/demo4.jsx"></code>

## API

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 消息类型 `'card'`(卡片消息) `'kmd'`（KMarkDown消息） | `string` | `'card'` |
| theme | 主题色 `'light' 或 'dark'` | `string` | `'light'` |
| content | 消息内容：具体可查看[消息编辑器](https://www.kookapp.cn/tools/message-builder.html#/card) 或者 [卡片消息说明](https://developer.kookapp.cn/doc/cardmessage) 和 [KMarkDown消息说明](https://developer.kookapp.cn/doc/kmarkdown) | `string 或 array` | `[]` |
| external | 解析kmarkdown方法的 资源文件地址 | `string` | `''` |
| customMetUserRender | 自定义@用户节点渲染 | `(user_id: string) => ReactNode` |  |
| customRoleRender | 自定义@角色节点渲染 | `(role_id: string) => ReactNode` |  |
| customChannelRender | 自定义@频道节点渲染 | `(channel_id: string) => ReactNode` |  |
| collapsed | 是否在卡片过长时折叠卡片 | `boolean` | `true` |
| hideMoreHeight | 折叠卡片的高度限制，超过此高度会折叠卡片，单位为 px | `number` | `400` |
| customVideoEvents | 自定义视频事件处理器 | `{ onPlay: (cardModule) => void, onDownload: (cardModule) => void }` |  |
| customAudioEvents | 自定义音频事件处理器 | `{ onPlay: (cardModule) => void, onDownload: (cardModule) => void }` |  |
| customFileEvents | 自定义文件事件处理器 | `{ onDownload: (cardModule) => void }` |  |
| customButtonClick | 自定义按钮事件 | `(cardModule) => void` |  |
| customImageClick | 自定义图片点击事件 | `(cardModule) => void` |  |
