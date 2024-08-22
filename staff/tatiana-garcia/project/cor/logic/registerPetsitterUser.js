import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { ValidationError, DuplicityError, SystemError } = errors

export default (image, name, city, description, email, phoneNumber, password, passwordRepeat, pets) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.city(city, 'city')
    validate.description(description, 'description')
    validate.email(email, 'email')
    validate.phone(phoneNumber, 'phone')
    validate.password(password)
    validate.pets(pets, 'pets')

    if (password !== passwordRepeat) throw new ValidationError('passwords do not match')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('email already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                image,
                name,
                city,
                description,
                email,
                phoneNumber,
                password: hash,
                role: 'petsitter',
                pets
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}