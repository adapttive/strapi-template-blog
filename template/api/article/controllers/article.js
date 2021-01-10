const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Blocking non published articles
   * https://strapi.io/documentation/v3.x/guides/draft.html#apply-our-changes
   * @param ctx
   * @returns {Promise<*>}
   */
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: true,
    };

    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article }));
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};
