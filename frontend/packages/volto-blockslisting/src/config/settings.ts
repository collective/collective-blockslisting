import type { ConfigType } from '@plone/registry';
import { defineMessages } from 'react-intl';
import cardsSVG from '@plone/volto/icons/cards.svg';

const messages = defineMessages({
  controlPanelTitle: {
    id: 'Search blocks',
    defaultMessage: 'Search blocks',
  },
});

export default function install(config: ConfigType) {
  // Language settings
  config.settings.isMultilingual = false;
  config.settings.supportedLanguages = ['it'];
  config.settings.defaultLanguage = 'it';

  config.settings.controlpanels = [
    ...config.settings.controlpanels,
    {
      '@id': '/search-blocks',
      group: 'General',
      title: messages.controlPanelTitle.defaultMessage,
    },
  ];
  config.settings.controlPanelsIcons = {
    ...config.settings.controlPanelsIcons,
    'blocks-search': cardsSVG,
  };
  return config;
}
