import { MessagePreview } from '@kookapp/kook-message-preview';

const cards = [
  {
    type: 'card',
    theme: 'secondary',
    size: 'lg',
    modules: [
      {
        type: 'section',
        text: {
          type: 'plain-text',
          content: '您是否认为"KOOK"是最好的语音软件？',
        },
        mode: 'right',
        accessory: {
          type: 'button',
          theme: 'primary',
          text: {
            type: 'plain-text',
            content: '完全同意',
          },
        },
      },
      {
        type: 'container',
        elements: [
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/7kr4FkWpLV0ku0ku.jpeg',
          },
        ],
      },
      {
        type: 'image-group',
        elements: [
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/pWsmcLsPJq08c08c.jpeg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/YIfHfnvxaV0dw0dw.jpg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/YevTY6eGJa0fk0f2.jpeg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/r2K9RjHZ4s0xc0xc.jpeg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/klosFRTVy90jz0k0.jpg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/veHnEhzu6c0dw0dv.jpg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/tiVWPIuTrf0dw0dw.jpg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/wExzRIrTeR0j60j7.jpeg',
          },
          {
            type: 'image',
            src: 'https://img.kaiheila.cn/assets/2021-01/AybvLWYQgA0dw0dw.jpg',
          },
        ],
      },
      {
        type: 'action-group',
        elements: [
          {
            type: 'button',
            theme: 'primary',
            value: 'ok',
            text: {
              type: 'plain-text',
              content: '确定',
            },
          },
          {
            type: 'button',
            theme: 'danger',
            value: 'cancel',
            text: {
              type: 'plain-text',
              content: '取消',
            },
          },
        ],
      },
      {
        type: 'file',
        title: 'KOOK介绍.txt',
        src: 'https://img.kaiheila.cn/attachments/2021-01/21/600972b5d0d31.txt',
        size: '61',
      },
      {
        type: 'audio',
        title: '命运交响曲',
        src: 'https://img.kaiheila.cn/attachments/2021-01/21/600975671b9ab.mp3',
        cover: 'https://img.kaiheila.cn/assets/2021-01/rcdqa8fAOO0hs0mc.jpg',
      },
      {
        type: 'video',
        title: '有本事别笑',
        src: 'https://img.kaiheila.cn/attachments/2021-01/20/6008127e8c8de.mp4',
      },
    ],
  },
];

const customVideoEvents = {
  onPlay: (props) => {
    alert('video onClick:\n' + JSON.stringify(props, null, 2));
  },
  onDownload: (module) => {
    alert('video onDownload:\n' + JSON.stringify(module, null, 2));
  },
};

const customAudioEvents = {
  onPlay: (module) => {
    alert('audio onClick:\n' + JSON.stringify(module, null, 2));
  },
  onDownload: (module) => {
    alert('audio onDownload:\n' + JSON.stringify(module, null, 2));
  },
};

const customFileEvents = {
  onDownload: (module) => {
    alert('file onDownload:\n' + JSON.stringify(module, null, 2));
  },
};

const customButtonClick = (module) => {
  alert('button onClick:\n' + JSON.stringify(module, null, 2));
};

const customImageClick = (module) => {
  alert('image onClick:\n' + JSON.stringify(module, null, 2));
};

export default () => {
  return (
    <MessagePreview
      type="card"
      content={cards}
      external="https://cdn.jsdelivr.net/npm/@kookapp/kook-message-preview@0.0.3/dist/markdown-parse.0.0.10.js"
      customVideoEvents={customVideoEvents}
      customAudioEvents={customAudioEvents}
      customFileEvents={customFileEvents}
      customButtonClick={customButtonClick}
      customImageClick={customImageClick}
    />
  );
};
