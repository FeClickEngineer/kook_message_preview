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

```jsx
import { MessagePreview } from '@kookapp/kook-message-preview';

const content = [
  {
    type: 'card',
    size: 'lg',
    theme: 'warning',
    modules: [
      {
        type: 'header',
        text: {
          type: 'plain-text',
          content: '近期活动公告',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        mode: 'left',
        accessory: {
          type: 'image',
          src: 'https://img.kaiheila.cn/assets/2021-01/FckX3MDe6S02i020.png',
          circle: true,
        },
        text: {
          type: 'plain-text',
          content:
            '社区将在1月20日开启副本速通挑战，参与本次活动的小伙伴均有礼品相送！',
        },
      },
      {
        type: 'section',
        text: {
          type: 'kmarkdown',
          content: '**报名方法**',
        },
      },
      {
        type: 'section',
        mode: 'right',
        accessory: {
          type: 'button',
          theme: 'primary',
          value: '123',
          text: {
            type: 'plain-text',
            content: '报名',
          },
        },
        text: {
          type: 'kmarkdown',
          content: '点击右侧“报名”按钮，即可完成报名。',
        },
      },
      {
        type: 'section',
        text: {
          type: 'kmarkdown',
          content: '**挑战奖励**\n',
        },
      },
      {
        type: 'section',
        accessory: {},
        text: {
          type: 'paragraph',
          cols: 3,
          fields: [
            {
              type: 'kmarkdown',
              content: '第一名',
            },
            {
              type: 'kmarkdown',
              content: '第二名',
            },
            {
              type: 'kmarkdown',
              content: '参与奖',
            },
            {
              type: 'kmarkdown',
              content: '游戏加速器年卡',
            },
            {
              type: 'kmarkdown',
              content: '游戏加速器季卡',
            },
            {
              type: 'kmarkdown',
              content: '游戏加速器月卡',
            },
          ],
        },
      },
      {
        type: 'section',
        text: {
          type: 'kmarkdown',
          content:
            '(font)安全免费(font)[success] (font)没有广告(font)[purple] (font)低资源占用(font)[warning] (font)高通话质量(font)[pink] (met)2(met) (rol)3(rol) (chn)4(chn)',
        },
      },
    ],
  },
];

export default () => {
  function customMetUserRender(id) {
    return (
      <span
        style={{ color: 'red' }}
        onClick={() => {
          alert(`点击自定义@用户节点 id${id}`);
        }}
      >
        card自定义@用户渲染 {id}
      </span>
    );
  }

  function customRoleRender(id) {
    return (
      <span
        style={{ color: 'gray' }}
        onClick={() => {
          alert(`点击自定义@角色节点 id${id}`);
        }}
      >
        card自定义@角色渲染 {id}
      </span>
    );
  }

  function customChannelRender(id) {
    return (
      <span
        style={{ color: 'blue' }}
        onClick={() => {
          alert(`点击自定义@频道节点 id${id}`);
        }}
      >
        card自定义@频道渲染 {id}
      </span>
    );
  }

  return (
    <MessagePreview
      type="card"
      content={content}
      external="https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js"
      customMetUserRender={customMetUserRender}
      customRoleRender={customRoleRender}
      customChannelRender={customChannelRender}
    />
  );
};
```

## KMarkDown消息基本使用

这是一个简单的kmarkdown消息例子

```jsx
import { MessagePreview } from '@kookapp/kook-message-preview';

const content = `
~~删除线~~ (font)安全免费(font)[success] (font)没有广告(font)[purple] (font)低资源占用(font)[warning] (font)高通话质量(font)[pink] (met)123(met) (rol)321(rol) (chn)321(chn)`;

export default () => {
  function customMetUserRender(id) {
    return (
      <span
        style={{ color: 'red' }}
        onClick={() => {
          alert(`点击自定义@用户节点 id${id}`);
        }}
      >
        kmd自定义@用户渲染 {id}
      </span>
    );
  }

  function customRoleRender(id) {
    return (
      <span
        style={{ color: 'gray' }}
        onClick={() => {
          alert(`点击自定义@角色节点 id${id}`);
        }}
      >
        kmd自定义@角色渲染 {id}
      </span>
    );
  }

  function customChannelRender(id) {
    return (
      <span
        style={{ color: 'blue' }}
        onClick={() => {
          alert(`点击自定义@频道节点 id${id}`);
        }}
      >
        kmd自定义@频道渲染 {id}
      </span>
    );
  }
  return (
    <MessagePreview
      type="kmd"
      content={content}
      external="https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js"
      customMetUserRender={customMetUserRender}
      customRoleRender={customRoleRender}
      customChannelRender={customChannelRender}
    />
  );
};
```

## 折叠卡片

```jsx
import { MessagePreview } from "@kookapp/kook-message-preview";

const cards = [
  {
    "type": "card",
    "theme": "secondary",
    "size": "lg",
    "modules": [
      ]
  }
]

const cardAlwaysHide = [
  {
    "type": "card",
    "theme": "secondary",
    "size": "lg",
    "modules": [
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "这个卡片消息一定会被折叠"
        },
      }
    ]
  }
]

for (let i = 0; i <= 20; i++)
cards[0].modules.push({
  "type": "section",
  "text": {
    "type": "kmarkdown",
    "content": "这个卡片消息不会被折叠"
  },
})

export default () => (
  <div style={{display: 'flex'}}> 
    <MessagePreview
      type="card"
      content={cards}
      external="https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js"
      collapsed={false}
    />
    <MessagePreview
      type="card"
      content={cardAlwaysHide}
      external="https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js"
      hideMoreHeight={10}
    />
  </div>
)
```

## API

| 属性名              | 描述                                                                                                                                                                                                                           | 类型                                | 默认值    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | --------- |
| type                | 消息类型 `'card'`(卡片消息) `'kmd'`（KMarkDown消息）                                                                                                                                                                           | `string`                            | `'card'`  |
| theme               | 主题色 `'light' 或 'dark'`                                                                                                                                                                                                     | `string`                            | `'light'` |
| content             | 消息内容：具体可查看[消息编辑器](https://www.kookapp.cn/tools/message-builder.html#/card) 或者 [卡片消息说明](https://developer.kookapp.cn/doc/cardmessage) 和 [KMarkDown消息说明](https://developer.kookapp.cn/doc/kmarkdown) | `string 或 array`                   | `[]`      |
| external            | 解析kmarkdown方法的 资源文件地址                                                                                                                                                                                               | `string`                            | `''`      |
| customMetUserRender | 自定义@用户节点渲染                                                                                                                                                                                                            | `(user_id: string) => ReactNode`    |           |
| customRoleRender    | 自定义@角色节点渲染                                                                                                                                                                                                            | `(role_id: string) => ReactNode`    |           |
| customChannelRender | 自定义@频道节点渲染                                                                                                                                                                                                            | `(channel_id: string) => ReactNode` |           |
| collapsed           | 是否在卡片过长时折叠卡片                                                                                                                                                                                                       | `boolean`                           | `true`    |
| hideMoreHeight      | 折叠卡片的高度限制，超过此高度会折叠卡片，单位为 px                                                                                                                                                                            | `number`                            | `400`     |