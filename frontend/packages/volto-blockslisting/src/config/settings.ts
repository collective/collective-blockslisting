import type { ConfigType } from '@plone/registry';
import cardsSVG from '@plone/volto/icons/cards.svg';

export default function install(config: ConfigType) {
  // Language settings
  config.settings.isMultilingual = false;
  config.settings.supportedLanguages = ['en'];
  config.settings.defaultLanguage = 'en';

  config.settings.controlpanels = [
    ...config.settings.controlpanels,
    {
      '@id': '/blocks-search',
      group: 'General',
      title: 'Blocks search',
    },
  ];
  config.settings.controlPanelsIcons = {
    ...config.settings.controlPanelsIcons,
    'blocks-search': cardsSVG,
  };
  return config;
}
