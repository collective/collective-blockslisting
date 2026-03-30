"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


__version__ = "0.2.0a0"

PACKAGE_NAME = "collective.searchblocks"

_ = MessageFactory(PACKAGE_NAME)

logger = logging.getLogger(PACKAGE_NAME)
