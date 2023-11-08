---
  nav:
    title: KOOK 消息预览
    order: 0
---

## 卡片消息基本使用
这是一个简单的卡片消息例子

```jsx
import { MessagePreview } from '@kookapp/kook-message-preview';

const content =[
  {
    "type": "card",
    "size": "lg",
    "theme": "warning",
    "modules": [
      {
        "type": "header",
        "text": {
          "type": "plain-text",
          "content": "近期活动公告"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "mode": "left",
        "accessory": {
          "type": "image",
          "src": "https://img.kaiheila.cn/assets/2021-01/FckX3MDe6S02i020.png",
          "circle": true
        },
        "text": {
          "type": "plain-text",
          "content": "社区将在1月20日开启副本速通挑战，参与本次活动的小伙伴均有礼品相送！"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "**报名方法**"
        }
      },
      {
        "type": "section",
        "mode": "right",
        "accessory": {
          "type": "button",
          "theme": "primary",
          "value": "123",
          "text": {
            "type": "plain-text",
            "content": "报名"
          }
        },
        "text": {
          "type": "kmarkdown",
          "content": "点击右侧“报名”按钮，即可完成报名。"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "**挑战奖励**\n"
        }
      },
      {
        "type": "section",
        "accessory": {},
        "text": {
          "type": "paragraph",
          "cols": 3,
          "fields": [
            {
              "type": "kmarkdown",
              "content": "第一名"
            },
            {
              "type": "kmarkdown",
              "content": "第二名"
            },
            {
              "type": "kmarkdown",
              "content": "参与奖"
            },
            {
              "type": "kmarkdown",
              "content": "游戏加速器年卡"
            },
            {
              "type": "kmarkdown",
              "content": "游戏加速器季卡"
            },
            {
              "type": "kmarkdown",
              "content": "游戏加速器月卡"
            }
          ]
        }
      }
    ]
  }
]

export default () => <MessagePreview type="card" content={content} />;
```


## KMarkDown消息基本使用
这是一个简单的kmarkdown消息例子

```jsx
import { MessagePreview } from '@kookapp/kook-message-preview';

const content = `~~删除线~~`
 

export default () => <MessagePreview type="kmd" content={content} />;
```

## API

| 属性名  | 描述                                                                                                  | 类型              | 默认值    |
|---------|-----------------------------------------------------------------------------------------------------|-------------------|-----------|
| type    | 消息类型  `'card'`(卡片消息)  `'kmd'`（KMarkDown消息）                                                  | `string`          | `'card'`  |
| theme   | 主题色 `'light' 或 'dark'`                                                                            | `string`          | `'light'` |
| content | 消息内容：具体可查看[消息编辑器](https://tttt-www.dev.chuanyuapp.com/tools/message-builder.html#/card) 或者 [卡片消息说明](/card_desc) 和 [KMarkDown消息说明](/kmd_desc)   | `string 或 array` | `[]`      |


