const Sequelize = require('sequelize');
const db = require('../db');
const sentiment = require('sentiment');

const Review = db.define('review', {
  asin: {
    type: Sequelize.STRING
  },
  reviewerName: {
    type: Sequelize.STRING
  },
  reviewText: {
    type: Sequelize.TEXT,
    validate: {
      // need to add minimum number of characters
      len: [10, 1000000]
    }
  }, 
  overall: {
    type: Sequelize.FLOAT
  }, 
  summary: {
    type: Sequelize.TEXT
  },
  score: {
    type: Sequelize.INTEGER
  },
  words: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
}, {
  hooks: {
    beforeCreate: (review, options) => {
      let data = sentiment(review.reviewText);
      review.score = data.score;
      review.words = data.words;
    }
  }
});

Review.nMostPositive = function(asin) {
  const n = 10;
  return Review.findAll({where: {asin: asin}, order: [['score', 'DESC']], limit: n});
}

Review.nMostNegative = function(asin) {
  const n = 10;
  return Review.findAll({where: {asin: asin}, order: [['score', 'ASC']], limit: n});
}

Review.nMostRecent = function(asin) {
  const n = 10;
  return Review.findAll({where: {asin: asin}, order: [['unixReviewTime', 'DESC']], limit: n});
}

module.exports = Review;