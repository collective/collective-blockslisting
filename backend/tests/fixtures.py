from plone import api
from plone.restapi.testing import RelativeSession

import pytest
import transaction


@pytest.fixture
def api_client(functional_portal):
    client = RelativeSession(functional_portal.absolute_url())
    client.headers.update({"Accept": "application/json"})
    client.auth = ("admin", "secret")
    return client


@pytest.fixture
def blocks_content(functional_portal):
    with api.env.adopt_roles(["Manager"]):
        api.content.create(
            container=functional_portal,
            type="Document",
            title="Doc 1",
            blocks={"a": {"@type": "slider"}},
            blocks_layout={"items": ["a"]},
        )
        api.content.create(
            container=functional_portal,
            type="Document",
            title="Doc 2",
            blocks={
                "a": {"@type": "slider"},
                "b": {"@type": "hero"},
            },
            blocks_layout={"items": ["a", "b"]},
        )
        api.content.create(
            container=functional_portal,
            type="Document",
            title="Doc 3",
            blocks={"a": {"@type": "hero"}},
            blocks_layout={"items": ["a"]},
        )

    transaction.commit()
    return functional_portal
