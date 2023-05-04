// Объект Формы  
const formLogin = new UserForm;

// Авторизации
formLogin.loginFormCallback = (data) => ApiConnector.login(data , checkLogin);
const checkLogin = (response) => response.success ? location.reload() : formLogin.setLoginErrorMessage(response.error);


// Регистрация
formLogin.registerFormCallback = (data) => ApiConnector.register(data , checkRegister);
const checkRegister = (response) => response.success ? location.reload() : formLogin.setRegisterErrorMessage(response.error);



