module.exports = ({ env }) => ({
  email: {
    provider: 'amazon-ses',
    providerOptions: {
      key: env('AWS_SES_KEY'),
      secret: env('AWS_SES_SECRET'),
      amazon: env('AWS_SES_URL'),
    },
    settings: {
      defaultFrom: env('AWS_SES_FROM_EMAIL'),
      defaultReplyTo: env('AWS_SES_REPLY_TO_EMAIL'),
    },
  },
});
