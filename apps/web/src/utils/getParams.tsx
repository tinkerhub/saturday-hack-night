export function getParams(params: string) {
    const rawParams = params.replace('?', '').split('&');
    const extractedParams: { [key: string]: string } = {};
    rawParams.forEach((item) => {
        const items = item.split('=');
        extractedParams[items[0]] = items[1];
    });
    return extractedParams;
}
