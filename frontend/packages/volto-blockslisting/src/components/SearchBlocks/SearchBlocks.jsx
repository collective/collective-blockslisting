import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Container,
  Segment,
  Header,
  Button,
  Dropdown,
  Table,
} from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Pagination from '@plone/volto/components/theme/Pagination/Pagination';
import Error from '@plone/volto/components/theme/Error/Error';
import backSVG from '@plone/volto/icons/back.svg';
import { useClient } from '@plone/volto/hooks';
import { useIntl, FormattedMessage, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import { searchBlocks } from '../../actions/searchBlocks';

const messages = defineMessages({
  pageTitle: {
    id: 'Search blocks',
    defaultMessage: 'Search blocks',
  },
  pageDescription: {
    id: 'On this page you can see which contents on the site use a specific block',
    defaultMessage:
      'On this page you can see which contents on the site use a specific block',
  },
  selectBlockType: {
    id: 'Select Block Type',
    defaultMessage: 'Select Block Type:',
  },
  blockTypeLabel: {
    id: 'Block Type',
    defaultMessage: 'Block Type',
  },
  chooseBlockType: {
    id: 'Choose a block type',
    defaultMessage: 'Choose a block type',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  type: {
    id: 'Type',
    defaultMessage: 'Type',
  },
  reviewState: {
    id: 'Review State',
    defaultMessage: 'Review State',
  },
  created: {
    id: 'Created',
    defaultMessage: 'Created',
  },
  modified: {
    id: 'Modified',
    defaultMessage: 'Modified',
  },
  results: {
    id: 'Results',
    defaultMessage: 'Results',
  },
  loading: {
    id: 'Loading',
    defaultMessage: 'Loading...',
  },
  noResults: {
    id: 'No results found for',
    defaultMessage: 'No results found for',
  },
  backToControlPanel: {
    id: 'Back to Control Panel',
    defaultMessage: 'Back to Control Panel',
  },
});

const SearchBlocks = (props) => {
  const dispatch = useDispatch();
  const isClient = useClient();
  const intl = useIntl();
  const pathname = props.location?.pathname || '/controlpanel/blocks-search';
  const [selectedBlockType, setSelectedBlockType] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(
    config.settings.defaultPageSize,
  );

  const searchResults = useSelector((state) => state.searchBlocks);
  const { block_types, items, total, loading, batching, b_start, error } =
    searchResults;

  useEffect(() => {
    // Initial fetch to get block types
    dispatch(searchBlocks());
  }, [dispatch]);

  if (error) {
    return <Error error={error} />;
  }

  const handleSelect = (key) => {
    setSelectedBlockType(key);
    setCurrentPage(0);
    dispatch(searchBlocks({ block_types: key }));
  };

  const handlePageChange = (e, { value }) => {
    setCurrentPage(value);
    dispatch(
      searchBlocks({
        block_types: selectedBlockType,
        b_size: currentPageSize,
        b_start: value * currentPageSize,
      }),
    );
  };

  const handlePageSizeChange = (e, { value }) => {
    setCurrentPageSize(
      value === intl.formatMessage({ id: 'All', defaultMessage: 'All' })
        ? total
        : value,
    );
    setCurrentPage(0);
    dispatch(
      searchBlocks({
        block_types: selectedBlockType,
        b_size:
          value === intl.formatMessage({ id: 'All', defaultMessage: 'All' })
            ? total
            : value,
      }),
    );
  };

  return (
    <Container className="view-wrapper controlpanel-blocks-search">
      <Helmet title={intl.formatMessage(messages.pageTitle)} />
      <Segment.Group raised>
        <Segment className="primary">
          <Header as="h1">
            <FormattedMessage {...messages.pageTitle} />
          </Header>
          <p>
            <FormattedMessage {...messages.pageDescription} />
          </p>
        </Segment>

        <Segment>
          <div className="blocks-search-controls">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <FormattedMessage {...messages.selectBlockType} />
            </label>
            <Dropdown
              placeholder={intl.formatMessage(messages.chooseBlockType)}
              selection
              options={
                block_types?.map((type) => ({
                  key: type,
                  text: type,
                  value: type,
                })) || []
              }
              onChange={(e, { value }) => handleSelect(value)}
              value={selectedBlockType || ''}
            />
          </div>
        </Segment>

        <Segment>
          <div className="blocks-search-results">
            {loading && (
              <div className="loader">
                <FormattedMessage {...messages.loading} />
              </div>
            )}

            {!loading && items && items.length > 0 && (
              <>
                <Header as="h2">
                  <FormattedMessage
                    {...messages.results}
                    values={{ count: total }}
                  />{' '}
                  ({total})
                </Header>
                <Table celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <FormattedMessage {...messages.title} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage {...messages.type} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage {...messages.reviewState} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage {...messages.created} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage {...messages.modified} />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {items.map((item) => (
                      <Table.Row key={item['@id']}>
                        <Table.Cell>
                          <a href={item['@id']}>{item.title}</a>
                        </Table.Cell>
                        <Table.Cell>{item['@type']}</Table.Cell>
                        <Table.Cell>{item.review_state}</Table.Cell>
                        <Table.Cell>
                          {item.created
                            ? new Date(item.created).toLocaleDateString()
                            : '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {item.modified
                            ? new Date(item.modified).toLocaleDateString()
                            : '-'}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

                {/* Pagination using Volto component */}
                {batching && (
                  <Pagination
                    current={currentPage}
                    total={Math.ceil(total / currentPageSize)}
                    pageSize={currentPageSize}
                    pageSizes={[
                      config.settings.defaultPageSize,
                      50,
                      intl.formatMessage({ id: 'All', defaultMessage: 'All' }),
                    ]}
                    onChangePage={handlePageChange}
                    onChangePageSize={handlePageSizeChange}
                  />
                )}
              </>
            )}

            {!loading && selectedBlockType && items.length === 0 && (
              <p>
                <FormattedMessage
                  {...messages.noResults}
                  values={{ blockType: selectedBlockType }}
                />{' '}
                {selectedBlockType}.
              </p>
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
                    title={intl.formatMessage(messages.backToControlPanel)}
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

export default SearchBlocks;
