#!/usr/bin/env node
'use strict';

if (process.env.SQREEN_ENABLE) {
  require('sqreen');
}

const strapi = require('strapi');
strapi().start();
