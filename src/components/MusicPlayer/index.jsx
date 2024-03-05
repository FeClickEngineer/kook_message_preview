import React, { useState } from 'react';
import { Music } from '@kaiheila/kui-lib';

let audio = null;
function MusicPlayer(props) {
  const { canDownload, src } = props;

  const download = canDownload !== false;

  const [state, set_state] = useState({
    status: 'done',
    progress: 0,
  });

  const on_click_play = (audio, errorState) => {
    if (errorState) {
      console.error('music play error:', errorState);
      return;
    }
    audio.play();
  };

  const download_music = () => {
    const a = document.createElement('a');
    a.href = src;
    a.setAttribute('target', '_blank');
    a.rel = 'noopener noreferror';
    a.click();
  };

  // 不支持
  const on_click_cancel = () => {};

  return (
    <Music
      {...props}
      download={download}
      status={state.status}
      progress={state.progress}
      onClickPlay={on_click_play}
      onClickDown={download_music}
      onClickCancel={on_click_cancel}
      audio={audio}
    />
  );
}

export default MusicPlayer;
