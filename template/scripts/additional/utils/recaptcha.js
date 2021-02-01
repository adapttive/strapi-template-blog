const axios = require('axios');
const qs = require('qs');
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  async validate(ctx, params) {
    if (!process.env.RECAPTCHA_ENABLE) {
        return true;
    }
    if (!params.recaptcha) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.recaptcha.provide',
          message: 'Invalid form key.',
        })
      );
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      let verification = await axios.post(
        process.env.RECAPTCHA_VERIFY_URL,
        qs.stringify({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: params.recaptcha
        }),
        config
      );

      if (!verification.data || !verification.data.success || verification.data.success !== true) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.recaptcha.provide',
            message: 'Invalid form key.',
          })
        );
      }
    }

    return true;
  }
}
