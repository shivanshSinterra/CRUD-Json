const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/useraccount.json'

// util functions 

const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = (id) => {
  var jsonData = fs.readFileSync(dataPath, 'utf-8');
  jsonData = JSON.parse(jsonData);
  return jsonData.users.find((user) => user.id == id)
}


// reading the data
accountRoutes.get('/account', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});


accountRoutes.post('/account/addaccount', (req, res) => {

  var existAccounts = getAccountData()
  // const newAccountId = Math.floor(100000 + Math.random() * 900000)

  // existAccounts[newAccountId] = req.body

  // console.log(existAccounts);

  // saveAccountData(existAccounts);
  res.send({ success: true, msg: 'account data added successfully' })
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

// Update - using Put method
accountRoutes.get('/account/:id', (req, res) => {
  const accountId = req.params['id'];
  var existAccounts = getAccountData(accountId);
  res.send(existAccounts)
});

//delete - using delete method
//accountRoutes.delete('/account/delete/:id', (req, res) => {
//   fs.readFile(dataPath, 'utf8', (err, data) => {
//    var existAccounts = getAccountData()

//    var userId = req.params['id'];
//    var i = users.length;
//    while (i--) {
//      if(users.indexOf([i].id)===-1){
//        users.splice(i,1);
//      }
//    }
//    delete existAccounts[users];  
//    saveAccountData(existAccounts);
//    res.send(`accounts with id ${users} has been deleted`)
//  }, true);
//})

accountRoutes.delete('/account/delete/:id', (req, res) => {
  const userId = req.params['id'];

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (data && data.users) {
      console.log(data);
      let users = data.users;
      console.log(users);
      let index = users.findIndex((user) => user.id == userId);
      console.log(index)
      if (index == -1) {
        res.send("No User Found")
      }
      else {
        let newUsers = users.splice(index, 1);
        console.log(newUsers)
      }
    }

    else {
      res.send(err)
    }
  }, true);
})
//This is NIRMAN DAS typing......
module.exports = accountRoutes