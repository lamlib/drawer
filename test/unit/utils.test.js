import { expect, test } from "vitest";
import { getElement, merge } from "../../src/utils";

test('merge flat object', () => {
    const target = {
        propsA: 'a1',
        propsB: 'b1',
        propsC: 'c1',
    };
    const resource = {
        propsB: 'b2',
        propsC: 'c2',
    };
    const result = {
        propsA: 'a1',
        propsB: 'b2',
        propsC: 'c2',
    }
    expect(merge(target, resource)).toEqual(result)
})

test('merge nested object', () => {
    const target = {
        propsA: 'a1',
        propsB: {
            propsBA: 'ba1',
            propsBB: 'bb1',
            propsBC: {
                propsBCA: 'bca1',
            },
        },
        propsC: 'c1',
    };
    const resource = {
        propsB: {
            propsBB: 'bb2',
            propsBC: {
                propsBCA: 'bca2',
            }
        },
        propsC: 'c2',
        propsD: 'c2',
    };
    const result = {
        propsA: 'a1',
        propsB: {
            propsBA: 'ba1',
            propsBB: 'bb2',
            propsBC: {
                propsBCA: 'bca2',
            },
        },
        propsC: 'c2',
        propsD: 'c2',
    }
    expect(merge(target, resource)).toEqual(result)
})

test('get element by id', () => {
    const div = document.createElement('div');
    div.id = 'drawer';
    div.textContent = 'test get element by id'
    document.body.appendChild(div);

    const element = getElement('drawer');

    expect(element.id).toBe('drawer');
})

test('get element by element', () => {
    const div = document.createElement('div');
    div.id = 'drawer';
    document.body.appendChild(div);

    const element = getElement(div);

    expect(element.id).toBe('drawer');
})