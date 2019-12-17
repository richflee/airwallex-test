import * as StringUtils from './string.utils';


describe('isValidEmailFormat', () => {
    test('returns false for abc', () => {
        expect(StringUtils.isValidEmailFormat('abc')).toBe(false);
    });

    test('returns false for undefined input', () => {
        expect(StringUtils.isValidEmailFormat(undefined)).toBe(false);
    });

    test('returns false for undefined ""', () => {
        expect(StringUtils.isValidEmailFormat("")).toBe(false);
    });

    test('returns false for rich@test', () => {
        expect(StringUtils.isValidEmailFormat('rich@test')).toBe(false);
    });

    test('returns true for john.c.citizen@test.com', () => {
        expect(StringUtils.isValidEmailFormat('john.c.citizen@test.com')).toBe(true);
    });
});

