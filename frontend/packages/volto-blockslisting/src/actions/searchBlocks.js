import { SEARCH_BLOCKS } from '../constants/ActionTypes';

export function searchBlocks(options = {}) {
  let query = '';
  if (options.block_types) {
    query = `?block_types=${options.block_types}`;
  }
  if (options.b_size) {
    query += `${query ? '&' : '?'}b_size=${options.b_size}`;
  }
  if (options.b_start) {
    query += `${query ? '&' : '?'}b_start=${options.b_start}`;
  }

  return {
    type: SEARCH_BLOCKS,
    request: {
      op: 'get',
      path: `/@search-blocks${query}`,
    },
  };
}
