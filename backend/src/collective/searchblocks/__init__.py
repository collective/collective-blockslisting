"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


__version__ = "0.1.16"

PACKAGE_NAME = "collective.searchblocks"

_ = MessageFactory(PACKAGE_NAME)

logger = logging.getLogger(PACKAGE_NAME)
