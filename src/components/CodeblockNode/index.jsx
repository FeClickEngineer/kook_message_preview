import React from 'react';
import highlight from './highlight';

export default function CodeblockNode(props) {
  let { code } = props;
  let highlightedCode = highlight(code.text, code.lang);
  return (
    <pre className="hlcode">
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
    </pre>
  );
}
