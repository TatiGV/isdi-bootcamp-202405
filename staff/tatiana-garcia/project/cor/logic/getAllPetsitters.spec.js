import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { errors } from '../../com/index.js'

const { NotFoundError } = errors

import getAllPetsitters from './getAllPetsitters.js'
import { User } from '../data/models.js'

describe('getAllPetsitters', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succes on existing petsitters', () => {
        return Promise.all([User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', linkPage: '', constactEmail: '', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] }), User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Alberto', city: 'Madrid', description: 'Tengo la mejor guarderia del mundoz', email: 'abt@garcia.com', linkPage: '', constactEmail: '', phoneNumber: '655454546', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas', 'hamsters', 'reptiles'] })])
            .then(petsitters => {
                return getAllPetsitters(petsitters[0].id)
                    .then(_petsitters => {
                        expect(_petsitters[0].id).to.equal(petsitters[1].id.toString())
                        expect(_petsitters[1].id).to.equal(petsitters[0].id.toString())
                    })
            })
    })

    it('fails on non existing petsitter', () => {
        return getAllPetsitters()
            .then(() => {
                throw new Error('Expected to throw NotFoundError but did not throw');
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('petsitters not found')
            })
    })


    afterEach(() => Promise.all([User.deleteMany()]))

    after(() => mongoose.disconnect())
})