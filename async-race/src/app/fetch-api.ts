import { ICar } from './components/car/car';

const GARAGE_URL = 'http://127.0.0.1:3000/garage';
const FIRST_PAGE = '1';
const CARS_PER_PAGE = '7';

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

export async function postCar(data: object) {
    try {
        const response = await fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = response.body;
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    return {};
}
