export function isValidEmailFormat(input: string): boolean {
    const matches = input && input.match(/^\S+@([a-zA-Z0-9]+)\.{1}([a-zA-Z0-9]{2,4})+$/);
    return !!matches && matches.length > 0;
}