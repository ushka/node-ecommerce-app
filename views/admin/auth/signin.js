const layout = require('../layout');

const getError = (errors, prop) => {
  // Note: try/catch is a shortcut, more robust way would be to do all the potential if statements to avoid undefined errors appearing
  try {
    return errors.mapped()[prop].msg;
  } catch(err) {
    return '';
  }
}

module.exports = ({ errors }) => {
  return layout({
    content: 
      `<div>
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, 'email')}
          <input name="password" placeholder="password" />
          ${getError(errors, 'password')}
          <button>Sign In</button>
        </form>
      </div>`
  });
}
