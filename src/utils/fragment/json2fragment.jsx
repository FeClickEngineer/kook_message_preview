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

function parseModule(
  module,
  cardSize,
  msgInfo,
  mentionUserNode,
  mentionRoleNode,
  channelLinkNode,
) {
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
          parseModule(module.text, cardSize)
        );
      fragment = <Title>{childContent}</Title>;
      break;
    case 'section':
      fragment = (
        <Section
          accessory={
            module.accessory ? parseModule(module.accessory, cardSize) : null
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
          {parseModule(module.text, cardSize)}
        </Section>
      );
      break;
    case 'paragraph':
      fragment = (
        <Paragraph
          size={cardSize}
          cols={module.cols}
          childrens={parseModuleList(module.fields, cardSize)}
        />
      );
      break;
    case 'container':
      fragment = <Container size={cardSize} elements={module.elements} />;
      break;
    case 'image-group':
      fragment = <Image.Group list={elements} />;
      break;
    case 'image':
      fragment = (
        <Image
          src={module.src}
          alt={module.alt}
          size={module.size}
          radius={module.circle}
        />
      );
      break;
    case 'action-group':
      fragment = (
        <Button.Wrapper>
          {parseModuleList(module.elements, cardSize)}
        </Button.Wrapper>
      );
      break;
    case 'button':
      childContent = parseModule(module.text, cardSize);
      fragment = (
        <Button
          block={cardSize === 'sm'}
          type={module.theme}
          color={module.color}
        >
          {childContent}
        </Button>
      );
      break;
    case 'context':
      fragment = <Remark>{parseModuleList(elements, cardSize)}</Remark>;
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
          id={`${msgInfo?.id}${module?.src}${module?.title}`}
          canDownload={module.canDownload}
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
      fragment = (
        <MarkdownMessageText
          content={content}
          mentionUserNode={mentionUserNode}
          mentionRoleNode={mentionRoleNode}
          channelLinkNode={channelLinkNode}
        />
      );
      break;
  }
  return fragment;
}

function parseModuleList(moduleList, cardSize) {
  moduleList = moduleList || [];

  return moduleList.map((module, i) => {
    return (
      <React.Fragment key={i}>{parseModule(module, cardSize)}</React.Fragment>
    );
  });
}

// 将JSON 转换为 对应元素
export function json2fragment(cardList) {
  return cardList.map((card, i) => {
    const { modules = [], color, size, theme } = card;

    return (
      <Card color={color} theme={theme} size={size} key={i}>
        {parseModuleList(modules, size)}
      </Card>
    );
  });
}
