"""Setup for collective.blockslisting"""

from setuptools import setup, find_packages
import os

# Read version from backend package
version_file = os.path.join(
    os.path.dirname(__file__),
    "backend",
    "src",
    "collective",
    "blockslisting",
    "__init__.py",
)
version = None
with open(version_file) as f:
    for line in f:
        if line.startswith("__version__"):
            version = line.split("=")[1].strip().strip('"').strip("'")
            break

if version is None:
    raise ValueError(
        "Could not find __version__ in backend/src/collective/blockslisting/__init__.py"
    )

# Read long description from README
with open(os.path.join(os.path.dirname(__file__), "backend", "README.md")) as f:
    long_description = f.read()

setup(
    name="collective.blockslisting",
    version=version,
    description="Additional control-panel that allow users to search which contents using a specific block",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="RedTurtle Technology",
    author_email="sviluppo@redturtle.it",
    url="https://github.com/collective/collective-blockslisting",
    license="GPL-2.0-only",
    packages=find_packages("backend/src"),
    package_dir={"": "backend/src"},
    namespace_packages=["collective"],
    install_requires=[
        "Products.CMFPlone==6.1.3",
        "plone.api",
        "plone.restapi",
        "plone.volto",
    ],
    extras_require={
        "test": [
            "horse-with-no-namespace",
            "plone.app.testing",
            "plone.restapi[test]",
            "pytest",
            "pytest-cov",
            "pytest-plone>=0.5.0",
        ],
    },
    python_requires=">=3.12",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: 6.1",
        "Framework :: Plone :: Addon",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.12",
    ],
    entry_points={
        "plone.autoinclude.plugin": [
            "target = plone",
        ],
    },
    zip_safe=False,
)
