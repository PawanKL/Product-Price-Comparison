const mongoose = require('mongoose')
db = {
  connect: function (key) {
    mongoose.connect(key, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Mongodb Connected'))
      .catch((err) => console.log(err))
    return
  }
}
module.exports = db