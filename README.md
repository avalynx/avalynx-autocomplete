# AvalynxAutocomplete

[![npm version](https://img.shields.io/npm/v/avalynx-autocomplete)](https://www.npmjs.com/package/avalynx-autocomplete)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-autocomplete)](https://www.npmjs.com/package/avalynx-autocomplete)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-autocomplete)](https://www.jsdelivr.com/package/npm/avalynx-autocomplete)
[![License](https://img.shields.io/npm/l/avalynx-autocomplete)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-autocomplete/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-autocomplete/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-autocomplete/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-autocomplete)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-autocomplete?style=flat&logo=github)](https://github.com/avalynx/avalynx-autocomplete)

AvalynxAutocomplete is a lightweight, customizable autocomplete component for web applications. It is designed to be used with Bootstrap version 5.3 or higher and does not require any framework dependencies.

## Features

- **Customizable Autocomplete Inputs**: Supports various customization options like single- and multi-select, case-sensitivity, minimum length for search, and debouncing.
- **Flexible Data Sources**: Support for static data or dynamic loading via a custom `fetchData` function.
- **Multi-Select Support**: Management of multiple selections with tags, which can be displayed either above or inline in the input field.
- **Bootstrap Integration**: Designed for seamless integration with Bootstrap >= 5.3.
- **Easy to Use**: Simple API for creating and managing autocomplete fields in your web applications.

## Examples

Here is an overview of various use cases for AvalynxAutocomplete:

* [Overview](https://avalynx-autocomplete.jbs-newmedia.de/examples/index.html)
* [All-in-one Demo](https://avalynx-autocomplete.jbs-newmedia.de/examples/autocomplete.html)
* [Single-select (Button Style)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-button.html)
* [Single-select (Icon Style)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-icon.html)
* [Single-select (Pre-selected)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-preselected.html)
* [Single-select (Pre-selected, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-preselected-ajax.html)
* [Multi-select (Tags above, Button Style)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-button.html)
* [Multi-select (Tags above, Button Style, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-button-ajax.html)
* [Multi-select (Tags above, Icon Style)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-icon.html)
* [Multi-select (Tags above, Icon Style, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-icon-ajax.html)
* [Multi-select (Tags inline, Button Style)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-button.html)
* [Multi-select (Tags inline, Button Style, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-button-ajax.html)
* [Multi-select (Tags inline, Icon Style)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-icon.html)
* [Multi-select (Tags inline, Icon Style, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-icon-ajax.html)

## Installation

To use AvalynxAutocomplete in your project, you can directly include it in your HTML file. Ensure you have Bootstrap 5.3 or higher included in your project.

First, include Bootstrap:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Then, include AvalynxAutocomplete (CSS and JS):

```html
<link rel="stylesheet" href="path/to/avalynx-autocomplete.css">
<script src="path/to/avalynx-autocomplete.js"></script>
```

Replace `path/to/` with the actual path to the file in your project.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-autocomplete/))

AvalynxAutocomplete is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/avalynx-autocomplete@1.0.1/dist/css/avalynx-autocomplete.css">
<script src="https://cdn.jsdelivr.net/npm/avalynx-autocomplete@1.0.1/dist/js/avalynx-autocomplete.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project.

## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-autocomplete))

AvalynxAutocomplete is also available as an npm package. You can add it to your project with the following command:

```bash
npm install avalynx-autocomplete
```

After installation, you can import AvalynxAutocomplete into your JavaScript file like this:

```javascript
import { AvalynxAutocomplete } from 'avalynx-autocomplete';
```

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-autocomplete
```

After installation, you can import AvalynxAutocomplete into your JavaScript file like this:

```javascript
import { AvalynxAutocomplete } from 'avalynx-autocomplete';
```

## Installation via Symfony AssetComposer

More information about the Symfony AssetComposer Bundle can be found [here](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-autocomplete/dist/css/avalynx-autocomplete.css') %}
{% do addAssetComposer('avalynx/avalynx-autocomplete/dist/js/avalynx-autocomplete.js') %}
```

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-autocomplete))

AvalynxAutocomplete is also available as a Composer package. You can add it to your project with the following command:

```bash
composer require avalynx/avalynx-autocomplete
```

After installation, you can include AvalynxAutocomplete in your HTML file like this:

```html
<link rel="stylesheet" href="vendor/avalynx/avalynx-autocomplete/dist/css/avalynx-autocomplete.css">
<script src="vendor/avalynx/avalynx-autocomplete/dist/js/avalynx-autocomplete.js"></script>
``` 

## Usage

To create an autocomplete field, simply instantiate a new `AvalynxAutocomplete` object with the desired options:

```javascript
new AvalynxAutocomplete("#myAutocomplete", {
  data: [
    { key: '1', value: 'Option 1' },
    { key: '2', value: 'Option 2' },
    { key: '3', value: 'Option 3' }
  ],
  maxItems: 10,
  minLength: 2
}, {
  placeholder: 'Search...',
  noResults: 'No results found'
});
```

For use with an API (`fetchData`):

```javascript
new AvalynxAutocomplete("#myAjaxAutocomplete", {
  fetchData: async (query) => {
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await response.json();
    return data.map(item => ({ key: item.id, value: item.name }));
  },
  minLength: 3
});
```

## Options

AvalynxAutocomplete allows the following options for customization:

- `selector`: (string) The selector for the input elements (default: `'.avalynx-autocomplete'`).
- `options`: An object containing the following keys:
    - `className`: (string) Additional CSS classes for the dropdown (default: `''`).
    - `maxItems`: (number) Maximum number of results displayed in the dropdown (default: `5`).
    - `maxSelections`: (number) Maximum number of selectable items. If > 1, multi-select mode is activated (default: `1`).
    - `minLength`: (number) Minimum number of characters to start the search (default: `1`).
    - `debounce`: (number) Delay in milliseconds after the last keystroke (default: `300`).
    - `caseSensitive`: (boolean) Case-sensitive search (default: `false`).
    - `disabled`: (boolean) Initialize in a disabled state (default: `false`).
    - `defaultValue`: (string|null) Default value (label) upon initialization (default: `null`).
    - `defaultKey`: (string|null) Default key upon initialization (default: `null`).
    - `defaultSelections`: (array|null) Array of objects `{key, value}` for multi-select default values (default: `null`).
    - `tagsPosition`: (string) Position of tags in multi-select (`'above'` or `'inline'`) (default: `'above'`).
    - `clearStyle`: (string) Style of the clear button (`'button'` or `'icon'`) (default: `'button'`).
    - `data`: (array|null) Static array of data objects `{key, value}` (default: `null`).
    - `fetchData`: (function|null) Asynchronous function for fetching data (default: `null`).
    - `onChange`: (function) Callback on selection change (default: `null`).
    - `onClear`: (function) Callback when the field is cleared (default: `null`).
    - `onLoaded`: (function) Callback after component initialization (default: `null`).
- `language`: An object containing the following keys:
    - `placeholder`: (string) Placeholder text for the input field (default: `'Search...'`).
    - `noResults`: (string) Text when no results are found (default: `'No results found'`).
    - `clearTitle`: (string) Title attribute for the clear button (default: `'Clear selection'`).
    - `removeTitle`: (string) Title attribute for removing a tag (default: `'Remove'`).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes or improvements. We're looking for contributions in the following areas:

- Bug fixes
- Feature enhancements
- Documentation improvements

Before submitting your pull request, please ensure your changes are well-documented and follow the existing coding style of the project.

## License

AvalynxAutocomplete is open-source software licensed under the [MIT license](LICENSE).

## Contact

If you have any questions, feature requests, or issues, please open an issue in our [GitHub repository](https://github.com/avalynx/avalynx-autocomplete/issues) or submit a pull request.

Thank you for considering AvalynxAutocomplete for your project!
