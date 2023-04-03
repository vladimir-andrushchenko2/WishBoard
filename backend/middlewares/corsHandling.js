const { InvalidRequest } = require('../customErrors/InvalidRequest');

const allowedCors = [
  'https://bigchungus.nomoredomains.work',
  'https://mesto.vova.today',
  'http://localhost:3000',
  'http://api.vova.today',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (!origin) {
    return next(new InvalidRequest('no origin header'));
  }

  if (allowedCors.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
