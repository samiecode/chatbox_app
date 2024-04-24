importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA3fTj0jdCT4ezEDGW61D0YlkihMFksQc0",
    projectId: "easiffy-cloud",
    messagingSenderId: "337791915966",
    appId: "1:337791915966:web:afe2b4d03a680c2f854bef",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function ({ data: { title, body, icon } }) {
    return self.registration.showNotification(title, { body, icon });
});
