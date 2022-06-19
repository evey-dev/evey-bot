const mongoose = require(`mongoose`);
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    id: {type: String},
    nick: {type: String, default: 'Not Set'},
    year: {type: String, default: 'Not Set'},
    hex: {type: String, default: '000000'},
    back: {type: String, default: 'default'},
    school: {type: String, default: 'Not Set'},
    bio: {type: String, default: 'Not Set'},
    borough: {type: String, default: 'Not Set'},
    money: {type: Number, default: 0},
    lastDaily: {type: Number, default: 0},
    boughtbacks: {type: Array, default: []},
    boughthex: {type: Boolean, default: false},
    vibe: {type: [Array], defauly: []}
});

const Profile = mongoose.model('profile', ProfileSchema)

module.exports = Profile;