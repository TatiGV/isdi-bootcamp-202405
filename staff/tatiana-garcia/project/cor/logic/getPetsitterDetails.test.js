import 'dotenv/config'

import getPetsitterDetails from './getPetsitterDetails.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getPetsitterDetails('66d988b9e935d3037007f4be'))
    .then(petsitters => console.log(petsitters))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())