import React from 'react';
import {Platform} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useTheme} from 'react-native-paper';

const ThemedMarkdown = props => {
  const theme = useTheme();
  const {children} = props;
  return (
    <Markdown
      mergeStyle={true}
      style={{
        body: {
          fontSize: theme.fonts.bodyMedium.fontSize,
        },
        heading1: {
          flexDirection: 'row',
          fontSize: theme.fonts.displayLarge.fontSize,
        },
        heading2: {
          flexDirection: 'row',
          fontSize: theme.fonts.displayMedium.fontSize,
        },
        heading3: {
          flexDirection: 'row',
          fontSize: theme.fonts.displaySmall.fontSize,
        },
        heading4: {
          flexDirection: 'row',
          fontSize: theme.fonts.headlineLarge.fontSize,
        },
        heading5: {
          flexDirection: 'row',
          fontSize: theme.fonts.headlineMedium.fontSize,
        },
        heading6: {
          flexDirection: 'row',
          fontSize: theme.fonts.headlineSmall.fontSize,
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
        textgroup: {},
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
      {children}
    </Markdown>
  );
};

export default ThemedMarkdown;
