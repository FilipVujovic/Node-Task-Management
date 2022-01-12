const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Invalid email.')
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value<0) throw new Error('Age must be a positive number.')
        }
    },
    password: {
        type: String,
        required: 'Password is required.',
        minLength: [6, 'Password must be atleast 6 characters long.'],
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) throw new Error('Password can not be "password".')
        }

    }
})

module.exports = User