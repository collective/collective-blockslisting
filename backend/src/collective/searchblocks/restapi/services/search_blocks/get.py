from plone import api
from plone.restapi.batching import HypermediaBatch
from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.serializer.converters import json_compatible
from plone.restapi.services import Service
from zope.component import getMultiAdapter

import contextlib


class SearchBlocksGet(Service):
    def reply(self):
        catalog = api.portal.get_tool("portal_catalog")
        all_block_types = []
        with contextlib.suppress(KeyError):
            all_block_types = list(catalog.uniqueValuesFor("block_types"))

        result = {"block_types": all_block_types}

        block_types_query = self.request.form.get("block_types")

        if block_types_query:
            query = {"block_types": block_types_query, "sort_on": "sortable_title"}

            lazy_result = catalog.searchResults(**query)

            batch = HypermediaBatch(self.request, lazy_result)

            results = []
            for brain in batch:
                summary = getMultiAdapter(
                    (brain, self.request), ISerializeToJsonSummary
                )()
                results.append(summary)

            result["items"] = results
            result["items_total"] = batch.items_total
            links = batch.links
            if links:
                result["batching"] = links

        return json_compatible(result)
