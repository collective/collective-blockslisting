import pytest


@pytest.mark.functional
def test_search_blocks_get_vocabulary(api_client, blocks_content):
    response = api_client.get("/@search-blocks")
    assert set(response.json()["block_types"]) == {"slider", "hero"}


@pytest.mark.functional
def test_search_blocks_filter_slider(api_client, blocks_content):
    response = api_client.get(
        "/@search-blocks",
        params={"block_types": "slider"},
    )
    titles = {item["title"] for item in response.json()["items"]}
    assert titles == {"Doc 1", "Doc 2"}
