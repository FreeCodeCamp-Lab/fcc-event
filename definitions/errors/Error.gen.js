"use strict";

module.exports = [
  {
    name: 'COMMON_ERROR',
    httpStatus: 500,
    code: (process.env.APPID || 1001)*1e6+500001,
    message: '通用错误',
  },
  {
    name: 'UNAUTHORIZED',
    httpStatus: 401,
    code: (process.env.APPID || 1001)*1e6+401001,
    message: '未授权',
  },
  {
    name: 'AUTHORIZED_INVALID',
    httpStatus: 401,
    code: (process.env.APPID || 1001)*1e6+401002,
    message: '授权错误',
  },
  {
    name: 'EVENT_NOT_FOUND',
    httpStatus: 404,
    code: (process.env.APPID || 1001)*1e6+404001,
    message: '没有找到活动详情',
  },
  {
    name: 'SUBMIT_NOT_FOUND',
    httpStatus: 404,
    code: (process.env.APPID || 1001)*1e6+404002,
    message: '没找到报名记录',
  },
];