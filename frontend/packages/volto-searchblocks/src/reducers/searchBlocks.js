import {
  SEARCH_BLOCKS,
  SEARCH_BLOCKS_SUCCESS,
  SEARCH_BLOCKS_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  total: 0,
  block_types: [],
  batching: null,
  b_start: 0,
  loaded: false,
  loading: false,
};

export default function searchBlocks(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_BLOCKS:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case SEARCH_BLOCKS_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.result.items || [],
        total: action.result.items_total || 0,
        block_types: action.result.block_types || [],
        batching: action.result.batching || null,
        b_start: action.result.b_start || 0,
        loaded: true,
        loading: false,
      };
    case SEARCH_BLOCKS_FAIL:
      return {
        ...state,
        error: action.error,
        items: [],
        total: 0,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
