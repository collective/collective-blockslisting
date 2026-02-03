import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';

import { searchBlocks } from './actions/searchBlocks';
import searchBlocksReducer from './reducers/searchBlocks';
import SearchBlocks from './components/SearchBlocks/SearchBlocks';

function applyConfig(config: ConfigType) {
  installSettings(config);

  config.addonReducers = {
    ...config.addonReducers,
    searchBlocks: searchBlocksReducer,
  };

  config.addonRoutes = [
    ...(config.addonRoutes || []),
    {
      path: '/controlpanel/search-blocks',
      component: SearchBlocks,
    },
  ];

  return config;
}

export default applyConfig;
export { searchBlocks };
