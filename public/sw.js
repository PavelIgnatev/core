self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push получен');
  console.log(`[Service Worker] Push имеет данные: "${event.data.text()}"`);

  const payload = event.data.json();

  // Отправляем данные в основное приложение
  self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clients) {
    if (clients.length > 0) {
      clients.forEach(client => {
        client.postMessage({
          type: 'push',
          payload: payload
        });
      });
    }
  });

  const options = {
    body: payload.message || event.data.text(),
    icon: 'icon.png',
    badge: 'badge.png',
    data: payload
  };

  event.waitUntil(
    self.registration.showNotification('Telegram', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Уведомление было нажато');
  
  const notification = event.notification;
  const payload = notification.data;
  
  notification.close();

  // Отправляем информацию о клике в основное приложение
  self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clients) {
    if (clients.length > 0) {
      clients.forEach(client => {
        client.postMessage({
          type: 'notification_click',
          payload: payload
        });
      });
    }
  });

  event.waitUntil(
    clients.openWindow('http://localhost:3000')
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker] Подписка на push-уведомления изменилась');
  
  self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clients) {
    if (clients.length > 0) {
      clients.forEach(client => {
        client.postMessage({
          type: 'subscription_change'
        });
      });
    }
  });
}); 