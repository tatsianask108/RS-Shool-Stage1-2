const GARAGE_URL = 'http://127.0.0.1:3000/garage';
const WINNERS_URL = 'http://127.0.0.1:3000/winners';
const FIRST_PAGE = '1';
const CARS_PER_PAGE = '7';

export interface ICar {
    name: string;
    color: string;
    id: number;
}

export interface ISearchParams extends Record<string, string> {
    _page: string;
    _limit: string;
}

export async function getCars(
    params: ISearchParams = {
        _page: FIRST_PAGE,
        _limit: CARS_PER_PAGE,
    }
): Promise<{ cars: ICar[]; count: number }> {
    try {
        const response = await fetch(`${GARAGE_URL}?${new URLSearchParams(params)}`);
        const count = parseInt(response.headers.get('X-Total-Count') || '', 10);
        const cars = (await response.json()) as ICar[];
        return { cars, count };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return { cars: [], count: 0 };
}

export async function getCar(url: string) {
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

export async function getWinner(id: string) {
    try {
        const resp = await fetch(`${WINNERS_URL}/${id}`);
        return resp;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}

export async function postCar(data: object) {
    try {
        const response = await fetch(GARAGE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.body;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}

export async function deleteCar(id: string) {
    try {
        await fetch(`${GARAGE_URL}/${id}`, {
            method: 'DELETE',
        });
        await fetch(`${WINNERS_URL}/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}

export async function updateCar(id: ICar['id'], data: Partial<ICar>) {
    try {
        const response = await fetch(`${GARAGE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}

export async function startEngine(id: number): Promise<{ velocity: number; distance: number }> {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, { method: 'PATCH' });
    const result = await response.json();
    return result;
}

export async function drive(id: number) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
            method: 'PATCH',
        });
        const result = await response.json();
        return result;
    } catch {
        return 'engine broke';
    }
}
