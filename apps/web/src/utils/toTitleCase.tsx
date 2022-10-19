const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
};
export default toTitleCase;
