import React from 'react';
import { printEmoji } from '../emoji/emoji';
import CodeblockNode from '../../components/CodeblockNode';
import SpoilerNode from '../../components/SpoilerNode';

function ChannelLinkNode(props) {
  const { channel_id, options } = props;
  const customChannelRender = options?.customChannelRender;
  if (typeof customChannelRender === 'function') {
    return customChannelRender(channel_id);
  }
  return `#频道id:${channel_id}`;
}

function MentionUserNode(props) {
  const { user_id, options } = props;
  const customMetUserRender = options?.customMetUserRender;
  if (typeof customMetUserRender === 'function') {
    return customMetUserRender(user_id);
  }
  return `@用户id:${user_id}`;
}

function MentionRoleNode(props) {
  const { role_id, options } = props;
  const customRoleRender = options?.customRoleRender;
  if (typeof customRoleRender === 'function') {
    return customRoleRender(role_id);
  }
  return `@角色id:1 ${role_id}`;
}

function getCustomEmojiUrl(id) {
  return `https://img.kaiheila.cn/emojis/${id}.png`;
}

function parse(children = [], options) {
  return children.map((item, i) => {
    const { type, tagName: TagName, content, attrs, children } = item;

    let fragment = null;

    switch (type) {
      case 'tag':
        fragment = (
          <React.Fragment key={i}>{parseTag(item, options)}</React.Fragment>
        );
        break;
      case 'control':
        fragment = (
          <React.Fragment key={i}>{parse(children, options)}</React.Fragment>
        );
        break;
      case 'text':
        fragment = (
          <span
            key={i}
            dangerouslySetInnerHTML={{ __html: printEmoji(content) }}
          />
        );
        break;
      default:
        console.error('未识别的类型');
    }
    return fragment;
  });
}

export function mark2fragment(markdown, options) {
  return parse(markdown.children, options);
}

function parseTag(item, options) {
  const { type, tagName: TagName, content, attrs, children } = item;

  let fragment = null;

  const childrenContent = children
    ? children.map((c) => c.content || '').join('')
    : '';
  switch (TagName) {
    case 'a':
      let href = attrs.href || '';
      if (href.startsWith('https://') || href.startsWith('http://')) {
        fragment = (
          <a className="text-link" target="_blank" href={attrs.href}>
            {children && parse(children)}
          </a>
        );
      } else {
        fragment = children && parse(children);
      }
      break;
    case 'emj':
      fragment = (
        <img className="emoji custom" src={getCustomEmojiUrl(attrs.join(''))} />
      );
      break;
    case 'spl':
      fragment = <SpoilerNode>{children && parse(children)}</SpoilerNode>;
      break;
    case 'chn':
      fragment = (
        <ChannelLinkNode channel_id={childrenContent} options={options} />
      );
      break;
    case 'met':
      fragment = (
        <MentionUserNode user_id={childrenContent} options={options} />
      );
      break;
    case 'rol':
      fragment = (
        <MentionRoleNode role_id={childrenContent} options={options} />
      );
      break;

    case 'code':
      fragment = (
        <code className="line">
          {children && children.map((item) => item.content || '').join('')}
        </code>
      );
      break;
    case 'codeblock':
      fragment = (
        <CodeblockNode code={{ text: childrenContent, lang: attrs[0] }} />
      );
      break;
    case 'font':
      fragment = (
        <span className={`kmd-font ${attrs?.theme}  ${attrs?.size}`}>
          {children && parse(children, options)}
        </span>
      );
      break;
    default:
      // 动态渲染标签
      fragment = (
        <TagName {...attrs}>{children && parse(children, options)}</TagName>
      );
  }
  return fragment;
}
