import basicAuth from 'basic-auth';

const users = [
  { username: 'admin', password: 'password' },
];

export function requireAuth(req, res, next) {
  const credentials = basicAuth(req);

  if (!credentials || !checkCredentials(credentials)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Authentication required"');
    res.end('Access denied');
    return;
  }
  
  next();
}

function checkCredentials(credentials) {
  return users.some(user => user.username === credentials.name && user.password === credentials.pass);
}
