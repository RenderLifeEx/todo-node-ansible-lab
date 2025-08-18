export interface Program {
    name: string;
    url: string;
    lastStatus: 'unavailable' | 'available';
}

export const programs: Program[] = [
    {
        name: 'Шахматы',
        url: 'https://do.sirius-ft.ru/program/1244-shakhmaty-obshcherazvivayushchaya-programma',
        lastStatus: 'unavailable'
    },
    {
        name: 'Тестовая программа',
        url: 'https://todo-jq.renderlife.ru/sirius-navigator.html',
        lastStatus: 'unavailable'
    }
];