var nodemailer    = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;

exports.sendEmail = async function(order, email){
    try{
        // console.log(order)
        var myEmail  = "pk2432871@gmail.com"
        var password = "pawankumar123"
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user:  myEmail,
              pass: password
            }
          });
          html = "<p> Your Order Has Been Placed At Bazar.pk..!!!</p>"
          var mailOptions = {
            from: 'pk2432871@gmail.com',
            to: email,
            subject: "Order Has Been Placed at Bazar.pk",
            html: html
          };
          transporter.sendMail(mailOptions, (err, info)=>{
            if (err) {
              throw err
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          return order

    }catch(err){
        throw err
    }
}
exports.accountEmail = async function(user, email){
  try{
      // console.log(user)
      var myEmail  = "pk2432871@gmail.com"
      var password = "pawankumar123"
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user:  myEmail,
            pass: password
          }
        });
        html = "<p> Your Account Has Been Created At Bazar.pk..!!!</p>"
        var mailOptions = {
          from: 'pk2432871@gmail.com',
          to: email,
          subject: "Account Has Been Created At Bazar.pk",
          html: html
        };
        
        transporter.sendMail(mailOptions, (err, info)=>{
          if (err) {
            throw err
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return user

  }catch(err){
      throw err
  }
}
exports.forgotPasswordEmail = async function(forgotLink, email){
  try{
      // console.log(user)
      var myEmail  = "pk2432871@gmail.com"
      var password = "pawankumar123"
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user:  myEmail,
            pass: password
          }
        });
        html = "<p> forgot Password Request at Bazar.pk..!!!</p>" + "<a " + "href=" + forgotLink + ">" + "Forgot Link" + "</a>"
        var mailOptions = {
          from: 'pk2432871@gmail.com',
          to: email,
          subject: "Forgot Password Request at Bazar.pk",
          html: html
        };
        
        transporter.sendMail(mailOptions, (err, info)=>{
          if (err) {
            throw err
          } else {
            // console.log('Email sent: ' + info.response);
          }
        });

  }catch(err){
      throw err
  }
}
