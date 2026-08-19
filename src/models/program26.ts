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
    },
    {
        name: 'Плавание',
        url: 'https://do.sirius-ft.ru/program/1245-plavanie-obshcherazvivayushchaya-programma',
        lastStatus: 'unavailable'
    },
    {
        name: 'Мастерская Художника',
        url: 'https://do.sirius-ft.ru/program/758-klub-zhivopisi',
        lastStatus: 'unavailable'
    },
];