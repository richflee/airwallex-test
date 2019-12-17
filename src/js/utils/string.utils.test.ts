import * as StringUtils from './string.utils';


describe('isValidEmailFormat', () => {
    test('returns false for abc', () => {
        expect(StringUtils.isValidEmailFormat('abc')).toBe(false);
    });

    test('returns false for rich@test', () => {
        expect(StringUtils.isValidEmailFormat('rich@test')).toBe(false);
    });

    test('returns true for rich.f.lee@gmail.com', () => {
        expect(StringUtils.isValidEmailFormat('rich.f.lee@gmail.com')).toBe(true);
    });

    // test('returns true for john.c.citizen@test.com', () => {
    //     expect(StringUtils.isValidEmailFormat('john.c.citizen@test.com')).toBe(true);
    // });
});

