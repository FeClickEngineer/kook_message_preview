import { MessagePreview } from '@kookapp/kook-message-preview';

const cards = [
  {
    type: 'card',
    theme: 'secondary',
    size: 'lg',
    modules: [],
  },
];

const cardAlwaysHide = [
  {
    type: 'card',
    theme: 'secondary',
    size: 'lg',
    modules: [
      {
        type: 'section',
        text: {
          type: 'kmarkdown',
          content: '这个卡片消息一定会被折叠',
        },
      },
    ],
  },
];

for (let i = 0; i <= 20; i++)
  cards[0].modules.push({
    type: 'section',
    text: {
      type: 'kmarkdown',
      content: '这个卡片消息不会被折叠',
    },
  });

export default () => (
  <div style={{ display: 'flex' }}>
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
);
