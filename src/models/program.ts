export interface Program {
    name: string;
    url: string;
    lastStatus: 'unavailable' | 'available';
}

export const programs: Program[] = [
    {
        name: 'Первооткрыватели',
        url: 'https://do.sirius.ru/program/1183-letnyaya-masterskaya-talantov-pervootkryvateli',
        lastStatus: 'unavailable'
    },
    {
        name: 'Исследователи',
        url: 'https://do.sirius.ru/program/1188-letnyaya-masterskaya-talantov-issledovateli',
        lastStatus: 'unavailable'
    },
    {
        name: 'Изобретатели',
        url: 'https://do.sirius.ru/program/1190-letnyaya-masterskaya-talantov-izobretateli',
        lastStatus: 'unavailable'
    },
    {
        name: 'Творцы',
        url: 'https://do.sirius.ru/program/1191-letnyaya-masterskaya-talantov-tvortsy',
        lastStatus: 'unavailable'
    },
    {
        name: 'Путешественники',
        url: 'https://do.sirius.ru/program/1192-letnyaya-masterskaya-talantov-puteshestvenniki',
        lastStatus: 'unavailable'
    },
    {
        name: 'Вдохновители',
        url: 'https://do.sirius.ru/program/1193-letnyaya-masterskaya-talantov-vdokhnoviteli',
        lastStatus: 'unavailable'
    },
    {
        name: 'Волшебники',
        url: 'https://do.sirius.ru/program/1194-letnyaya-masterskaya-talantov-volshebniki',
        lastStatus: 'unavailable'
    },
    {
        name: 'Хранители',
        url: 'https://do.sirius.ru/program/1195-letnyaya-masterskaya-talantov-khraniteli',
        lastStatus: 'unavailable'
    },
    {
        name: 'Тестовая программа',
        url: 'https://todo-jq.renderlife.ru/sirius-navigator.html',
        lastStatus: 'unavailable'
    }
];