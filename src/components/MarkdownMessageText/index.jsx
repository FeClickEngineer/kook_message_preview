import React from 'react';
import { markdownParse } from '../../utils/parse/markdownParse';
import { mark2fragment } from '../../utils/fragment/mark2fragment';

function MarkdownMessageText(props) {
  const { msgInfo, content } = props;

  return (
    <span className="markdown-preview">
      {mark2fragment(markdownParse(content))}
    </span>
  );
}

export default MarkdownMessageText;
