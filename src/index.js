/**
 * Created by naname on 2017/04/21.
 */
'use strict';

console.log(process.env.TS_SA_PASSWORD);
// return;

const TeamspeakObserver = require('teamspeak-observer');
const LineAPI = require('line-api');

const notify = new LineAPI.Notify({
    token: 'eeYj7TJebqyX08jbbW3PMIvG56bC0L7JBsEZ69XX9y9'
});

const observer = new TeamspeakObserver('127.0.0.1', 10011, 'serveradmin', '');

observer.tsquery.sock.setTimeout(1000, function(){
    console.log('hello');
    process.exit();
});

observer.on(TeamspeakObserver.ONTIMEOUT, function() {
    console.log('Connection failed. Timed out.');
});
observer.on(TeamspeakObserver.ONCONNECTED, () => {
  console.log('connected');
  observer.login();
});
observer.on(TeamspeakObserver.ONCLIENTENTERVIEW, (data) => {
    notify.send({
        message: data.client_nickname + 'さんがログインしました。'
    });
});

// TODO パスワード、トークン類の外だし
// TODO 無通信によるタイムアウトの検証。必要があればKeepAliveの実装。