import React from 'react';
import { Video } from '@kaiheila/kui-lib';
function CardVideoWrapper(props) {
  const {
    fileSize,
    src,
    external,
    title,
    size,
    duration,
    cover,
    onClickPlay,
    onClickDown,
  } = props;

  const downloadMusic = () => {
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
      onClickPlay={
        typeof onClickPlay === 'function' ? () => onClickPlay(props) : undefined
      }
      status={'done'}
      onClickDown={
        typeof onClickDown === 'function'
          ? () => onClickDown(props)
          : downloadMusic
      }
    />
  );
}

export default CardVideoWrapper;
