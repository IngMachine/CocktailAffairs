

export const enumValidator = (MyEnum: any, value: string) => {
    if (!Object.values(MyEnum).includes(value)) {
        const validValues = Object.values(MyEnum).join(', ');
        throw new Error(`The value must be one of the following: ${validValues}.`);
    }
    return true;
}