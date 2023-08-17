// TODO: poner todas las frases en esta constante para que tengamos un solo lugar del conocimiento o verdad.
export enum MessageErrorsEnum {
    UserAlReadyExist = 'User already exists',
    EmailOrPasswordIncorrect = 'The provided credentials are invalid. Please check your email and password and try again.',
    NameIsRequired = 'The name is required.',
    PasswordIsRequired = 'The password is required',
    EmailIsRequired = 'The email is required',
    EmailNotFormatValid = 'The email not valid format',
    InvalidObjectId = 'Invalid ObjectId',
    PasswordMinimumLength = 'The password is minimum the 6 characters'
}