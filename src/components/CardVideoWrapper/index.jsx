import React from 'react';
import { Video } from '@kaiheila/kui-lib';
function CardVideoWrapper(props) {
  const { fileSize, src, external, title, size, duration, cover } = props;

  const download_music = () => {
    const a = document.createElement('a');
    a.href = src;
    a.setAttribute('target', '_blank');
    a.rel = 'noopener noreferror';
    a.click();
  };

  return (
    <Video
      src={src}
      outside={external}
      size={size}
      title={title}
      fileSize={fileSize}
      duration={duration}
      poster={cover}
      onClickPlay={() => {}}
      status={'done'}
      onClickDown={download_music}
    />
  );
}

export default CardVideoWrapper;
