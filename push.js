var webPush = require('web-push');

const vapidKeys = {
    "publicKey" : "BEvMReakwD_EDnKTywbrMelT_zlDH8G63DZlqkF5IOmFZw_ELJzvbjsAoPaEMEeFgACbP0rLuxzzxVLgki4lC9Y",
    "privateKey": "mSItw2URBlq6vAVSO1l56wAcacBqIwJIcBhjgYHa8e8"
};

webPush.setVapidDetails(
    'mailto: aragungadn1414@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cjdq9bB7Jzw:APA91bEsR_x97iYfCNjhCsw9d1ssFsWtLWlwXWdXbdKy19Lt-nZle24pDSI9WYFmuvxg3bQTx3PbBhdQnARiSYH55zU0fpYtxjZ9wmpAYqySthxuuOr8oE4PVwgaPfzQZFauU2AoE_hD",
    "keys": {
        "p256dh": "BF1iJavUWfJPTO6aiTfdT4gfCLYwM22Ag28Hy3MR0IqSv3Gpo/iVOXlSIzZuNp5N/DtIBJEute3eEf+sfK285zg=",
        "auth": "m+wn6LwjQk8FGSGuVjBKbA=="
    }
}

var payload = 'Push notification received!';
var options = {
    gcmAPIKey: '947552353485',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
 ).catch(function (err){
     console.log(err);
 });