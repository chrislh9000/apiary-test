const express = require('express');
const stream = require('getstream-node');
const router = express.Router();
//Models//
const models = require('../models/models');
const Post = models.Post;
const mongoose = require('mongoose');

//GETSTREAM

Post.plugin(stream.mongoose.activity);

stream.mongoose.setupMongoose(mongoose);
// console.log('===stream===', stream.mongoose)

Post.methods.activityActorProp = function() {
  return 'user';
}

const FeedManager = stream.FeedManager;


//modify createActivity function
// tweetSchema.methods.createActivity = function() {
// 	// this is the default createActivity code, customize as you see fit.
//       var activity = {};
//       var extra_data = this.activityExtraData();
//       for (var key in extra_data) {
//           activity[key] = extra_data[key];
//       }
//       activity.to = (this.activityNotify() || []).map(function(x){return x.id});
//       activity.actor = this.activityActor();
//       activity.verb = this.activityVerb();
//       activity.object = this.activityObject();
//       activity.foreign_id = this.activityForeignId();
//       if (this.activityTime()) {
//           activity.time = this.activityTime();
//       }
//       return activity;
//   }

console.log('===METHODS====', Post.methods.createActivity);
FeedManager.settings.apiKey = process.env.GETSTREAM_API_KEY;
FeedManager.settings.apiSecret = process.env.GETSTREAM_API_SECRET;
FeedManager.settings.apiAppId = process.env.GETSTREAM_APP_ID;
FeedManager.client.apiSecret = process.env.GETSTREAM_API_SECRET;
FeedManager.client.appId = process.env.GETSTREAM_APP_ID;
FeedManager.client.apiKey = process.env.GETSTREAM_API_KEY;
console.log('===FEED MANAGER===', FeedManager);


//ROUTES

router.get('/network/newsfeed', (req, res) => {
  res.render('./Network/apiary-feed');
});

router.get('/test/newsfeed', (req, res) => {
  const aggregatedFeed = FeedManager.getNewsFeeds(req.user.id)['timeline_aggregated'];
  console.log('===aggregated feed====', aggregatedFeed);
  res.render('./Network/newsfeed', {
    networkToggled: true,
    loggedIn: true,
  });
})







module.exports = router;
