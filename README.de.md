# AvalynxAutocomplete

[![npm version](https://img.shields.io/npm/v/avalynx-autocomplete)](https://www.npmjs.com/package/avalynx-autocomplete)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-autocomplete)](https://www.npmjs.com/package/avalynx-autocomplete)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-autocomplete)](https://www.jsdelivr.com/package/npm/avalynx-autocomplete)
[![License](https://img.shields.io/npm/l/avalynx-autocomplete)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-autocomplete/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-autocomplete/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-autocomplete/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-autocomplete)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-autocomplete?style=flat&logo=github)](https://github.com/avalynx/avalynx-autocomplete)

AvalynxAutocomplete ist eine leichtgewichtige, anpassbare Autocomplete-Komponente für Webanwendungen. Sie wurde für die Verwendung mit Bootstrap Version 5.3 oder höher entwickelt und benötigt keine Framework-Abhängigkeiten.

## Funktionen

- **Anpassbare Autocomplete-Eingaben**: Unterstützt verschiedene Anpassungsoptionen wie Single- und Multi-Select, Case-Sensitivity, Mindestlänge für die Suche und Debouncing.
- **Flexible Datenquellen**: Unterstützung für statische Daten oder dynamisches Laden über eine benutzerdefinierte `fetchData`-Funktion.
- **Multi-Select-Unterstützung**: Verwaltung von mehreren Auswahlen mit Tags, die entweder oberhalb oder inline im Eingabefeld angezeigt werden können.
- **Bootstrap-Integration**: Entwickelt für die nahtlose Integration mit Bootstrap >= 5.3.
- **Einfach zu bedienen**: Einfache API zum Erstellen und Verwalten von Autocomplete-Feldern in Ihren Webanwendungen.

## Beispiele

Hier ist eine Übersicht über verschiedene Anwendungsfälle für AvalynxAutocomplete:

* [Übersicht](https://avalynx-autocomplete.jbs-newmedia.de/examples/index.html)
* [All-in-One-Demo](https://avalynx-autocomplete.jbs-newmedia.de/examples/autocomplete.html)
* [Single-Select (Button-Stil)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-button.html)
* [Single-Select (Icon-Stil)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-icon.html)
* [Single-Select (vorausgewählt)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-preselected.html)
* [Single-Select (vorausgewählt, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/single-select-preselected-ajax.html)
* [Multi-Select (Tags oberhalb, Button-Stil)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-button.html)
* [Multi-Select (Tags oberhalb, Button-Stil, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-button-ajax.html)
* [Multi-Select (Tags oberhalb, Icon-Stil)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-icon.html)
* [Multi-Select (Tags oberhalb, Icon-Stil, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-above-icon-ajax.html)
* [Multi-Select (Tags inline, Button-Stil)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-button.html)
* [Multi-Select (Tags inline, Button-Stil, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-button-ajax.html)
* [Multi-Select (Tags inline, Icon-Stil)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-icon.html)
* [Multi-Select (Tags inline, Icon-Stil, Ajax)](https://avalynx-autocomplete.jbs-newmedia.de/examples/multi-select-inline-icon-ajax.html)

## Installation

Um AvalynxAutocomplete in Ihrem Projekt zu verwenden, können Sie es direkt in Ihre HTML-Datei einbinden. Stellen Sie sicher, dass Sie Bootstrap 5.3 oder höher in Ihrem Projekt eingebunden haben.

Binden Sie zuerst Bootstrap ein:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Binden Sie dann AvalynxAutocomplete ein (CSS und JS):

```html
<link rel="stylesheet" href="pfad/zu/avalynx-autocomplete.css">
<script src="pfad/zu/avalynx-autocomplete.js"></script>
```

Ersetzen Sie `pfad/zu/` durch den tatsächlichen Pfad zur Datei in Ihrem Projekt.

## Installation über jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-autocomplete/))

AvalynxAutocomplete ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Sie können es wie folgt in Ihr Projekt einbinden:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/avalynx-autocomplete@1.0.0/dist/css/avalynx-autocomplete.css">
<script src="https://cdn.jsdelivr.net/npm/avalynx-autocomplete@1.0.0/dist/js/avalynx-autocomplete.js"></script>
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden.

## Installation über NPM ([Link](https://www.npmjs.com/package/avalynx-autocomplete))

AvalynxAutocomplete ist auch als npm-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
npm install avalynx-autocomplete
```

Nach der Installation können Sie AvalynxAutocomplete wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxAutocomplete } from 'avalynx-autocomplete';
```

## Installation über Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-autocomplete
```

Nach der Installation können Sie AvalynxAutocomplete wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxAutocomplete } from 'avalynx-autocomplete';
```

## Installation über Symfony AssetComposer

Weitere Informationen zum Symfony AssetComposer Bundle finden Sie [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-autocomplete/dist/css/avalynx-autocomplete.css') %}
{% do addAssetComposer('avalynx/avalynx-autocomplete/dist/js/avalynx-autocomplete.js') %}
```

## Installation über Composer ([Link](https://packagist.org/packages/avalynx/avalynx-autocomplete))

AvalynxAutocomplete ist auch als Composer-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-autocomplete
```

Nach der Installation können Sie AvalynxAutocomplete wie folgt in Ihre HTML-Datei einbinden:

```html
<link rel="stylesheet" href="vendor/avalynx/avalynx-autocomplete/dist/css/avalynx-autocomplete.css">
<script src="vendor/avalynx/avalynx-autocomplete/dist/js/avalynx-autocomplete.js"></script>
``` 

## Verwendung

Um ein Autocomplete-Feld zu erstellen, instanziieren Sie einfach ein neues `AvalynxAutocomplete`-Objekt mit den gewünschten Optionen:

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
  placeholder: 'Suchen...',
  noResults: 'Keine Ergebnisse gefunden'
});
```

Für die Verwendung mit einer API (`fetchData`):

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

## Optionen

AvalynxAutocomplete erlaubt die folgenden Optionen zur Anpassung:

- `selector`: (string) Der Selektor für die Eingabeelemente (Standard: `'.avalynx-autocomplete'`).
- `options`: Ein Objekt, das die folgenden Schlüssel enthält:
    - `className`: (string) Zusätzliche CSS-Klassen für das Dropdown (Standard: `''`).
    - `maxItems`: (number) Maximale Anzahl der im Dropdown angezeigten Ergebnisse (Standard: `5`).
    - `maxSelections`: (number) Maximale Anzahl der auswählbaren Elemente. Bei > 1 wird der Multi-Select-Modus aktiviert (Standard: `1`).
    - `minLength`: (number) Mindestanzahl an Zeichen für den Start der Suche (Standard: `1`).
    - `debounce`: (number) Verzögerung in Millisekunden nach der letzten Tastatureingabe (Standard: `300`).
    - `caseSensitive`: (boolean) Suche mit Beachtung der Groß-/Kleinschreibung (Standard: `false`).
    - `disabled`: (boolean) Initialisierung im deaktivierten Zustand (Standard: `false`).
    - `defaultValue`: (string|null) Standardwert (Label) bei Initialisierung (Standard: `null`).
    - `defaultKey`: (string|null) Standardschlüssel bei Initialisierung (Standard: `null`).
    - `defaultSelections`: (array|null) Array von Objekten `{key, value}` für Multi-Select-Standardwerte (Standard: `null`).
    - `tagsPosition`: (string) Position der Tags bei Multi-Select (`'above'` oder `'inline'`) (Standard: `'above'`).
    - `clearStyle`: (string) Stil des Lösch-Buttons (`'button'` oder `'icon'`) (Standard: `'button'`).
    - `data`: (array|null) Statisches Array von Datenobjekten `{key, value}` (Standard: `null`).
    - `fetchData`: (function|null) Asynchrone Funktion zum Abrufen von Daten (Standard: `null`).
    - `onChange`: (function) Callback bei Änderung der Auswahl (Standard: `null`).
    - `onClear`: (function) Callback beim Leeren des Feldes (Standard: `null`).
    - `onLoaded`: (function) Callback nach Initialisierung der Komponente (Standard: `null`).
- `language`: Ein Objekt, das die folgenden Schlüssel enthält:
    - `placeholder`: (string) Platzhaltertext für das Eingabefeld (Standard: `'Search...'`).
    - `noResults`: (string) Text bei fehlenden Ergebnissen (Standard: `'No results found'`).
    - `clearTitle`: (string) Titel-Attribut für den Lösch-Button (Standard: `'Clear selection'`).
    - `removeTitle`: (string) Titel-Attribut zum Entfernen eines Tags (Standard: `'Remove'`).

## Mitwirken

Beiträge sind willkommen! Wenn Sie beitragen möchten, forken Sie bitte das Repository und senden Sie einen Pull-Request mit Ihren Änderungen oder Verbesserungen. Wir suchen nach Beiträgen in den folgenden Bereichen:

- Fehlerbehebungen
- Funktionserweiterungen
- Verbesserungen der Dokumentation

Bevor Sie Ihren Pull-Request einreichen, stellen Sie bitte sicher, dass Ihre Änderungen gut dokumentiert sind und dem bestehenden Codestil des Projekts entsprechen.

## Lizenz

AvalynxAutocomplete ist Open-Source-Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn Sie Fragen, Funktionswünsche oder Probleme haben, öffnen Sie bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-autocomplete/issues) oder senden Sie einen Pull-Request.

Vielen Dank, dass Sie AvalynxAutocomplete für Ihr Projekt in Betracht ziehen!
