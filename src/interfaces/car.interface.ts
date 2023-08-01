export interface Car {
    name: string;
    color: string;
    systemCombustion: SystemCombustion,
    year: number,
    description: string,
    price: number
}

export enum SystemCombustion {
    gasoline = "Gasoline",
    electric = "Electric",
}