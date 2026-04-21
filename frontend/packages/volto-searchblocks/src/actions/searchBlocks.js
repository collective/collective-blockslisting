import { SEARCH_BLOCKS } from '../constants/ActionTypes';

export function searchBlocks(options = {}) {
  const params = {
    sort_on: 'sortable_title',
    metadata_fields: ['modified', 'created', 'Type'],
  };

  if (options.block_types) {
    params.block_types = options.block_types;
  }
  if (options.b_size) {
    params.b_size = options.b_size;
  }
  if (options.b_start) {
    params.b_start = options.b_start;
  }

  return {
    type: SEARCH_BLOCKS,
    request: {
      op: 'get',
      path: '/@search-blocks',
      params,
    },
  };
}
