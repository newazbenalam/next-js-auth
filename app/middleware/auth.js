import basicAuth from 'basic-auth';

const users = [
  { username: 'admin', password: 'password' },
];

export function loginUser(email, password) {
  const user = users.find(u => u.username === email && u.password === password);
  if (user) {
    // Authentication successful
    return user;
  } else {
    // Authentication failed
    throw new Error('Invalid credentials');
  }
}

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
  const user = users.find(u => u.username === credentials.name && u.password === credentials.pass);
  return !!user;
}
