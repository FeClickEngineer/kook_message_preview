import React from 'react';
import { printEmoji } from '../emoji/emoji';
import CodeblockNode from '../../components/CodeblockNode';
import SpoilerNode from '../../components/SpoilerNode';

function ChannelLinkNode() {
  return '#频道';
}
function MentionUserNode() {
  return '@用户';
}
function MentionNode(props) {
  return props.name;
}
function MentionRoleNode() {
  return '@角色';
}

function getCustomEmojiUrl(id) {
  return `https://img.kaiheila.cn/emojis/${id}.png`;
}

function parse(children = []) {
  return children.map((item, i) => {
    const { type, tagName: TagName, content, attrs, children } = item;

    let fragment = null;

    switch (type) {
      case 'tag':
        fragment = <React.Fragment key={i}>{parseTag(item)}</React.Fragment>;
        break;
      case 'control':
        fragment = <React.Fragment key={i}>{parse(children)}</React.Fragment>;
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

export function mark2fragment(markdown) {
  return parse(markdown.children);
}

function parseTag(item) {
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
      fragment = <ChannelLinkNode channel_id={childrenContent} />;
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
          {children && parse(children)}
        </span>
      );
      break;
    default:
      // 动态渲染标签
      fragment = <TagName {...attrs}>{children && parse(children)}</TagName>;
  }
  return fragment;
}
