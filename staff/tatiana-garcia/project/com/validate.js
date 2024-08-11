import errors from './errors.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name.trim())) throw new ValidationError(`invalid ${explain}`)
}

function validateSurname(surname) {
    validateString(surname, 'surname')
    if (!NAME_REGEX.test(surname)) throw new ValidationError('invalid surname')
}
function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email.trim())) throw new ValidationError('invalid email')
}

function validateUsername(username, explain = 'username') {
    validateString(username, 'username')
    if (!USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain}`)
    if (!username.trim().length) throw new ValidationError(`${explain} has empty spaces`)
}

function validatePassword(password, explain = 'password') {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError(`${explain} length is lower than 8 characters`)
    if (password.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

function validateRole(role, explain = 'role') {
    validateString(role, 'role')
    if (role !== 'user' && role !== 'petsitter') throw new ValidationError(`invalid ${explain}`)
}

function validateCity(city) {
    validateString(city, 'city')
    if (city === '') throw new ValidationError('the field can not be empty')
}

function validateDescription(description, explain = 'description') {
    validateString(description, 'description')
    if (description < 1 && description > 200) throw new ValidationError(`the ${explain} must have more than 5 characters and less than 50 characters`)
    if (typeof description !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateUrl(url, explain = 'url') {
    // console.log(url)
    // validateString(url, explain)
    if (!url.startsWith('https')) throw new ValidationError(`invalid ${explain}`)
}

function validatePets(pets) {
    if (pets < 1) throw new ValidationError('At least one pet must be selected')
}


const validate = {
    string: validateString,
    name: validateName,
    surname: validateSurname,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    role: validateRole,
    city: validateCity,
    description: validateDescription,
    url: validateUrl,
    pets: validatePets

}

export default validate