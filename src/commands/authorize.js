const { checkConfig, checkToken } = require('../fileHandling');
const printer = require('../printer')
const { NOTIFY } = printer;
const { getNewToken } = require('../google/index');

const authorize = async () => {
    printer.printWelcome();

    const config = checkConfig();
    if (config.hasConfig && !config.valid) return printer.error(NOTIFY.config_malformed);
    if (!config.hasConfig) return printer.error(NOTIFY.config_DNE);

    const token = checkToken(config.data.path);
    if (token.hasToken) printer.warn(NOTIFY.token_overwrite, { '%DATE%': token.data?.createdOn ? ` (Created On ${token.data.createdOn})` : '' });

    await getNewToken(config.data.path);
}

module.exports = {
    authorize
}