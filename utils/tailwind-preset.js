const plugin = require('tailwindcss/plugin');
const pluginTypography = require('@tailwindcss/typography');
const { COLOR_THEMES, FONT_THEMES } = require('../themes');

const THEME = 'default';
const FONT_PRIMARY = 'sans-serif';
const FONT_SECONDARY = 'sans-serif';

const hoveredSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant('hovered-sibling', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:hover + .hovered-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

const themesConfig = plugin(function ({ addComponents }) {
  const cssVars = {};

  Object.keys(COLOR_THEMES[THEME].colors).forEach((key) => {
    cssVars[`--color-${key}`] = `${COLOR_THEMES[THEME].colors[key]}`;
  });

  cssVars['--font-primary'] = FONT_THEMES[FONT_PRIMARY];
  cssVars['--font-secondary'] = FONT_THEMES[FONT_SECONDARY];

  const themeCompiled = {
    '.theme-compiled': cssVars,
  };

  addComponents(themeCompiled);
});

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        customDark: '#232323',
        darkPrimary: '#FF6A00'
      },
      fonts: {
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secondary)',
      },
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.100') },
              'a code': { color: theme('colors.gray.100') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      borderWidth: ['last', 'hovered-sibling'],
      typography: ['dark'],
    },
  },
  plugins: [hoveredSiblingPlugin, pluginTypography, themesConfig],
};
