const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    Username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlenght : 8,
        required : true,
    },

        passwordconfirm : {
        type : String,
        minlenght : 8,
        required : [true ,"please confirm your password "],
    }

})



//tocreate a collection we can use the mongoose.model 

//this is used to convert the password in into the encryption string
//hamara data save hone se pehle password encrypt hojaye


UserSchema.pre('save' , async function(next){
    
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password , 12)

    //removing the password confirm field from the document
    this.passwordConfirm = undefined ;
})

const user = mongoose.model('User', UserSchema)

module.exports = user