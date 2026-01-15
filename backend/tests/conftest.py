from collective.blockslisting.testing import ACCEPTANCE_TESTING
from collective.blockslisting.testing import FUNCTIONAL_TESTING
from collective.blockslisting.testing import INTEGRATION_TESTING
from plone import api
from plone.restapi.testing import RelativeSession
from pytest_plone import fixtures_factory

import pytest
import transaction


pytest_plugins = ["pytest_plone"]

globals().update(
    fixtures_factory((
        (INTEGRATION_TESTING, "integration"),
        (FUNCTIONAL_TESTING, "functional"),
        (ACCEPTANCE_TESTING, "acceptance"),
    ))
)


@pytest.fixture
def api_client(functional):
    portal = functional["portal"]
    client = RelativeSession(portal.absolute_url())
    client.headers.update({"Accept": "application/json"})
    client.auth = ("admin", "secret")
    return client


@pytest.fixture
def blocks_content(functional):
    portal = functional["portal"]
    with api.env.adopt_roles(["Manager"]):
        api.content.create(
            container=portal,
            type="Document",
            title="Doc 1",
            blocks={"a": {"@type": "slider"}},
            blocks_layout={"items": ["a"]},
        )
        api.content.create(
            container=portal,
            type="Document",
            title="Doc 2",
            blocks={
                "a": {"@type": "slider"},
                "b": {"@type": "hero"},
            },
            blocks_layout={"items": ["a", "b"]},
        )
        api.content.create(
            container=portal,
            type="Document",
            title="Doc 3",
            blocks={"a": {"@type": "hero"}},
            blocks_layout={"items": ["a"]},
        )

    transaction.commit()
    return portal
