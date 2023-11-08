---
  nav: 
    title: 卡片消息说明
    order: 1
---

## 卡片消息 contenet 介绍

[详细文档地址](https://developer.kookapp.cn/doc/cardmessage)

[可视化编辑卡片消息](https://www.kookapp.cn/tools/message-builder.html#/card)

### 一条基本的文字卡片消息

```json
// 这是一条简单的卡片消息 卡片消息里 最多只允许 5 个卡片
[
  // 这是第一张卡片 新增卡片的方法就是在该 json数组内新增卡片项 就像下面这样
  {
    // 类型： 卡片，目前只有 card。
    "type": "card",
    // 卡片侧边主题颜色 可选的值为：primary, success, danger, warning, info, secondary, none.默认为 primary，为 none 时不显示侧边框。
    "theme": "secondary",
    // 卡片大小 可选值为：xs, sm, md, lg, 一般默认为 lg
    "size": "lg",
    // 一个卡片可以有多个模块，但是一个卡片消息总共不允许超过 50 个模块
    "modules": [
      // 文字模块
      {
        "type": "section",
        "text": {
          "type": "plain-text",
          "content": "基本的文字消息"
        }
      }
    ]
  }
]
```

