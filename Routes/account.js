const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/useraccount.json'

accountRoutes.delete('/account/delete/:id', (req, res) => {
  console.log("Hit")
  const userId = req.params['id'];

  fs.readFile(dataPath, 'utf8', (err, data) => {
    console.log(data)
    data = JSON.parse(data)
    if (data && data.users) {
      console.log(data);
      let users = data.users;
      console.log(users);
      let index = users.findIndex((user) => user.id == userId);
      console.log(index)
      if (index == -1) {
        res.json("No User Found")
      }
      else {
        users.splice(index, 1);
        console.log(users)
        let userOBJ={
          "users":users
        }
        fs.writeFile('./Details/useraccount.json', JSON.stringify(userOBJ), (err) => {
          if (err) {
            console.log('Error writing file', err)
          } else {
            console.log('Successfully wrote file')
            res.json("File Updated")
          }
        })
      }
    }
    else {
      res.json(err)
    }
  });
})
//This is NIRMAN DAS typing......
module.exports = accountRoutes