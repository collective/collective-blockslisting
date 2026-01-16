# collective.blockslisting

A comprehensive Plone add-on that provides search functionality for content using specific blocks.

## Features ✨

- **Block Search Endpoint**: RESTful API endpoint (`/@search-blocks`) for searching content by block types
- **Security**: Permission-based access control for the search API
- **Catalog Integration**: Uses Plone's catalog for efficient searching
- **Metadata Support**: Returns rich metadata including title, type, review state, creation and modification dates
- **Pagination**: Support for batched results with configurable page sizes
- **Sorting**: Results sorted by title for consistent ordering

## Installation

Install collective.blockslisting with uv.

```shell
uv add collective.blockslisting
```

Create the Plone site.

```shell
make create-site
```

## REST API

### @search-blocks

Search for content using specific blocks.

**GET /@search-blocks**

Returns a list of all available block types in the catalog.

Response:
```json
{
  "block_types": ["slider", "hero", "text"]
}
```

**GET /@search-blocks?block_types=slider**

Returns content items that have the specified block type, formatted using the standard summary serializer.

Response:
```json
{
  "block_types": ["slider", "hero", "text"],
  "items": [
    {
      "@id": "http://localhost:8080/Plone/doc-1",
      "@type": "Document",
      "title": "Doc 1",
      "description": "...",
      "review_state": "published"
    }
  ],
  "items_total": 1
}
```

Parameters:
- `block_types` (string): The block type to search for.
- `b_size` (int): Batch size (pagination).
- `b_start` (int): Batch start index (pagination).
- `sort_on` (string, automatic): Sorts results by `sortable_title` (automatically added).
- `metadata_fields` (list, automatic): Includes `modified` and `created` metadata fields (automatically added).

## Contribute

- [Issue tracker](https://github.com/collective/collective-blockslisting/issues)
- [Source code](https://github.com/collective/collective-blockslisting/)

### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [uv](https://6.docs.plone.org/install/create-project-cookieplone.html#uv)
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository.

    ```shell
    git clone git@github.com:collective/collective-blockslisting.git
    cd collective-blockslisting/backend
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Add features using `plonecli` or `bobtemplates.plone`

This package provides markers as strings (`<!-- extra stuff goes here -->`) that are compatible with [`plonecli`](https://github.com/plone/plonecli) and [`bobtemplates.plone`](https://github.com/plone/bobtemplates.plone).
These markers act as hooks to add all kinds of features through subtemplates, including behaviors, control panels, upgrade steps, or other subtemplates from `bobtemplates.plone`.
`plonecli` is a command line client for `bobtemplates.plone`, adding autocompletion and other features.

To add a feature as a subtemplate to your package, use the following command pattern.

```shell
make add <template_name>
```

For example, you can add a content type to your package with the following command.

```shell
make add content_type
```

You can add a behavior with the following command.

```shell
make add behavior
```

```{seealso}
You can check the list of available subtemplates in the [`bobtemplates.plone` `README.md` file](https://github.com/plone/bobtemplates.plone/?tab=readme-ov-file#provided-subtemplates).
See also the documentation of [Mockup and Patternslib](https://6.docs.plone.org/classic-ui/mockup.html) for how to build the UI toolkit for Classic UI.
```

## License

The project is licensed under GPLv2.

## Credits and acknowledgements 🙏

Generated from the [`cookieplone-templates`  template](https://github.com/plone/cookieplone-templates/tree/main/) on 2026-01-14 14:29:54.. A special thanks to all contributors and supporters!
