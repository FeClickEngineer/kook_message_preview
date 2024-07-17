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
