'use strict';
const _ = require('lodash');
const { sanitizeEntity, parseMultipartData } = require('strapi-utils');
const recaptcha = require('../../../utils/recaptcha');
const env = require("strapi-utils/lib/env-helper");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  async create(ctx) {
    const params = {
      ..._.omit(ctx.request.body, ['_id', '__v', 'updatedAt', 'id', 'createdAt']),
    };
    let valid = await recaptcha.validate(ctx, params);
    if (valid === true) {
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services['contact-form'].create(data, { files });
      } else {
        entity = await strapi.services['contact-form'].create(ctx.request.body);
      }

      if (env("AWS_SES_ENABLE", false)) {
        try {
          let email = await strapi.plugins['email'].services.email.send({
            to: env('ADMIN_EMAIL'),
            from: entity.email,
            subject: entity.subject,
            text: entity.content,
          });
          console.log(email);
        } catch (e) {
          console.log(e);
        }
      }

      return sanitizeEntity(entity, { model: strapi.models['contact-form'] });
    }
    return valid;
  },
};
