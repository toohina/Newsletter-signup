const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  console.log(fname, lname, email);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/4be83addb8";
  const options = {
    method: "POST",
    auth: "toohina:5eb742c275d55820e1aa75b002b632f2-us18"
  }
  const request = https.request(url, options, function(response) {
    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(res,res)
{
  res.redirect("/");
});

app.listen(process.env.PORT|| 3000, function() {
  console.log("The server is running at port 3000");
});

//API key
// 5eb742c275d55820e1aa75b002b632f2-us18

// list id
// 4be83addb8

//Path parameters
//https://usX.api.mailchimp.com/3.0/lists/{list_id}/members/{email_id}/notes/{id}

//data
//{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}
