export default async function getCars(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log('json', json);
        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}
