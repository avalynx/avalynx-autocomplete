const AvalynxAutocomplete = require('../src/js/avalynx-autocomplete');

const createInput = ({
    className = 'autocomplete-target',
    name,
    dataset = {},
    disabled = false,
    placeholder = ''
} = {}) => {
    const input = document.createElement('input');
    if (className) input.className = className;
    if (name) input.name = name;
    input.disabled = disabled;
    input.placeholder = placeholder;

    Object.entries(dataset).forEach(([key, value]) => {
        input.dataset[key] = value;
    });

    document.body.appendChild(input);
    return input;
};

const createKeyboardEvent = (key) => ({
    key,
    preventDefault: jest.fn()
});

describe('AvalynxAutocomplete', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
        Element.prototype.scrollIntoView = jest.fn();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('constructor handles missing selector and missing elements', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const autocomplete = new AvalynxAutocomplete();

        expect(autocomplete.options).toBeUndefined();
        expect(errorSpy).toHaveBeenCalledWith(
            "AvalynxAutocomplete: Element(s) with selector '.avalynx-autocomplete' not found"
        );
    });

    test('constructor normalizes selector and supports onLoaded true/false paths', () => {
        createInput({ className: 'custom-selector' });
        const onLoaded = jest.fn();

        const autocompleteWithCallback = new AvalynxAutocomplete('custom-selector', { onLoaded });
        expect(autocompleteWithCallback.instances).toHaveLength(1);
        expect(onLoaded).toHaveBeenCalledTimes(1);

        createInput({ className: 'already-prefixed' });
        const autocompleteWithoutCallback = new AvalynxAutocomplete('.already-prefixed');
        expect(autocompleteWithoutCallback.instances).toHaveLength(1);
    });

    test('createElements covers hidden input naming and dropdown classes', () => {
        createInput({ className: 'name-case', name: 'product' });
        createInput({ className: 'dataset-case', dataset: { keyName: 'my_custom_key' } });
        createInput({ className: 'default-case' });

        const byName = new AvalynxAutocomplete('.name-case', { className: 'custom-one custom-two' });
        const byDataset = new AvalynxAutocomplete('.dataset-case');
        const byDefault = new AvalynxAutocomplete('.default-case');

        expect(byName.instances[0].hiddenInput.name).toBe('product_key');
        expect(byDataset.instances[0].hiddenInput.name).toBe('my_custom_key');
        expect(byDefault.instances[0].hiddenInput.name).toBe('avalynx_autocomplete_key');
        expect(byName.instances[0].dropdown.classList.contains('custom-one')).toBe(true);
        expect(byName.instances[0].dropdown.classList.contains('custom-two')).toBe(true);
    });

    test('createElements supports inline + icon mode and inline focus behavior', () => {
        createInput({ className: 'inline-icon', placeholder: 'Preset placeholder' });
        const autocomplete = new AvalynxAutocomplete('.inline-icon', {
            maxSelections: 3,
            tagsPosition: 'inline',
            clearStyle: 'icon'
        });

        const instance = autocomplete.instances[0];
        const focusSpy = jest.spyOn(instance.input, 'focus').mockImplementation(() => {});

        expect(instance.inputContainer).not.toBeNull();
        expect(instance.clearIcon).not.toBeNull();
        expect(instance.clearBtn).toBeNull();
        expect(instance.inputContainer.classList.contains('avalynx-autocomplete-container-with-icon')).toBe(true);
        expect(instance.input.placeholder).toBe('Preset placeholder');

        instance.inputContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        instance.tagsContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(focusSpy).toHaveBeenCalledTimes(2);
    });

    test('createElements covers non-inline icon path and inline non-icon click path', () => {
        createInput({ className: 'single-icon' });
        const singleIconAutocomplete = new AvalynxAutocomplete('.single-icon', {
            clearStyle: 'icon'
        });
        const singleIconInstance = singleIconAutocomplete.instances[0];

        expect(singleIconInstance.input.classList.contains('avalynx-autocomplete-input-with-icon')).toBe(true);

        createInput({ className: 'inline-button' });
        const inlineButtonAutocomplete = new AvalynxAutocomplete('.inline-button', {
            maxSelections: 2,
            tagsPosition: 'inline',
            clearStyle: 'button'
        });
        const inlineButtonInstance = inlineButtonAutocomplete.instances[0];
        const focusSpy = jest.spyOn(inlineButtonInstance.input, 'focus').mockImplementation(() => {});

        inlineButtonInstance.input.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(focusSpy).not.toHaveBeenCalled();
    });

    test('init disables instance when option disabled or input disabled', () => {
        createInput({ className: 'disabled-option' });
        createInput({ className: 'disabled-input', disabled: true });

        const byOption = new AvalynxAutocomplete('.disabled-option', { disabled: true });
        const byInput = new AvalynxAutocomplete('.disabled-input');

        expect(byOption.instances[0].input.disabled).toBe(true);
        expect(byInput.instances[0].input.disabled).toBe(true);
    });

    test('bindEvents wires input, focus, dropdown, clear, document click and keydown', () => {
        jest.useFakeTimers();

        createInput({ className: 'bind-events' });
        const autocomplete = new AvalynxAutocomplete('.bind-events', { debounce: 10, minLength: 2 });
        const instance = autocomplete.instances[0];

        const handleInputSpy = jest.spyOn(autocomplete, 'handleInput').mockImplementation(() => {});
        const hideDropdownSpy = jest.spyOn(autocomplete, 'hideDropdown');
        const clearSelectionSpy = jest.spyOn(autocomplete, 'clearSelection').mockImplementation(() => {});
        const selectItemSpy = jest.spyOn(autocomplete, 'selectItem').mockImplementation(() => {});
        const handleKeydownSpy = jest.spyOn(autocomplete, 'handleKeydown').mockImplementation(() => {});
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        instance.input.value = 'te';
        instance.input.dispatchEvent(new Event('input', { bubbles: true }));
        const firstTimer = instance.debounceTimer;
        instance.input.dispatchEvent(new Event('input', { bubbles: true }));

        expect(clearTimeoutSpy).toHaveBeenCalledWith(firstTimer);
        jest.runOnlyPendingTimers();
        expect(handleInputSpy).toHaveBeenCalledWith(instance);

        instance.isSelected = false;
        instance.input.value = 'test';
        instance.input.dispatchEvent(new Event('focus', { bubbles: true }));
        expect(handleInputSpy).toHaveBeenCalledWith(instance);

        const countAfterFocus = handleInputSpy.mock.calls.length;
        instance.isSelected = true;
        instance.input.dispatchEvent(new Event('focus', { bubbles: true }));
        expect(handleInputSpy).toHaveBeenCalledTimes(countAfterFocus);

        const item = document.createElement('li');
        item.classList.add('avalynx-autocomplete-item');
        item.dataset.key = 'abc';
        item.dataset.value = 'ABC';
        const child = document.createElement('span');
        item.appendChild(child);
        instance.dropdown.appendChild(item);

        child.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(selectItemSpy).toHaveBeenCalledWith(instance, 'abc', 'ABC');

        const itemWithoutKey = document.createElement('li');
        itemWithoutKey.classList.add('avalynx-autocomplete-item');
        instance.dropdown.appendChild(itemWithoutKey);
        itemWithoutKey.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(selectItemSpy).toHaveBeenCalledTimes(1);

        instance.clearBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(clearSelectionSpy).toHaveBeenCalledWith(instance);

        instance.wrapper.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(hideDropdownSpy).not.toHaveBeenCalled();

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(hideDropdownSpy).toHaveBeenCalledWith(instance);

        instance.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(handleKeydownSpy).toHaveBeenCalled();
    });

    test('bindEvents tolerates instances without clear button/icon', () => {
        createInput({ className: 'manual-bind' });
        const autocomplete = new AvalynxAutocomplete('.manual-bind');

        const manualInstance = {
            input: document.createElement('input'),
            dropdown: document.createElement('ul'),
            clearBtn: null,
            clearIcon: null,
            wrapper: document.createElement('div'),
            debounceTimer: null,
            isSelected: false
        };
        manualInstance.wrapper.appendChild(manualInstance.input);
        manualInstance.wrapper.appendChild(manualInstance.dropdown);

        expect(() => autocomplete.bindEvents(manualInstance)).not.toThrow();
    });

    test('handleInput covers selected, too-short, and successful query branches', async () => {
        createInput({ className: 'handle-input' });
        const autocomplete = new AvalynxAutocomplete('.handle-input', { minLength: 3 });
        const instance = autocomplete.instances[0];

        const searchSpy = jest.spyOn(autocomplete, 'search').mockResolvedValue([{ key: '1', value: 'One' }]);
        const renderSpy = jest.spyOn(autocomplete, 'renderDropdown').mockImplementation(() => {});
        const hideSpy = jest.spyOn(autocomplete, 'hideDropdown').mockImplementation(() => {});

        instance.isSelected = true;
        instance.input.value = 'anything';
        await autocomplete.handleInput(instance);
        expect(searchSpy).not.toHaveBeenCalled();

        instance.isSelected = false;
        instance.input.value = 'ab';
        await autocomplete.handleInput(instance);
        expect(hideSpy).toHaveBeenCalledWith(instance);

        instance.input.value = '  abc  ';
        await autocomplete.handleInput(instance);
        expect(searchSpy).toHaveBeenCalledWith('abc', instance);
        expect(renderSpy).toHaveBeenCalledWith(instance, [{ key: '1', value: 'One' }]);
    });

    test('search covers fetchData success and maxSelections filtering', async () => {
        createInput({ className: 'search-fetch' });
        const fetchData = jest.fn().mockResolvedValue([
            { key: '1', value: 'One' },
            { key: '2', value: 'Two' },
            { key: '3', value: 'Three' }
        ]);
        const autocomplete = new AvalynxAutocomplete('.search-fetch', {
            maxSelections: 3,
            maxItems: 1,
            fetchData
        });
        const instance = autocomplete.instances[0];
        instance.selections = [{ key: '1', value: 'One' }];

        const results = await autocomplete.search('o', instance);

        expect(fetchData).toHaveBeenCalledWith('o');
        expect(results).toEqual([{ key: '2', value: 'Two' }]);
    });

    test('search covers fetchData error and local data case sensitivity', async () => {
        createInput({ className: 'search-error' });
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const failingAutocomplete = new AvalynxAutocomplete('.search-error', {
            fetchData: jest.fn().mockRejectedValue(new Error('network'))
        });

        const failed = await failingAutocomplete.search('x', failingAutocomplete.instances[0]);
        expect(failed).toEqual([]);
        expect(errorSpy).toHaveBeenCalled();

        createInput({ className: 'search-local' });
        const localAutocomplete = new AvalynxAutocomplete('.search-local', {
            data: [
                { key: 'a', value: 'Alpha' },
                { key: 'b', value: 'beta' }
            ],
            maxItems: 5
        });
        const insensitive = await localAutocomplete.search('AL', localAutocomplete.instances[0]);
        expect(insensitive).toEqual([{ key: 'a', value: 'Alpha' }]);

        localAutocomplete.options.caseSensitive = true;
        const sensitiveMiss = await localAutocomplete.search('AL', localAutocomplete.instances[0]);
        const sensitiveHit = await localAutocomplete.search('Al', localAutocomplete.instances[0]);
        expect(sensitiveMiss).toEqual([]);
        expect(sensitiveHit).toEqual([{ key: 'a', value: 'Alpha' }]);
    });

    test('search covers no data and non-array data branches', async () => {
        createInput({ className: 'search-no-data' });
        const noDataAutocomplete = new AvalynxAutocomplete('.search-no-data');

        const noDataResults = await noDataAutocomplete.search('anything', noDataAutocomplete.instances[0]);
        expect(noDataResults).toEqual([]);

        createInput({ className: 'search-non-array' });
        const nonArrayAutocomplete = new AvalynxAutocomplete('.search-non-array', {
            data: 'not-an-array'
        });

        const nonArrayResults = await nonArrayAutocomplete.search(
            'anything',
            nonArrayAutocomplete.instances[0]
        );
        expect(nonArrayResults).toEqual([]);
    });

    test('renderDropdown covers empty and populated results', () => {
        createInput({ className: 'render-dropdown' });
        const autocomplete = new AvalynxAutocomplete('.render-dropdown');
        const instance = autocomplete.instances[0];

        autocomplete.renderDropdown(instance, []);
        expect(instance.dropdown.classList.contains('d-none')).toBe(false);
        expect(instance.dropdown.children).toHaveLength(1);
        expect(instance.dropdown.children[0].textContent).toBe('No results found');

        autocomplete.renderDropdown(instance, [{ key: 'x', value: 'X-Ray' }]);
        expect(instance.dropdown.children).toHaveLength(1);
        expect(instance.dropdown.children[0].dataset.key).toBe('x');
        expect(instance.dropdown.children[0].dataset.value).toBe('X-Ray');
        expect(instance.dropdown.children[0].dataset.index).toBe('0');
    });

    test('clear element visibility functions work for button and icon modes', () => {
        createInput({ className: 'clear-button' });
        const buttonAutocomplete = new AvalynxAutocomplete('.clear-button', { clearStyle: 'button' });
        const buttonInstance = buttonAutocomplete.instances[0];

        buttonAutocomplete.showClearElement(buttonInstance);
        expect(buttonInstance.clearBtn.classList.contains('d-none')).toBe(false);
        buttonAutocomplete.hideClearElement(buttonInstance);
        expect(buttonInstance.clearBtn.classList.contains('d-none')).toBe(true);

        createInput({ className: 'clear-icon' });
        const iconAutocomplete = new AvalynxAutocomplete('.clear-icon', {
            maxSelections: 2,
            tagsPosition: 'inline',
            clearStyle: 'icon'
        });
        const iconInstance = iconAutocomplete.instances[0];

        iconAutocomplete.showClearElement(iconInstance);
        expect(iconInstance.clearIcon.classList.contains('d-none')).toBe(false);
        iconAutocomplete.hideClearElement(iconInstance);
        expect(iconInstance.clearIcon.classList.contains('d-none')).toBe(true);
    });

    test('clear element visibility functions tolerate missing clear elements', () => {
        createInput({ className: 'clear-manual' });
        const autocomplete = new AvalynxAutocomplete('.clear-manual');
        const instanceWithoutClear = {
            ...autocomplete.instances[0],
            clearBtn: null,
            clearIcon: null
        };

        expect(() => autocomplete.showClearElement(instanceWithoutClear)).not.toThrow();
        expect(() => autocomplete.hideClearElement(instanceWithoutClear)).not.toThrow();
    });

    test('selectItem handles single mode and initialized false branch', () => {
        createInput({ className: 'select-single' });
        const onChange = jest.fn();
        const autocomplete = new AvalynxAutocomplete('.select-single', { onChange });
        const instance = autocomplete.instances[0];

        autocomplete.selectItem(instance, 'k1', 'Value 1');

        expect(instance.input.value).toBe('Value 1');
        expect(instance.hiddenInput.value).toBe('k1');
        expect(instance.input.readOnly).toBe(true);
        expect(instance.input.classList.contains('bg-light')).toBe(true);
        expect(instance.isSelected).toBe(true);
        expect(onChange).toHaveBeenCalledWith('k1', { key: 'k1', value: 'Value 1' });

        autocomplete.initialized = false;
        autocomplete.selectItem(instance, 'k2', 'Value 2');
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('selectItem handles multi mode, max limit and early return', () => {
        createInput({ className: 'select-multi' });
        const onChange = jest.fn();
        const autocomplete = new AvalynxAutocomplete('.select-multi', {
            maxSelections: 2,
            onChange
        });
        const instance = autocomplete.instances[0];

        autocomplete.selectItem(instance, '1', 'One');
        autocomplete.selectItem(instance, '2', 'Two');
        autocomplete.selectItem(instance, '3', 'Three');

        expect(instance.selections).toEqual([
            { key: '1', value: 'One' },
            { key: '2', value: 'Two' }
        ]);
        expect(instance.hiddenInput.value).toBe(JSON.stringify(['1', '2']));
        expect(instance.input.disabled).toBe(true);
        expect(instance.input.placeholder).toBe('');
        expect(onChange).toHaveBeenCalledTimes(2);
    });

    test('renderTags covers null tags container and inline/non-inline rendering', () => {
        createInput({ className: 'tags-above' });
        const aboveAutocomplete = new AvalynxAutocomplete('.tags-above', {
            maxSelections: 2,
            tagsPosition: 'above'
        });
        const aboveInstance = aboveAutocomplete.instances[0];

        const noTagsInstance = { ...aboveInstance, tagsContainer: null };
        expect(() => aboveAutocomplete.renderTags(noTagsInstance)).not.toThrow();

        aboveInstance.selections = [{ key: '1', value: 'One' }];
        const removeSpy = jest.spyOn(aboveAutocomplete, 'removeSelection').mockImplementation(() => {});
        aboveAutocomplete.renderTags(aboveInstance);

        const aboveTag = aboveInstance.tagsContainer.querySelector('.badge');
        const removeButton = aboveInstance.tagsContainer.querySelector('[role="button"]');
        expect(aboveTag.classList.contains('gap-1')).toBe(true);
        expect(aboveTag.style.fontSize).toBe('0.875rem');
        expect(aboveTag.style.padding).toBe('0.5em 0.75em');

        removeButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        expect(removeButton.style.opacity).toBe('1');
        removeButton.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        expect(removeButton.style.opacity).toBe('0.7');
        removeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(removeSpy).toHaveBeenCalledWith(aboveInstance, 0);

        createInput({ className: 'tags-inline' });
        const inlineAutocomplete = new AvalynxAutocomplete('.tags-inline', {
            maxSelections: 2,
            tagsPosition: 'inline',
            clearStyle: 'icon'
        });
        const inlineInstance = inlineAutocomplete.instances[0];
        inlineInstance.selections = [{ key: '2', value: 'Two' }];
        inlineAutocomplete.renderTags(inlineInstance);

        const inlineTag = inlineInstance.tagsContainer.querySelector('.badge');
        expect(inlineTag.style.fontSize).toBe('0.8rem');
        expect(inlineTag.style.padding).toBe('0.35em 0.5em');
    });

    test('removeSelection updates placeholder, hidden value and callbacks', () => {
        createInput({ className: 'remove-selection' });
        const onChange = jest.fn();
        const autocomplete = new AvalynxAutocomplete('.remove-selection', {
            maxSelections: 3,
            onChange
        });
        const instance = autocomplete.instances[0];

        instance.selections = [
            { key: '1', value: 'One' },
            { key: '2', value: 'Two' }
        ];
        autocomplete.renderTags(instance);
        autocomplete.updateHiddenInput(instance);
        autocomplete.showClearElement(instance);

        const hideClearSpy = jest.spyOn(autocomplete, 'hideClearElement');

        autocomplete.removeSelection(instance, 0);
        expect(instance.selections).toEqual([{ key: '2', value: 'Two' }]);
        expect(hideClearSpy).not.toHaveBeenCalled();

        autocomplete.removeSelection(instance, 0);
        expect(instance.selections).toEqual([]);
        expect(instance.input.disabled).toBe(false);
        expect(instance.input.placeholder).toBe('Search...');
        expect(hideClearSpy).toHaveBeenCalledWith(instance);
        expect(onChange).toHaveBeenCalled();
    });

    test('removeSelection covers branch without onChange callback', () => {
        createInput({ className: 'remove-no-callback' });
        const autocomplete = new AvalynxAutocomplete('.remove-no-callback', {
            maxSelections: 2
        });
        const instance = autocomplete.instances[0];

        instance.selections = [{ key: '1', value: 'One' }];
        autocomplete.renderTags(instance);

        expect(() => autocomplete.removeSelection(instance, 0)).not.toThrow();
        expect(instance.selections).toEqual([]);
    });

    test('updateHiddenInput only updates for multi-select mode', () => {
        createInput({ className: 'update-hidden-multi' });
        const multiAutocomplete = new AvalynxAutocomplete('.update-hidden-multi', { maxSelections: 2 });
        const multiInstance = multiAutocomplete.instances[0];
        multiInstance.selections = [{ key: 'a', value: 'A' }];

        multiAutocomplete.updateHiddenInput(multiInstance);
        expect(multiInstance.hiddenInput.value).toBe(JSON.stringify(['a']));

        createInput({ className: 'update-hidden-single' });
        const singleAutocomplete = new AvalynxAutocomplete('.update-hidden-single');
        const singleInstance = singleAutocomplete.instances[0];
        singleInstance.hiddenInput.value = 'original';

        singleAutocomplete.updateHiddenInput(singleInstance);
        expect(singleInstance.hiddenInput.value).toBe('original');
    });

    test('clearSelection handles multi/single branches and optional tags container', () => {
        createInput({ className: 'clear-multi' });
        const onClear = jest.fn();
        const multiAutocomplete = new AvalynxAutocomplete('.clear-multi', {
            maxSelections: 2,
            onClear
        });
        const multiInstance = multiAutocomplete.instances[0];

        multiInstance.selections = [{ key: '1', value: 'One' }];
        multiInstance.input.value = 'temp';
        multiInstance.hiddenInput.value = '1';
        if (multiInstance.tagsContainer) multiInstance.tagsContainer.innerHTML = '<span>Tag</span>';
        const focusSpy = jest.spyOn(multiInstance.input, 'focus').mockImplementation(() => {});

        multiAutocomplete.clearSelection(multiInstance);
        expect(multiInstance.selections).toEqual([]);
        expect(multiInstance.input.value).toBe('');
        expect(multiInstance.hiddenInput.value).toBe('');
        expect(focusSpy).toHaveBeenCalled();
        expect(onClear).toHaveBeenCalled();

        const noTagsInstance = {
            ...multiInstance,
            selections: [{ key: 'x', value: 'X' }],
            tagsContainer: null,
            input: createInput({ className: null }),
            hiddenInput: document.createElement('input')
        };
        noTagsInstance.hiddenInput.value = 'x';
        noTagsInstance.input.value = 'x';
        jest.spyOn(noTagsInstance.input, 'focus').mockImplementation(() => {});

        expect(() => multiAutocomplete.clearSelection(noTagsInstance)).not.toThrow();

        createInput({ className: 'clear-single' });
        const singleAutocomplete = new AvalynxAutocomplete('.clear-single');
        const singleInstance = singleAutocomplete.instances[0];
        singleInstance.input.readOnly = true;
        singleInstance.input.classList.add('bg-light');
        singleInstance.isSelected = true;

        singleAutocomplete.clearSelection(singleInstance);
        expect(singleInstance.input.readOnly).toBe(false);
        expect(singleInstance.input.classList.contains('bg-light')).toBe(false);
        expect(singleInstance.isSelected).toBe(false);
    });

    test('handleKeydown covers navigation, enter, escape and backspace branches', () => {
        createInput({ className: 'keydown-case' });
        const autocomplete = new AvalynxAutocomplete('.keydown-case', {
            maxSelections: 2,
            tagsPosition: 'inline',
            clearStyle: 'icon'
        });
        const instance = autocomplete.instances[0];

        const item1 = document.createElement('li');
        item1.classList.add('avalynx-autocomplete-item');
        item1.dataset.index = '0';
        item1.dataset.key = 'k1';
        item1.dataset.value = 'One';

        const item2 = document.createElement('li');
        item2.classList.add('avalynx-autocomplete-item');
        item2.dataset.index = '1';
        item2.dataset.key = 'k2';
        item2.dataset.value = 'Two';

        instance.dropdown.innerHTML = '';
        instance.dropdown.appendChild(item1);
        instance.dropdown.appendChild(item2);

        const setActiveSpy = jest.spyOn(autocomplete, 'setActiveItem').mockImplementation(() => {});
        const selectSpy = jest.spyOn(autocomplete, 'selectItem').mockImplementation(() => {});
        const hideSpy = jest.spyOn(autocomplete, 'hideDropdown').mockImplementation(() => {});
        const removeSpy = jest.spyOn(autocomplete, 'removeSelection').mockImplementation(() => {});

        instance.dropdown.classList.add('d-none');
        const downHidden = createKeyboardEvent('ArrowDown');
        autocomplete.handleKeydown(downHidden, instance);
        expect(downHidden.preventDefault).toHaveBeenCalled();
        expect(setActiveSpy).not.toHaveBeenCalled();

        const upHidden = createKeyboardEvent('ArrowUp');
        autocomplete.handleKeydown(upHidden, instance);
        expect(upHidden.preventDefault).toHaveBeenCalled();
        expect(setActiveSpy).not.toHaveBeenCalled();

        instance.dropdown.classList.remove('d-none');
        const downShown = createKeyboardEvent('ArrowDown');
        autocomplete.handleKeydown(downShown, instance);
        expect(setActiveSpy).toHaveBeenCalledWith(expect.anything(), 0);

        item1.classList.add('active');
        const upShown = createKeyboardEvent('ArrowUp');
        autocomplete.handleKeydown(upShown, instance);
        expect(setActiveSpy).toHaveBeenCalledWith(expect.anything(), 0);

        const enterWithActive = createKeyboardEvent('Enter');
        autocomplete.handleKeydown(enterWithActive, instance);
        expect(selectSpy).toHaveBeenCalledWith(instance, 'k1', 'One');

        item1.classList.remove('active');
        const enterWithoutActive = createKeyboardEvent('Enter');
        autocomplete.handleKeydown(enterWithoutActive, instance);
        expect(selectSpy).toHaveBeenCalledTimes(1);

        const escapeEvent = createKeyboardEvent('Escape');
        autocomplete.handleKeydown(escapeEvent, instance);
        expect(hideSpy).toHaveBeenCalledWith(instance);

        instance.selections = [{ key: 'k1', value: 'One' }];
        instance.input.value = '';
        const backspaceDelete = createKeyboardEvent('Backspace');
        autocomplete.handleKeydown(backspaceDelete, instance);
        expect(removeSpy).toHaveBeenCalledWith(instance, 0);

        instance.input.value = 'x';
        const backspaceNoDelete = createKeyboardEvent('Backspace');
        autocomplete.handleKeydown(backspaceNoDelete, instance);
        expect(removeSpy).toHaveBeenCalledTimes(1);
    });

    test('setActiveItem toggles active class and scrollIntoView', () => {
        const itemA = document.createElement('li');
        itemA.scrollIntoView = jest.fn();
        const itemB = document.createElement('li');
        itemB.scrollIntoView = jest.fn();

        const autocomplete = Object.create(AvalynxAutocomplete.prototype);
        autocomplete.setActiveItem([itemA, itemB], 1);

        expect(itemA.classList.contains('active')).toBe(false);
        expect(itemB.classList.contains('active')).toBe(true);
        expect(itemA.scrollIntoView).not.toHaveBeenCalled();
        expect(itemB.scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
    });

    test('setInitialValue covers multi defaults, single defaults, dataset defaults and empty defaults', () => {
        createInput({ className: 'initial-values', dataset: { defaultKey: 'ds-key', defaultValue: 'ds-value' } });
        const autocomplete = new AvalynxAutocomplete('.initial-values', {
            maxSelections: 2,
            defaultSelections: [
                { key: '1', value: 'One' },
                { key: '2' },
                { value: 'NoKey' }
            ]
        });
        const instance = autocomplete.instances[0];
        const selectSpy = jest.spyOn(autocomplete, 'selectItem').mockImplementation(() => {});

        autocomplete.setInitialValue(instance);
        expect(selectSpy).toHaveBeenCalledWith(instance, '1', 'One');

        autocomplete.options.maxSelections = 1;
        autocomplete.options.defaultSelections = null;
        autocomplete.options.defaultKey = 'opt-key';
        autocomplete.options.defaultValue = 'opt-value';
        autocomplete.setInitialValue(instance);
        expect(selectSpy).toHaveBeenCalledWith(instance, 'opt-key', 'opt-value');

        autocomplete.options.defaultKey = null;
        autocomplete.options.defaultValue = null;
        autocomplete.setInitialValue(instance);
        expect(selectSpy).toHaveBeenCalledWith(instance, 'ds-key', 'ds-value');

        delete instance.input.dataset.defaultKey;
        delete instance.input.dataset.defaultValue;
        const callCountBefore = selectSpy.mock.calls.length;
        autocomplete.setInitialValue(instance);
        expect(selectSpy).toHaveBeenCalledTimes(callCountBefore);
    });

    test('disableInstance and enableInstance cover clear button/icon and inputContainer paths', () => {
        createInput({ className: 'disable-button' });
        const buttonAutocomplete = new AvalynxAutocomplete('.disable-button', { clearStyle: 'button' });
        const buttonInstance = buttonAutocomplete.instances[0];

        buttonAutocomplete.disableInstance(buttonInstance);
        expect(buttonInstance.input.disabled).toBe(true);
        expect(buttonInstance.clearBtn.disabled).toBe(true);

        buttonAutocomplete.enableInstance(buttonInstance);
        expect(buttonInstance.input.disabled).toBe(false);
        expect(buttonInstance.clearBtn.disabled).toBe(false);

        createInput({ className: 'disable-icon' });
        const iconAutocomplete = new AvalynxAutocomplete('.disable-icon', {
            maxSelections: 2,
            tagsPosition: 'inline',
            clearStyle: 'icon'
        });
        const iconInstance = iconAutocomplete.instances[0];

        iconAutocomplete.disableInstance(iconInstance);
        expect(iconInstance.clearIcon.style.pointerEvents).toBe('none');
        expect(iconInstance.inputContainer.style.backgroundColor).toBe('rgb(233, 236, 239)');
        expect(iconInstance.inputContainer.style.cursor).toBe('not-allowed');

        iconAutocomplete.enableInstance(iconInstance);
        expect(iconInstance.clearIcon.style.pointerEvents).toBe('');
        expect(iconInstance.inputContainer.style.backgroundColor).toBe('');
        expect(iconInstance.inputContainer.style.cursor).toBe('text');

        const manualInstance = {
            input: document.createElement('input'),
            clearBtn: null,
            clearIcon: null,
            inputContainer: null
        };

        expect(() => iconAutocomplete.disableInstance(manualInstance)).not.toThrow();
        expect(manualInstance.input.disabled).toBe(true);

        expect(() => iconAutocomplete.enableInstance(manualInstance)).not.toThrow();
        expect(manualInstance.input.disabled).toBe(false);
    });

    test('disable, enable and clear iterate over all instances', () => {
        createInput({ className: 'bulk' });
        createInput({ className: 'bulk' });
        const autocomplete = new AvalynxAutocomplete('.bulk');

        const disableSpy = jest.spyOn(autocomplete, 'disableInstance').mockImplementation(() => {});
        const enableSpy = jest.spyOn(autocomplete, 'enableInstance').mockImplementation(() => {});
        const clearSpy = jest.spyOn(autocomplete, 'clearSelection').mockImplementation(() => {});

        autocomplete.disable();
        autocomplete.enable();
        autocomplete.clear();

        expect(disableSpy).toHaveBeenCalledTimes(2);
        expect(enableSpy).toHaveBeenCalledTimes(2);
        expect(clearSpy).toHaveBeenCalledTimes(2);
    });

    test('value/key getters and value setter cover all branches', () => {
        createInput({ className: 'value-single' });
        const singleAutocomplete = new AvalynxAutocomplete('.value-single');
        const singleInstance = singleAutocomplete.instances[0];
        singleInstance.hiddenInput.value = 'single-key';
        singleInstance.input.value = 'Single Value';

        expect(singleAutocomplete.value).toEqual([
            { key: 'single-key', value: 'Single Value' }
        ]);
        expect(singleAutocomplete.key).toEqual(['single-key']);

        const singleSelectSpy = jest.spyOn(singleAutocomplete, 'selectItem').mockImplementation(() => {});
        const singleClearSpy = jest.spyOn(singleAutocomplete, 'clearSelection').mockImplementation(() => {});

        singleAutocomplete.value = null;
        expect(singleSelectSpy).not.toHaveBeenCalled();

        singleAutocomplete.value = [{ key: 'a', value: 'A' }];
        expect(singleSelectSpy).toHaveBeenCalledWith(singleInstance, 'a', 'A');

        singleAutocomplete.value = [null];
        expect(singleClearSpy).toHaveBeenCalledWith(singleInstance);

        createInput({ className: 'value-multi' });
        const multiAutocomplete = new AvalynxAutocomplete('.value-multi', { maxSelections: 3 });
        const multiInstance = multiAutocomplete.instances[0];
        multiInstance.selections = [{ key: 'm1', value: 'Multi 1' }];

        expect(multiAutocomplete.value).toEqual([[{ key: 'm1', value: 'Multi 1' }]]);
        expect(multiAutocomplete.key).toEqual([['m1']]);

        const multiSelectSpy = jest.spyOn(multiAutocomplete, 'selectItem').mockImplementation(() => {});
        multiAutocomplete.value = [[
            { key: 'x', value: 'X' },
            { key: null, value: 'Invalid' }
        ]];

        expect(multiSelectSpy).toHaveBeenCalledWith(multiInstance, 'x', 'X');
        expect(multiSelectSpy).toHaveBeenCalledTimes(1);
    });
});
