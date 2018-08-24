const fs = require('fs');

const text = (fs.readFileSync('./excluded.txt', 'utf-8'));
const excluded = text.split('|');

const spamClassifier = {
    dataset: {
        totalSpam: 0,
        totalHam: 0,
        spammicity: {},
        hammicity: {},
    },
    load() {
        try {
            this.dataset = JSON.parse(fs.readFileSync('./training.json', 'utf-8'));
        } catch (e) {
            console.log('Unable to open "training.json". If the file does not exist it will be created after first training command');
        }
    },

    save() {
        fs.writeFileSync('./training.json', JSON.stringify(this.dataset));
    },

    isCommonWord(str) {
        function fun(element) {
            return element === str;
        }

        return excluded.some(fun);
    },

    createTable(str) {
        const
            table = {},
            rgx = /\b([a-z]{2,}-)*[a-z]{3,}/gi;
        let
            result,
            /*
                Mysle ze zmienne powinny miec zawsze przypisana jakas poczatkowa wartosc, nawet jesli to ma byc null.
                Do word przypisalem pusty string, do result mysle ze null bedzie pasowac tylko nie wiem czy wtedy petla while sie wykona.
            */
            word = "";
        while ((result = rgx.exec(str)) !== null) {
            word = result[0].toLowerCase();

            if (!this.isCommonWord(word)) {
                table[word] = true;
            }
        }

        return table;
    },

    learnSpam(str) {
        const table = this.createTable(str);
        const total = this.dataset.totalSpam;

        /*
            Eslint skonfigurowany mniej wiecej wedlug ustawien Bogusia tutaj krzyczy nastepujace bledy:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            - https://github.com/airbnb/javascript/issues/1817 - w dyskusji wyjasniaja dlaczego for...in jest zle ;)
            - https://eslint.org/docs/rules/guard-for-in
        */
        for (const word in this.dataset.spammicity) {
            const oldSpammicity = this.dataset.spammicity[word];

            if (table[word] === undefined) {
                this.dataset.spammicity[word] = (total * oldSpammicity) / (total + 1);
            } else {
                this.dataset.spammicity[word] = ((total * oldSpammicity) + 1) / (total + 1);
                delete table[word];
            }
        }
        /*
                    Eslint skonfigurowany mniej wiecej wedlug ustawien Bogusia tutaj krzyczy nastepujace bledy:
                    'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
                    - https://github.com/airbnb/javascript/issues/1817 - w dyskusji wyjasniaja dlaczego for...in jest zle ;)
                    - https://eslint.org/docs/rules/guard-for-in
                */
        for (const word in table) {
            this.dataset.spammicity[word] = 1 / (total + 1);
        }

        this.dataset.totalSpam = total + 1;
    },

    learnHam(str) {
        const table = this.createTable(str);
        const total = this.dataset.totalHam;

        /*
            Eslint skonfigurowany mniej wiecej wedlug ustawien Bogusia tutaj krzyczy nastepujace bledy:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            - https://github.com/airbnb/javascript/issues/1817 - w dyskusji wyjasniaja dlaczego for...in jest zle ;)
            - https://eslint.org/docs/rules/guard-for-in
        */
        for (const word in this.dataset.hammicity) {
            const oldHammicity = this.dataset.hammicity[word];

            if (table[word] === undefined) {
                this.dataset.hammicity[word] = (total * oldHammicity) / (total + 1);
            } else {
                this.dataset.hammicity[word] = ((total * oldHammicity) + 1) / (total + 1);
                delete table[word];
            }
        }
        /*
            Eslint skonfigurowany mniej wiecej wedlug ustawien Bogusia tutaj krzyczy nastepujace bledy:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            - https://github.com/airbnb/javascript/issues/1817 - w dyskusji wyjasniaja dlaczego for...in jest zle ;)
            - https://eslint.org/docs/rules/guard-for-in
        */
        for (const word in table) {
            this.dataset.hammicity[word] = 1 / (total + 1);
        }

        this.dataset.totalHam = total + 1;
    },

    predict(str) {
        const
            table = this.createTable(str),
            p = {};
        let word = "";
        /*
            Eslint skonfigurowany mniej wiecej wedlug ustawien Bogusia tutaj krzyczy nastepujace bledy:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            - https://github.com/airbnb/javascript/issues/1817 - w dyskusji wyjasniaja dlaczego for...in jest zle ;)
            - https://eslint.org/docs/rules/guard-for-in
        */
        for (word in table) {
            const spammicity = this.dataset.spammicity[word] || 0;
            const hammicity = this.dataset.hammicity[word] || 0;

            if (spammicity !== 0 && hammicity !== 0) {
                p[word] = spammicity / (spammicity + hammicity);
            }
            if (Number.isNaN(p[word])) {
                p[word] = 0.5;
            }
            //            console.log(word);
            //            console.log(p[word]);
        }

        let eta = 0.001;
        /*
            Eslint skonfigurowany mniej wiecej wedlug ustawien Bogusia tutaj krzyczy nastepujace bledy:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            - https://github.com/airbnb/javascript/issues/1817 - w dyskusji wyjasniaja dlaczego for...in jest zle ;)
            - https://eslint.org/docs/rules/guard-for-in
        */
        for (word in p) {
            eta += (Math.log(1 - p[word]) - Math.log(p[word]));
            //        console.log(eta);
        }

        const pFinal = 1 / (1 + Math.exp(eta));
        console.log(pFinal);
        return (pFinal > 0.55);
    },
};

module.exports = spamClassifier;
