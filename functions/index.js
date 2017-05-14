'use strict';

var firebase = require('firebase-admin');
var functions = require('firebase-functions');

var config = functions.config();
firebase.initializeApp(config.firebase);
/*firebase.initializeApp({
#databaseURL:'https://offerpic-543b5.firebaseio.com/'
});*/


exports.datainsert = functions.https.onRequest((req,res) => {
                var db = firebase.database();
                var ref = db.ref("/data");

                var obj = {"one":1,"two":2}

                var limit = 10000;
                for(var i=0;i<limit;i++){
                        ref.push().set(obj);
                }
                res.status(200).send(limit+" inserted successfully");
});

exports.dataget = functions.https.onRequest((req,res) => {
                var db = firebase.database();

                var before = process.hrtime();
                var ref = db.ref("/data/-Kk1DBR2PFLSu4nLTSDy");
                ref.once('value', function(snapshot) {
                       console.log(snapshot.val());                              
                });
                var after = process.hrtime();
                console.log((after[1]-before[1])/1000000000);
                //console.log(dataValue);
                res.status(200).send('read done');
});
