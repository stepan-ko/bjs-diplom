
// Кнопка Выйти
const logoutButton = new LogoutButton;
logoutButton.action = () => ApiConnector.logout((response) => response.success ? location.reload() : null);

// Обновляет данные профиля при загрузке страницы
ApiConnector.current((response) => response.success ? ProfileWidget.showProfile(response.data) : null);

// Валюта
const userRatesBoard = new RatesBoard;
const updateRates = () => {
  ApiConnector.getStocks((response) => {
    userRatesBoard.clearTable();
    userRatesBoard.fillTable(response.data);
  });
}
updateRates();
setInterval(updateRates, 60000);

// Счёт
const userMouney = new MoneyManager;
const checkResponse = (response) => {
  response.success ? ProfileWidget.showProfile(response.data) : null;
  userMouney.setMessage(response.success, response.error ? response.error : 'Выполнено');  
}
// Пополнение
userMouney.addMoneyCallback = (data) => ApiConnector.addMoney(data, checkResponse);
// Конвертация
userMouney.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, checkResponse);
// Перевод
userMouney.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, checkResponse);

// Избранное
const userFavorites = new FavoritesWidget;
const updateFavorites = (response) => {
  if (response.success) {
    userFavorites.clearTable();
    userFavorites.fillTable(response.data);
    userMouney.updateUsersList(response.data);
  } 
}
const updateFavoritesAndMessage = (response) => {
  updateFavorites(response);
  userFavorites.setMessage(response.success, response.error ? response.error : 'Пользователь добавлен');
}
// Получить избранное при загрузки страницы
ApiConnector.getFavorites(updateFavorites);
// Добавить в избранное
userFavorites.addUserCallback = (data) =>  ApiConnector.addUserToFavorites(data, updateFavoritesAndMessage);
// Удалить из избранного
userFavorites.removeUserCallback = (data) =>  ApiConnector.removeUserFromFavorites(data, updateFavorites);
