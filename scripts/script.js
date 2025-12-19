const orderForm = document.querySelector('.orderForm');

const addressInput = document.querySelector('.addressInput');
const priceInput = document.querySelector('.priceInput');
const recipientInput = document.querySelector('.recipientInput');

const notificationsContainer = document.createElement('div');
notificationsContainer.classList.add('notificationsContainer');
document.body.append(notificationsContainer);

let buttonsRendered = false;

const orderList = [
  {
    id: Math.floor(Math.random() * 1_000_000),
    title: 'Order created',
    content: 'Stay tuned for more information',
    icon: '/icons/created.svg',
    status: 'created',
  },
  {
    id: Math.floor(Math.random() * 1_000_000),
    title: 'Order paid',
    content: 'Please wait for shipment',
    icon: '/icons/paid.svg',
    status: 'paid',
    buttons: {
      name: 'Order paid',
      type: 'paidBtn',
    },
  },
  {
    id: Math.floor(Math.random() * 1_000_000),
    title: 'Order shipped',
    content: 'Expect a courier',
    icon: '/icons/sent.svg',
    status: 'sent',
    buttons: {
      name: 'Order shipped',
      type: 'sentBtn',
    },
  },
  {
    id: Math.floor(Math.random() * 1_000_000),
    title: 'Order received',
    content: 'We look forward to seeing you again!',
    icon: '/icons/received.svg',
    status: 'received',
    buttons: {
      name: 'Order received',
      type: 'receivedBtn',
    },
  },
];


class Notification {
  constructor(title, content, icon, status) {
    this.title = title;
    this.content = content;
    this.icon = icon;
    this.status = status;
  }

  createNotification() {
    // 1. Корневой элемент
    const notification = document.createElement('div');
    notification.classList.add('notification');

    // 2. Кнопка закрытия
    const closeIcon = document.createElement('div');
    closeIcon.classList.add('notificationIconClose');

    const closeIconImg = document.createElement('img');
    closeIconImg.src = '/icons/close.svg';
    closeIconImg.alt = 'Close';

    closeIcon.append(closeIconImg);

    // 3. Иконка статуса
    const notificationIconContainer = document.createElement('div');
    notificationIconContainer.classList.add('notificationIconContainer');

    const notificationIcon = document.createElement('div');
    notificationIcon.classList.add('notificationIcon');

    const notificationIconImg = document.createElement('img');
    notificationIconImg.src = this.icon;
    notificationIconImg.alt = this.status;

    notificationIcon.append(notificationIconImg);
    notificationIconContainer.append(notificationIcon);

    // 4. Контент
    const notificationContent = document.createElement('div');
    notificationContent.classList.add('notificationContent');

    const notificationTitle = document.createElement('h5');
    notificationTitle.classList.add('notificationTitle');
    notificationTitle.textContent = this.title;

    const notificationText = document.createElement('p');
    notificationText.classList.add('notificationDescription');
    notificationText.textContent = this.content;

    notificationContent.append(notificationTitle, notificationText);

    // 5. Сборка
    notification.append(closeIcon, notificationIconContainer, notificationContent);

    // 6. Сохранение в экземпляр класса
    this.element = notification;

    notification.classList.add(`notification--${this.status}`);

    closeIcon.addEventListener('click', () => {
      this.element.remove();
    })
  }

  renderNotification() {
    if (!this.element) {
      return;
    }
    notificationsContainer.append(this.element);
  }
}

const generateButtons = (arr) => {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');

  arr.forEach((item) => {
    if (!item.buttons) return;

    const button = document.createElement('button');
    button.textContent = item.buttons.name;

    button.addEventListener('click', () => {
      const notification = new Notification(item.title, item.content, item.icon, item.status);

      requestAnimationFrame(() => {
        notification.createNotification();
        notification.renderNotification();
      })
    });

    buttonsContainer.append(button);
  });

  document.body.append(buttonsContainer);
};



orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const addressInputValue = addressInput.value.trim();
  const priceInputValue = priceInput.value.trim();
  const recipientInputValue = recipientInput.value.trim();

  if (addressInputValue && priceInputValue && recipientInputValue) {
    const createOrder = orderList.find((item) => item.status === 'created');

    if(!createOrder) return;

    const createNewNotification = new Notification(
      createOrder.title,
      createOrder.content,
      createOrder.icon,
      createOrder.status,
    );

    setTimeout(() => {
      requestAnimationFrame(() => {
        createNewNotification.createNotification();
        createNewNotification.renderNotification();
      })
    }, 500);

    if (!buttonsRendered) {
      generateButtons(orderList);
      buttonsRendered = true;
    }
  } 
})

