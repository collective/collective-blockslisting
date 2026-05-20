try:
    from setuptools import setup
except ImportError:

    def setup(**kwargs):
        return 0


if __name__ == "__main__":
    setup(
        classifiers=[
            "Development Status :: 3 - Alpha",
            "Environment :: Web Environment",
            "Framework :: Plone",
            "Framework :: Plone :: 6.0",
            "Framework :: Plone :: 6.1",
            "Framework :: Plone :: Addon",
            "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
            "Operating System :: OS Independent",
            "Programming Language :: Python",
            "Programming Language :: Python :: 3.11",
            "Programming Language :: Python :: 3.12",
            "Programming Language :: Python :: 3.13",
        ]
    )
