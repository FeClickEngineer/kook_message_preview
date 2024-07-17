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
