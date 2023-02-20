'use strict';

/**
 * newz service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newz.newz');
