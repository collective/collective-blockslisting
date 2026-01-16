import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';

import { searchBlocks } from './actions/searchBlocks';
import searchBlocksReducer from './reducers/searchBlocks';
import BlocksSearch from './components/BlocksSearch/BlocksSearch';

function applyConfig(config: ConfigType) {
  installSettings(config);

  config.settings.isMultilingual = false;
  config.addonReducers = {
    ...config.addonReducers,
    searchBlocks: searchBlocksReducer,
  };

  config.addonRoutes = [
    ...(config.addonRoutes || []),
    {
      path: '/controlpanel/blocks-search',
      component: BlocksSearch,
    },
  ];

  return config;
}

export default applyConfig;
export { searchBlocks };
