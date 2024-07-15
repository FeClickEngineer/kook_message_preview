import React, { useEffect, useRef, useState } from 'react';
import { json2fragment } from './utils/fragment/json2fragment';
import { mark2fragment } from './utils/fragment/mark2fragment';
import { markdownParse } from './utils/parse/markdownParse';
import useExternal from './useExternal';
import '@kaiheila/kui-lib/lib/index.css';
import './styles/index.less';

function MessagePreview(props) {
  const {
    type = 'card',
    content = [],
    theme = 'light',
    external = '',
    channelLinkNode = (id) => '#频道',
    mentionUserNode = (id) => '@用户',
    mentionRoleNode = (id) => '@角色',
  } = props;

  const status = useExternal(external, {
    js: {
      async: true,
    },
  });

  // markdown解析方法加载成功后再渲染组件
  if (external && status !== 'ready') {
    return null;
  }

  if (type === 'card') {
    return (
      <div className={`card-message-preview theme-${theme}`}>
        {json2fragment(
          typeof content === 'string' ? JSON.parse(content) : content,
          mentionUserNode,
          mentionRoleNode,
          channelLinkNode,
        )}
      </div>
    );
  }

  if (type === 'kmd') {
    return (
      <span className={`markdown-preview theme-${theme}`}>
        {mark2fragment(
          markdownParse(content),
          mentionUserNode,
          mentionRoleNode,
          channelLinkNode,
        )}
      </span>
    );
  }

  return null;
}

export default MessagePreview;
