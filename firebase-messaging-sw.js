importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyAduXAqG6vRTI6STlFD3psMWkYY-DbXBr8",
  authDomain:"my-calendar-ccfd0.firebaseapp.com",
  projectId:"my-calendar-ccfd0",
  storageBucket:"my-calendar-ccfd0.firebasestorage.app",
  messagingSenderId:"124871692654",
  appId:"1:124871692654:web:4c8a914cbcaea6167a317f"
});

var messaging=firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  if(payload.notification)return;
  var d=payload.data||{};
  self.registration.showNotification(d.title||'Mono',{
    body:d.body||'',
    tag:d.tag||undefined,
    data:{url:d.url||'./'}
  });
});

self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){if('focus' in list[i])return list[i].focus();}
    return clients.openWindow(url);
  }));
});