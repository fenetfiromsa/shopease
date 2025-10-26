// backend/test-bcrypt.js
const bcrypt = require('bcryptjs');

const plain = 'NewSecureP@ss1';
const hash  = '$2b$10$O5cqTJkYLefVFrNWqnqt/emPjG2DfwOqiSDERWwaHIG.iJsBx9Qmq';

bcrypt.compare(plain, hash)
  .then(result => {
    console.log('bcrypt.compare result:', result); // true or false
    process.exit(0);
  })
  .catch(err => {
    console.error('bcrypt error:', err);
    process.exit(1);
  });
