const express = require('express');

const router = express.Router();

const data = [
  {
    idx: 0,
    user: 'dtk0528',
    content: 'LOGIN and type a name to start',
    time: new Date('Mon, 8 May 2017 12:00:00 +0800'),
    replys: [2, 3],
    parent: false,
    level: 1,
  },
  {
    idx: 1,
    user: 'dtk0528',
    content: '∧/∨ => collapse/expand a comment',
    time: new Date('Mon, 8 May 2017 12:05:00 +0800'),
    replys: [],
    parent: false,
    level: 1,
  },
  {
    idx: 2,
    user: 'dtk0528',
    content: 'REPLY to any comment',
    time: new Date('Mon, 8 May 2017 12:05:10 +0800'),
    replys: [],
    parent: true,
    level: 2,
  },
  {
    idx: 3,
    user: 'dtk0528',
    content: '╳ => exit reply mode',
    time: new Date('Mon, 8 May 2017 12:10:00 +0800'),
    replys: [],
    parent: true,
    level: 2,
  },
];

router.get('/', (req, res) => {
  res.json(data);
});

router.put('/comments', (req, res) => {
  const replyData = req.body;
  data[replyData.parentIdx].replys.push(replyData.idx);
  res.send(data);
});

router.post('/comments', (req, res) => {
  const body = req.body;
  const time = new Date();
  const comment = {
    idx: data.length,
    user: body.user,
    content: body.content,
    time,
    replys: [],
    parent: body.parent,
    level: body.level,
  };
  data.push(comment);
  res.send(data);
});

module.exports = router;
