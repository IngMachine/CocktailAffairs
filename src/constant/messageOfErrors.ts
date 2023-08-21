// TODO: poner todas las frases en esta constante para que tengamos un solo lugar del conocimiento o verdad.
export enum MessageErrorsEnum {
    UserAlReadyExist = 'User already exists',
    EmailOrPasswordIncorrect = 'The provided credentials are invalid. Please check your email and password and try again.',
    NameIsRequired = 'The name is required.',
    NameIsTooShort = 'The name is too short',
    DescriptionIsTooShort = 'The description is too short',
    PasswordIsRequired = 'The password is required',
    EmailIsRequired = 'The email is required',
    EmailNotFormatValid = 'The email not valid format',
    InvalidObjectId = 'Invalid ObjectId',
    PasswordMinimumLength = 'The password is minimum the 6 characters',
    IdIsRequired = 'The id is required',
    SessionNoValid = 'The session is not valid',
    UserNotPermitted = 'The user lacks the necessary permissions',
    UserNotFound = 'The user not found',
    TalkWithAdministrator = 'Talk with administration - Auth not permitted'
}