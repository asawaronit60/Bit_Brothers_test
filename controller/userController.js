const User = require('../model/User')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res) => {

  try {
    const users = await User.find();
    res.status(200).json({
      status: 'Success',
      data: users
    })

  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    })
  }
}

exports.getUser = async (req, res) => {

  try {

    let user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: user
    })


  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    })
  }
}

exports.createUser = async (req, res) => {

  try {

    let { name, username, password } = req.body

    password = bcrypt.hashSync(password, 10);
     
    let newUser = new User({
      name,
      username,
      password
    })

    await newUser.save();

    res.status(200).json({
      status:'Success',
      data:newUser
    })

  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    })
  }

}


exports.updateUser = async (req, res) => {

  try {

    if (req.body.password)
      res.status(404).json({
        status: 'Fail',
        message: 'Cannot update password!'
      })

    else {

      let data = await User.findByIdAndUpdate( req.params.id,req.body, { new: true })
    
      res.status(404).json({
        status: 'Success',
        data
      })
    }


  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    })
  }

}

exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      stauts: 'Success',
      message: 'User deleted Successfully'
    })

  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    })
  }
}