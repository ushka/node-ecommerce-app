module.exports = {
  getError(errors, prop) {
    // Note: try/catch is a shortcut, more robust way would be to do all the potential if statements to avoid undefined errors appearing
    try {
      return errors.mapped()[prop].msg;
    } catch(err) {
      return '';
    }
  }
}