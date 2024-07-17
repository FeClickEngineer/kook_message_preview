import React from 'react';
import {
  Text,
  Title,
  Section,
  Paragraph,
  Image,
  Button,
  Remark,
  Hr,
  File,
  Video,
  CountDown,
  Card,
  Container,
} from '@kaiheila/kui-lib';
import MarkdownMessageText from '../../components/MarkdownMessageText';
import { printEmoji, printReactEmoji } from '../emoji/emoji';
import MusicPlayer from '../../components/MusicPlayer';
import CardVideoWrapper from '../../components/CardVideoWrapper';

function parseModule(module, cardSize, options) {
  if (typeof module === 'string') {
    return (
      <Text>
        <span dangerouslySetInnerHTML={{ __html: printEmoji(module) }}></span>
      </Text>
    );
  } else if (!module) {
    return '';
  }
  const { elements = [], type, content } = module;

  let childContent = null;

  let fragment = null;

  switch (type) {
    case 'plain-text':
      fragment = (
        <Text>
          <span dangerouslySetInnerHTML={{ __html: printEmoji(content) }} />
        </Text>
      );
      break;
    case 'header':
      childContent =
        typeof module.text === 'string' ? (
          <React.Fragment>{printReactEmoji(module.text)}</React.Fragment>
        ) : (
          parseModule(module.text, cardSize, options)
        );
      fragment = <Title>{childContent}</Title>;
      break;
    case 'section':
      fragment = (
        <Section
          accessory={
            module.accessory
              ? parseModule(module.accessory, cardSize, options)
              : null
          }
          mode={module.mode}
          size={cardSize}
          colume={
            cardSize === 'sm' &&
            module.accessory &&
            module.accessory.type === 'button'
              ? true
              : false
          }
        >
          {parseModule(module.text, cardSize, options)}
        </Section>
      );
      break;
    case 'paragraph':
      fragment = (
        <Paragraph
          size={cardSize}
          cols={module.cols}
          childrens={parseModuleList(module.fields, cardSize, options)}
        />
      );
      break;
    case 'container':
      fragment = (
        <Container
          size={cardSize}
          elements={module.elements}
          onClickElement={(module) => {
            if (
              module.type === 'image' &&
              typeof options.customImageClick === 'function'
            )
              options.customImageClick(module);
          }}
        />
      );
      break;
    case 'image-group':
      fragment = (
        <Image.Group
          list={elements}
          onClick={(module) => {
            if (typeof options.customImageClick === 'function')
              options.customImageClick(module);
          }}
        />
      );
      break;
    case 'action-group':
      fragment = (
        <Button.Wrapper>
          {parseModuleList(module.elements, cardSize, options)}
        </Button.Wrapper>
      );
      break;
    case 'button':
      childContent = parseModule(module.text, cardSize, options);
      fragment = (
        <Button
          block={cardSize === 'sm'}
          type={module.theme}
          color={module.color}
          onClick={() => {
            if (typeof options.customButtonClick === 'function')
              options.customButtonClick(module);
          }}
        >
          {childContent}
        </Button>
      );
      break;
    case 'context':
      fragment = (
        <Remark>{parseModuleList(elements, cardSize, options)}</Remark>
      );
      break;
    case 'divider':
      fragment = <Hr />;
      break;
    case 'file':
      fragment = (
        <File
          src={module.src}
          outside={module.external}
          fileName={module.title}
          fileSize={module.size}
          onClickDown={
            options.customFileEvents?.onDownload
              ? () => {
                  options.customFileEvents.onDownload(module);
                }
              : undefined
          }
        />
      );
      break;
    case 'video':
      fragment = (
        <CardVideoWrapper
          src={module.src}
          outside={module.external}
          size={cardSize}
          title={module.title}
          fileSize={module.size}
          duration={module.duration}
          poster={module.cover}
          onClickPlay={
            typeof options?.customVideoEvents?.onPlay === 'function'
              ? () => {
                  options.customVideoEvents.onPlay(module);
                }
              : undefined
          }
          onClickDown={
            typeof options?.customVideoEvents?.onDownload === 'function'
              ? () => {
                  options.customVideoEvents.onDownload(module);
                }
              : undefined
          }
        />
      );
      break;
    case 'audio':
      fragment = (
        <MusicPlayer
          src={module.src}
          outside={module.external}
          fileName={module.title}
          fileSize={module.size}
          controls={cardSize !== 'sm'}
          duration={module.duration}
          icon={module.cover}
          id={`${module?.src}${module?.title}`}
          canDownload={module.canDownload}
          onClickPlay={
            typeof options?.customAudioEvents?.onPlay === 'function'
              ? () => {
                  options.customAudioEvents.onPlay(module);
                }
              : undefined
          }
          onClickDown={
            typeof options?.customAudioEvents?.onDownload === 'function'
              ? () => {
                  options.customAudioEvents.onDownload(module);
                }
              : undefined
          }
        />
      );
      break;
    case 'countdown':
      if (module.mode === 'hour') {
        fragment = <CountDown.Hour endTime={module.endTime} size={cardSize} />;
      } else if (module.mode === 'day') {
        fragment = <CountDown.Day endTime={module.endTime} />;
      } else {
        const { startTime = 0, endTime = 0 } = module;
        let duration = endTime - startTime;
        fragment = <CountDown startTime={startTime} duration={duration} />;
      }
      break;
    case 'kmarkdown':
      fragment = <MarkdownMessageText content={content} options={options} />;
      break;
  }
  return fragment;
}

function parseModuleList(moduleList, cardSize, options) {
  moduleList = moduleList || [];

  return moduleList.map((module, i) => {
    return (
      <React.Fragment key={i}>
        {parseModule(module, cardSize, options)}
      </React.Fragment>
    );
  });
}

// 将JSON 转换为 对应元素
export function json2fragment(cardList, options) {
  return cardList.map((card, i) => {
    const { modules = [], color, size, theme } = card;

    return (
      <Card
        color={color}
        theme={theme}
        size={size}
        key={i}
        hideMoreHeight={options.hideMoreHeight}
        collapsed={options.collapsed}
      >
        {parseModuleList(modules, size, options)}
      </Card>
    );
  });
}
