'use strict';

/**
 * beginner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::beginner.beginner');
