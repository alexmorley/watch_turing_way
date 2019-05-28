var express = require('express');
var router = express.Router();

const axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
	axios.get('https://api.github.com/repos/alan-turing-institute/the-turing-way/events')
		.then(response => {
      let data = response.data; //[response.data[1]]

      let data_to_show = data.map((el,i,arr) => {
        let type
        if (el.type == 'IssueCommentEvent') {
          type = 'New Comment';
        } else if (el.type == 'PullRequestEvent') {
          type = 'New Pull Request'
        } else if (el.type == 'PullRequestReviewCommentEvent') {
          type = 'New Pull Request Review Comment'
        } else if (el.type == 'IssuesEvent') {
          type = 'New Issue'
        } else if (el.type == 'PushEvent') {
          type = 'New Push'
        } else if (el.type == 'DeleteEvent') {
          type = 'New Delete'
        } else {
          type = el.type
        }
        console.log(el.created_at);
        let time = Date.parse(el.created_at);
        time = new Date(time);
        t = time.toTimeString();
        if ((el.actor.display_login == "netlify") | (el.actor.display_login == "allcontributors")) {
          return 0;
        }
        if (true) { return {
          type: type,
          user: el.actor.display_login,
          img: el.actor.avatar_url,
          time: t
        } } else {
          return el
        }
      });

      data_to_show = data_to_show.filter(el => el != 0);

      //data_to_show = JSON.stringify(data_to_show)
			res.render('index', { title: 'The Turing Way', data: data_to_show,
        raw_data: JSON.stringify(response.data)});
		})
		.catch(error => {
			console.log(error);
		});
});



module.exports = router;
