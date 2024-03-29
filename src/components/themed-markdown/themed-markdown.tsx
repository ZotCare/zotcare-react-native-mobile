import Markdown from '@ronradtke/react-native-markdown-display';
import PropTypes from 'prop-types';
import React from 'react';
import {Platform, View} from 'react-native';
import {useTheme} from 'react-native-paper';

type Props = {
  children: string | string[];
  alignment?: 'left' | 'center' | 'right' | 'justify';
  style?: any;
};

const ThemedMarkdown = (props: Props) => {
  const theme = useTheme();
  const {children, alignment, style} = props;

  const text = Array.isArray(children) ? ''.concat(...children) : children;

  return (
    <View style={style}>
      <Markdown
        mergeStyle={true}
        style={{
          body: {
            fontSize: theme.fonts.bodyLarge.fontSize,
            fontWeight: theme.fonts.bodyLarge.fontWeight,
            color: theme.colors.onBackground,
          },
          heading1: {
            flexDirection: 'row',
            fontSize: theme.fonts.displayLarge.fontSize,
            fontWeight: theme.fonts.displayLarge.fontWeight,
          },
          heading2: {
            flexDirection: 'row',
            fontSize: theme.fonts.displayMedium.fontSize,
            fontWeight: theme.fonts.displayMedium.fontWeight,
          },
          heading3: {
            flexDirection: 'row',
            fontSize: theme.fonts.displaySmall.fontSize,
            fontWeight: theme.fonts.displaySmall.fontWeight,
          },
          heading4: {
            flexDirection: 'row',
            fontSize: theme.fonts.headlineLarge.fontSize,
            fontWeight: theme.fonts.headlineLarge.fontWeight,
          },
          heading5: {
            flexDirection: 'row',
            fontSize: theme.fonts.headlineMedium.fontSize,
            fontWeight: theme.fonts.headlineMedium.fontWeight,
          },
          heading6: {
            flexDirection: 'row',
            fontSize: theme.fonts.headlineSmall.fontSize,
            fontWeight: theme.fonts.headlineSmall.fontWeight,
          },
          // Horizontal Rule
          hr: {
            backgroundColor: '#000000',
            height: 1,
          },
          // Emphasis
          strong: {
            fontWeight: 'bold',
          },
          em: {
            fontStyle: 'italic',
          },
          s: {
            textDecorationLine: 'line-through',
          },
          // Blockquotes
          blockquote: {
            backgroundColor: '#F5F5F5',
            borderColor: '#CCC',
            borderLeftWidth: 4,
            marginLeft: 5,
            paddingHorizontal: 5,
          },

          // Lists
          bullet_list: {},
          ordered_list: {},
          list_item: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
          },
          // @pseudo class, does not have a unique render rule
          bullet_list_icon: {
            marginLeft: 10,
            marginRight: 10,
          },
          // @pseudo class, does not have a unique render rule
          bullet_list_content: {
            flex: 1,
          },
          // @pseudo class, does not have a unique render rule
          ordered_list_icon: {
            marginLeft: 10,
            marginRight: 10,
          },
          // @pseudo class, does not have a unique render rule
          ordered_list_content: {
            flex: 1,
          },

          // Code
          code_inline: {
            borderWidth: 1,
            borderColor: '#CCCCCC',
            backgroundColor: '#f5f5f5',
            padding: 10,
            borderRadius: 4,
            ...Platform.select({
              ['ios']: {
                fontFamily: 'Courier',
              },
              ['android']: {
                fontFamily: 'monospace',
              },
            }),
          },
          code_block: {
            borderWidth: 1,
            borderColor: '#CCCCCC',
            backgroundColor: '#f5f5f5',
            padding: 10,
            borderRadius: 4,
            ...Platform.select({
              ['ios']: {
                fontFamily: 'Courier',
              },
              ['android']: {
                fontFamily: 'monospace',
              },
            }),
          },
          fence: {
            borderWidth: 1,
            borderColor: '#CCCCCC',
            backgroundColor: '#f5f5f5',
            padding: 10,
            borderRadius: 4,
            ...Platform.select({
              ['ios']: {
                fontFamily: 'Courier',
              },
              ['android']: {
                fontFamily: 'monospace',
              },
            }),
          },

          // Tables
          table: {
            borderWidth: 1,
            borderColor: '#000000',
            borderRadius: 3,
          },
          thead: {},
          tbody: {},
          th: {
            flex: 1,
            padding: 5,
          },
          tr: {
            borderBottomWidth: 1,
            borderColor: '#000000',
            flexDirection: 'row',
          },
          td: {
            flex: 1,
            padding: 5,
          },

          // Links
          link: {
            textDecorationLine: 'underline',
          },
          blocklink: {
            flex: 1,
            borderColor: '#000000',
            borderBottomWidth: 1,
          },
          // Images
          image: {
            flex: 1,
          },
          // Text Output
          text: {},
          textgroup: {
            textAlign: alignment || 'left',
            width: '100%',
          },
          paragraph: {
            marginTop: 10,
            marginBottom: 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          },
          hardbreak: {
            width: '100%',
            height: 1,
          },
          softbreak: {},
          // Believe these are never used but retained for completeness
          pre: {},
          inline: {},
          span: {},
        }}>
        {text}
      </Markdown>
    </View>
  );
};

ThemedMarkdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  alignment: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  style: PropTypes.object,
};

ThemedMarkdown.defaultProps = {
  alignment: 'left',
  style: {},
};

export default ThemedMarkdown;
