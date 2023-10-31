import React from 'react';
import twemoji from 'twemoji';

const options = {
  decodeEntities: true,
  transform: (node) => {},
};

export function printReactEmoji(str) {
  if (!str) {
    return '';
  }
  str = encodeLocalHtml(`${str}`);
  str = twemoji.parse(str, {
    folder: 'svg',
    ext: '.svg',
  });

  return <span dangerouslySetInnerHTML={{ __html: str }}></span>;
}

export function encodeLocalHtml(sHtml = '') {
  return sHtml.replace(/[<>&"]/g, function (c) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;',
      '&#8238;': '',
      '&#8207;': '',
    }[c];
  });
}

//不转义&nbsp;其他转义
export function htmlEncode(str = '') {
  let s = '';
  if (str.length == 0) return '';
  s = str.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  s = s.replace(/\'/g, '&#39;');
  s = s.replace(/\"/g, '&quot;');
  s = s.replace(/&#8238;/g, '');
  s = s.replace(/&#8207;/g, '');
  return s;
}

export function printEmoji(str, encodenbsp = true) {
  if (!str) {
    return '';
  }
  str = `${str}`;
  if (encodenbsp) {
    str = encodeLocalHtml(str);
  } else {
    str = htmlEncode(str);
  }
  str = twemoji.parse(str, {
    folder: 'svg',
    ext: '.svg',
  });
  return str;
}
