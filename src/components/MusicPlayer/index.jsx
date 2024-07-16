import React, { useState } from 'react';
import { Music } from '@kaiheila/kui-lib';

let audio = null;
function MusicPlayer(props) {
  const { canDownload, src, onClickPlay, onClickDown } = props;

  const download = canDownload !== false;

  const [state, set_state] = useState({
    status: 'done',
    progress: 0,
  });

  const onDefaultClickPlay = (audio, errorState) => {
    if (errorState) {
      console.error('music play error:', errorState);
      return;
    }
    audio.play();
  };

  const downloadMusic = () => {
    const a = document.createElement('a');
    a.href = src;
    a.setAttribute('target', '_blank');
    a.rel = 'noopener noreferror';
    a.click();
  };

  // 不支持
  const onClickCancel = () => {};

  return (
    <Music
      {...props}
      download={download}
      status={state.status}
      progress={state.progress}
      onClickPlay={
        typeof onClickPlay === 'function'
          ? () => onClickPlay(src)
          : onDefaultClickPlay
      }
      onClickDown={
        typeof onClickDown === 'function'
          ? () => onClickDown(src)
          : downloadMusic
      }
      onClickCancel={onClickCancel}
      audio={audio}
    />
  );
}

export default MusicPlayer;
