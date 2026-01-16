import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Container, Segment, Header } from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import backSVG from '@plone/volto/icons/back.svg';
import { useClient } from '@plone/volto/hooks';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { searchBlocks } from '../../actions/searchBlocks';

const BlocksSearch = (props) => {
  const dispatch = useDispatch();
  const isClient = useClient();
  const pathname = props.location?.pathname || '/controlpanel/blocks-search';
  const [selectedBlockType, setSelectedBlockType] = useState(null);

  const searchResults = useSelector((state) => state.searchBlocks);
  const { block_types, items, total, loading } = searchResults;

  useEffect(() => {
    // Initial fetch to get block types
    dispatch(searchBlocks());
  }, [dispatch]);

  const handleSelect = (key) => {
    setSelectedBlockType(key);
    dispatch(searchBlocks({ block_types: key }));
  };

  return (
    <Container className="view-wrapper controlpanel-blocks-search">
      <Helmet title="Blocks Search" />
      <Segment.Group raised>
        <Segment className="primary">
          <Header as="h1">Blocks Search</Header>
        </Segment>

        <Segment>
          <div className="blocks-search-controls">
            <label
              id="block-type-label"
              style={{ display: 'block', marginBottom: '0.5rem' }}
            >
              Select Block Type:
            </label>
            <Select
              aria-labelledby="block-type-label"
              onSelectionChange={handleSelect}
              selectedKey={selectedBlockType}
            >
              <Button>
                <SelectValue />
                <span aria-hidden="true">▼</span>
              </Button>
              <Popover>
                <ListBox>
                  {block_types?.map((type) => (
                    <ListBoxItem key={type} id={type}>
                      {type}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Popover>
            </Select>
          </div>
        </Segment>

        <Segment>
          <div className="blocks-search-results">
            {loading && <div className="loader">Loading...</div>}

            {!loading && items && items.length > 0 && (
              <>
                <Header as="h2">Results ({total})</Header>
                <ul>
                  {items.map((item) => (
                    <li key={item['@id']}>
                      <a href={item['@id']}>{item.title}</a>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>

                {/* Simple pagination: Prev/Next */}
                {total > 10 && (
                  <div
                    className="pagination-controls"
                    style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}
                  >
                    <Button
                      onPress={() =>
                        dispatch(
                          searchBlocks({
                            block_types: selectedBlockType,
                            b_size: 10,
                            b_start: Math.max(
                              0,
                              (searchResults.b_start || 0) - 10,
                            ),
                          }),
                        )
                      }
                      isDisabled={(searchResults.b_start || 0) === 0}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {Math.floor((searchResults.b_start || 0) / 10) + 1}{' '}
                      of {Math.ceil(total / 10)}
                    </span>
                    <Button
                      onPress={() =>
                        dispatch(
                          searchBlocks({
                            block_types: selectedBlockType,
                            b_size: 10,
                            b_start: (searchResults.b_start || 0) + 10,
                          }),
                        )
                      }
                      isDisabled={(searchResults.b_start || 0) + 10 >= total}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}

            {!loading && selectedBlockType && items.length === 0 && (
              <p>No results found for {selectedBlockType}.</p>
            )}
          </div>
        </Segment>
      </Segment.Group>

      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link to="/controlpanel" className="item">
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title="Back to Control Panel"
                  />
                </Link>
              </>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </Container>
  );
};

export default BlocksSearch;
