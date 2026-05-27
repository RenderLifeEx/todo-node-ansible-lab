export interface Program {
    name: string;
    url: string;
    lastStatus: 'unavailable' | 'available';
}

export const programs: Program[] = [
    {
        name: 'Тестовая программа',
        url: 'https://todo-jq.renderlife.ru/sirius-navigator.html',
        lastStatus: 'unavailable'
    }
];