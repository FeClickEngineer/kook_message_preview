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

  const onClickPlayInternal = (audio, errorState) => {
    if (typeof onClickPlay === 'function') {
      onClickPlay(props);
    }

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
      onClickPlay={onClickPlayInternal}
      onClickDown={
        typeof onClickDown === 'function'
          ? () => onClickDown(props)
          : downloadMusic
      }
      onClickCancel={onClickCancel}
      audio={audio}
    />
  );
}

export default MusicPlayer;
