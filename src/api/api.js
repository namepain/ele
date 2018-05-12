let seller = require('./seller.json')
let goods = require('./goods')
let ratings = require('./ratings')

export function getSeller() {
  // return Promise.resolve(seller)
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(seller)
    }, 80)
  })
}

export function getGoods() {
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(goods)
    }, 80)
  })
}

export function getRatings() {
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(ratings)
    }, 80)
  })
}

export const ERR_OK = 0
