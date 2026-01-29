from collective.blockslisting import logger
from pathlib import Path
from plone import api
try:
    from plone.exportimport import importers
    PLONE_60 = False
except ImportError:
    PLONE_60 = True
from Products.GenericSetup.tool import SetupTool


EXAMPLE_CONTENT_FOLDER = Path(__file__).parent / "examplecontent"


def create_example_content(portal_setup: SetupTool):
    """Import content available at the examplecontent folder."""
    portal = api.portal.get()
    if not Plone_60:
        importer = importers.get_importer(portal)
        for line in importer.import_site(EXAMPLE_CONTENT_FOLDER):
            logger.info(line)
