import inquirer from 'inquirer';


const chosenNumbers : number[]= [];
const randomNumbers : number[] = [];


const validateInput = (text: string): boolean => !isNaN(+text) 
    && +text > 0
    && +text <= 49
    && !chosenNumbers.includes(+text)


const startApp = async (): Promise<void> => {

    const randomNewNumber = (): number => Math.round(Math.random() * (49 - 1) + 1);

    const validateRandomNumber = (number: number): boolean => !randomNumbers.includes(number);

    do {
        const number: number = randomNewNumber();
        if (validateRandomNumber(number)) {
         randomNumbers.push(number);
        }   
    } while (randomNumbers.length < 6);

    do {
        const result = await inquirer.prompt<{number: string}>([{
            name: 'number',
            type: 'input',
            message: 'Podaj liczbę...',
            validate: (val: string): string | boolean=> {
                if (+val > 49 || +val < 1 || isNaN(+val)) {
                    return 'Liczba musi byc z zakresu 1-49'
                }
                if (chosenNumbers.includes(+val)) {
                    return 'Liczba juz została podana wczesniej. Podaj inna '
                }
                return validateInput(val)
            }
        }])
        if (validateInput(result.number)) {
            chosenNumbers.push(parseInt(result.number));
        }
    } while (chosenNumbers.length < 6);

        const strikeNumbers = chosenNumbers.filter(number=> randomNumbers.includes(number))
        const displayStrikeNumbers = ` Trafione liczby to: ${strikeNumbers.join()}`
        const response = `Wylosowane liczby to: ${randomNumbers.join()}. Liczba trafien: ${strikeNumbers.length} z 6.${strikeNumbers.length > 0 ? displayStrikeNumbers : ''}`
        console.log(response)

};

startApp()