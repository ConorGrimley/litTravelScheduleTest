var ActiveDirectory = require('activedirectory')
var series = require('run-series')

var config = require('./config')

var N_NUMBER_CHECK = /^N\d{7}$/i

/**
 * Create an ActiveDirectory instance with a base distinguished name for users
 * in Europe; additional organisational units can be passed to contribute to the
 * base.
 */
function getActiveDirectory(username, password, ous) {
  ous = ous ? `${ous},` : ''
  return new ActiveDirectory({
    url: config.activeDirectoryURL,
    baseDN: `${ous}${config.baseDN}`,
    username: `lm\\${username}`,
    password: password
  })
}

/**
 * Get the id and name of all LIT users from ActiveDirectory, sorted by name.
 */
function getActiveDirectoryUsers(username, password, cb) {
  series(config.offices.map(office => nextOffice =>
    getActiveDirectory(username, password, `OU=Users,OU=${office}`).findUsers(nextOffice)
  ), (err, usersByOffice) => {
    if (err) return cb(err)
    var users = [].concat(...usersByOffice)
      .filter(user => N_NUMBER_CHECK.test(user.sAMAccountName))
      .map(user => ({
        id: user.sAMAccountName.toUpperCase(),
        name: `${user.givenName} ${user.sn}`
      }))
      .sort((a, b) => a.name > b.name ? 1 : -1)
    cb(null, users)
  })
}

module.exports = {getActiveDirectory, getActiveDirectoryUsers}
