from plone import api
from plone.restapi.testing import RelativeSession

import pytest
import transaction


@pytest.fixture
def testuser_client(functional, blocks_content):
    """Fixture for a client with testuser (without search blocks permission)"""
    portal = functional["portal"]

    # Create a user without the search blocks permission
    with api.env.adopt_roles(["Manager"]):
        api.user.create(username="testuser", email="test@test.com")

    transaction.commit()

    client = RelativeSession(portal.absolute_url())
    client.headers.update({"Accept": "application/json"})
    client.auth = ("testuser", "password")

    return client


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


@pytest.mark.functional
def test_search_blocks_permission_denied_anonymous(functional, blocks_content):
    """Test that anonymous users cannot access the endpoint"""
    portal = functional["portal"]
    client = RelativeSession(portal.absolute_url())
    client.headers.update({"Accept": "application/json"})
    # No auth

    response = client.get("/@search-blocks")
    assert response.status_code == 401


@pytest.mark.functional
def test_search_blocks_permission_denied_authenticated_without_permission(
    testuser_client,
):
    """Test that authenticated users without permission cannot access the endpoint"""
    response = testuser_client.get("/@search-blocks")
    assert response.status_code == 401


@pytest.mark.functional
def test_search_blocks_permission_admin(api_client, blocks_content):
    """Test that admin users can access the endpoint"""
    response = api_client.get("/@search-blocks")
    assert response.status_code == 200
    assert set(response.json()["block_types"]) == {"slider", "hero"}
