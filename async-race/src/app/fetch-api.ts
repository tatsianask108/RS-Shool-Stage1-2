export async function getCars(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}

export async function getWinners(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}

const newCar = {
    name: 'Test',
    color: '#FFF',
};

export async function fetchCar() {
    try {
        const response = await fetch('http://127.0.0.1:3000/garage?_pages=1&_limit=7', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCar),
        });
        const result = response.body;
        console.log(result);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}
