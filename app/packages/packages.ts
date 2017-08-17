import { enteralInjectionWayId, parenteralInjectionWayId } from '../injectionWays/injectionWays';

export default [
    {
        id: 1,
        title: `ПЕТ/КТ головного мозку`,
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 2,
        title: `ПЕТ/КТ всього тіла`,
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            101, //контрастування кишківника per/os
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 3,
        title: 'ПЕТ/КТ всього тіла з контрастним підсиленням',
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            101, //контрастування кишківника per/os
            102, //інєкція в/в контрасту
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 4,
        title: `ПЕТ/КТ всього тіла з контрастним підсиленням*`,
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            102, //інєкція в/в контрасту
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 5,
        title: `Розширена ПЕТ/КТ всього тіла (меланома)`,
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            101, //контрастування кишківника per/os
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 6,
        title: 'Розширена ПЕТ/КТ всього тіла з контрастним підсиленням (меланома)',
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            101, //контрастування кишківника per/os
            102, //інєкція в/в контрасту
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 7,
        title: 'Розширена ПЕТ/КТ всього тіла з контрастним підсиленням*',
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            101, //контрастування кишківника per/os
            102, //інєкція в/в контрасту
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 9,
        title: `Кардіологічна ПЕТ/КТ з контрастним підсиленням`,
        procedures: [
            1, //Радіологія - CT
            2, //Радіологія - PT
            102, //інєкція в/в контрасту
            103, //інєкція 18ФДГ
            201 //Протокол дослідження
        ]
    }, {
        id: 11,
        title: `Компютерна томографія з контрастним підсиленням`,
        procedures: [
            1, //Радіологія - CT
            101, //контрастування кишківника per/os            
            102, //інєкція в/в контрасту
            201 //Протокол дослідження
        ]
    }, {
        id: 12,
        title: `Компютерна томографія`,
        procedures: [
            1, //Радіологія - CT
            101, //контрастування кишківника per/os            
            102, //інєкція в/в контрасту
            201 //Протокол дослідження
        ]
    }, {
        id: 13,
        title: `Консультативний висновок`,
        procedures: [
            201 //Протокол дослідження
        ]
    },
];