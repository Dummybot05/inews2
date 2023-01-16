const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('91884103ca9845ee8122a155339b9f9c');
const app = express()

mongoose.connect(
   "mongodb+srv://INews0:INews0@INews0.6wxzzss.mongodb.net/?retryWrites=true&w=majority",
   () => { console.log("Mongodb Connected Success") }
)
const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
})
const User = mongoose.model("User", userSchema)
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
   res.render("home")
})

let emailEr = false
let passwordEr = false
app.get("/signup", (req, res) => {
   let sData = {
        emailError: emailEr,
	passwordError: passwordEr
   }
   res.render("signup", sData)
   emailEr = false
   passwordEr = false
})

let emailEr2 = false
let passwordEr2 = false
var userNotFound = false
app.get("/login", (req, res) => {
   let lData = {
	emailError: emailEr2,
        passwordError: passwordEr2,
        fakeUser: userNotFound
   }
   res.render("login", lData)
   emailEr2 = false
   passwordEr2 = false
   userNotFound = false
})

//test ***

var mainPageName = ""
var countryD = "in"
var a1 = undefined
var tempUse = 0
if(tempUse == 0) {
newsapi.v2.topHeadlines({ country: countryD }).then((res) => {
       a1 = res.articles;
});
tempUse += 1;
}
app.get("/mainPage", (req, res) => {
   newsapi.v2.topHeadlines({ country: countryD }).then((res) => {
       a1 = res.articles;
   });
   res.render("mainPage", {
	nameHere: mainPageName,
        countryNameIs: countryD,
        respond1: a1
   })
})
//test ***
//tempUse
app.get("/brazil", (req, res) => {
   newsapi.v2.topHeadlines({ country: "br" }).then((res) => {
     a1 = res.articles;
   })
   res.render("mainPage", {
	nameHere: mainPageName,
	countryNameIs: "br",
        respond1: a1
   })
})

app.get("/china", (req, res) => {
   newsapi.v2.topHeadlines({ country: "cn" }).then((res) => {
     a1 = res.articles;
   })
   res.render("mainPage", {
        nameHere: mainPageName,
        countryNameIs: "cn",
        respond1: a1
   })
})

app.get("/japan", (req, res) => {
   newsapi.v2.topHeadlines({ country: "jp" }).then((res) => {
     a1 = res.articles;
   })
   res.render("mainPage", {
        nameHere: mainPageName,
        countryNameIs: "jp",
        respond1: a1
   })
})

app.get("/america", (req, res) => {
   newsapi.v2.topHeadlines({ country: "us" }).then((res) => {
     a1 = res.articles;
   })
   res.render("mainPage", {
        nameHere: mainPageName,
        countryNameIs: "us",
        respond1: a1
   })
})

app.get("/colombia", (req, res) => {
   newsapi.v2.topHeadlines({ country: "co" }).then((res) => {
     a1 = res.articles;
   })
   res.render("mainPage", {
        nameHere: mainPageName,
        countryNameIs: "co",
        respond1: a1
   })
})

app.get("/egypt", (req, res) => {
   newsapi.v2.topHeadlines({ country: "eg" }).then((res) => {
     a1 = res.articles;
  })
   res.render("mainPage", {
        nameHere: mainPageName,
        countryNameIs: "eg",
        respond1: a1
   })
})
//tempUse
app.post("/signup", (req, res) => {
     let signData = [ req.body.name, req.body.email.toLowerCase(), req.body.password ]
     if(signData[1].length < 12) {
       emailEr = true
       res.redirect("/signup")
     } else if(signData[2].length < 8){
       passwordEr = true
       res.redirect("/signup")
     } else {
     const user1 = User.create({
          name: signData[0],
	  email: signData[1],
          password: signData[2]
     })
     res.redirect("/login")
     }
})


app.post("/login", (req, res) => {
     let logData = [ req.body.email, req.body.password ]
     if(logData[0].length < 12) {
       emailEr2 = true
       res.redirect("/login")
     } else if(logData[1].length < 8){
       passwordEr2 = true
       res.redirect("/login")
     } else {
       User.findOne({ email: logData[0], password: logData[1]}, (err, data) => {
            if(data == null || data == []) {
              userNotFound = true
              res.redirect("/login")
	    } else {
	       let emailData = logData[0] == data.email
               let passData = logData[1] == data.password
               if(emailData && passData) {
                  mainPageName = data.name
                  res.redirect("/mainPage")
               } else {
	          console.log("wrongData")
	       }
	    }
       })

     }
})

app.post("/mainpage", (req, res) => {
        countryD = req.body.gettingCo
        res.redirect("/mainPage")
})

let port = process.env.PORT;
if(port == null || port == "") {
   port = 3000;
}
app.listen(port, () => {
  console.log("App is listen Success")
})

