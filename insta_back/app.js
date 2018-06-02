var mysql = require('mysql');
var express = require('express');
var app = express();
var cors = require('cors');
var bodyparser = require('body-parser');
var uniqid = require('uniqid');
var fileupload = require('express-fileupload')

app.use(fileupload());
app.use('/images', express.static(__dirname + '/img'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

var url = bodyparser.urlencoded({ extended: false })

var conn = mysql.createConnection(
    {
        host: "localhost",
        port: 3307,
        database: "new_insta",
        user: "root",
        password: "usbw"
    }
)

// ================== USER ================== //
app.post('/register', (req, res) => {
    var sql = `select username from user where username = ?`;
    conn.query(sql, [req.body.username], (err, regis) => {
        if (regis.length > 0) {
            res.json("username sudah terpakai")
        }
        else {
            conn.query(`insert into user set ?`, {
                username: req.body.username,
                password: req.body.password
            })
        }
    })
})

app.get('/login', (req, res) => {
    conn.query('select * from user', (err, login) => {
        res.send(login)
    })
})

app.get('/profile/:id', (req, res) => {
    var sql = 'select * from user where id = ?';
    conn.query(sql, [req.params.id], (err, profile) => {
        if(err) throw err;
        res.send(profile);
        console.log('ini profile ', profile);
    })
})
app.get('/postprofile/:id', (req,res) => {
    var sql = `select * from user join timeline on user.id = timeline.id_user where user.id = ?`;
    conn.query(sql,[req.params.id], (err, isi) => {
        if(err) throw err;
        console.log('ini isi ', isi)
        res.send(isi)
    })
})

app.post('/editprofile/:id', url, (req, res) => {
    var sql = 'update user set ? where ?';

    let temp = req.files.file;
    let pict = req.files.file.name;
    let nama_pict = 'profile' + uniqid() + '.' + pict.split('.')[1];

    temp.mv(__dirname + '/img/' + nama_pict, (err) => {
        if (err) throw err;
        res.send('upload success');
    })

    conn.query(sql,
        [
            {
                username: req.body.username,
                password: req.body.password,
                profile: nama_pict
            },
            {
                id: req.params.id
            }
        ],
        (err, edit) => {
            if (err) throw err;
        })
})

// ============= TIMELINE =============== //
app.get('/timeline/:id', (req, res) => {
    var sql = `SELECT * FROM follow f JOIN timeline t ON f.id_follow = t.id_user JOIN user u ON t.id_user = u.id WHERE f.id_user = ${req.params.id} order by t.date desc`
    var sql2 = `SELECT * FROM timeline t JOIN user u ON u.id = t.id_user WHERE t.id_user = ${req.params.id} order by t.date desc`

    conn.query(sql, (err, tfollow) => {
        if (err) throw err;
        conn.query(sql2, (err, tuser) => {
            if (err) throw err;
            console.log('tuser : ', tuser);
            console.log('tfollow : ', tfollow)
            res.json({ tuser, tfollow })
        })
    })
})

app.post('/post/:id', url, (req, res) => {
    if (!req.files)
        return res.status(404).send('No photo uploaded');

    let temp = req.files.file;
    let pict = req.files.file.name;
    let nama_pict = 'post' + uniqid() + '.' + pict.split('.')[1];

    temp.mv(__dirname + '/img/' + nama_pict, (err) => {
        if (err)
            return res.status(500).status.send(err);

        conn.query('insert into timeline set ? ', {
            id_user: req.params.id,
            image: nama_pict,
            caption: req.body.caption
        })
    })
})

app.get('/like', (req, res) => {
    conn.query('select * from likes', (err, like) => {
        if (err) throw err;
        res.send(like);
    })
})

app.post('/like/:id', (req, res) => {
    conn.query('insert into likes set ?', {
        id_post: req.params.id,
        id_user: req.body.id
    })
})

app.post('/unlike/:id', (req, res) => {
    var sql = `delete from likes where id_user = ${req.body.id} && id_post = ${req.params.id}`
    conn.query(sql, (err, unlike) => {
        if (err) throw err;
    })
})

// ============== FOLLOW =============== //
app.get('/follower/:id', (req, res) => {
    var sql = `select * from follow join user on follow.id_follow = user.id where follow.id_user = ?`;
    conn.query(sql, [req.params.id], (err, follower) => {
        if (err) throw err;
        res.send(follower);
    })
})
app.get('/following/:id', (req, res) => {
    var sql = `select * from follow join user on follow.id_user = user.id where follow.id_follow = ?`;
    conn.query(sql, [req.params.id], (err, following) => {
        if (err) throw err;
        res.send(following);
    })
})
app.get('/follow', (req,res) => {
    conn.query('select * from follow', (err,follow) => {
        if(err) throw err;
        res.send(follow)
    })
})
app.post('/follow', (req, res) => {
    conn.query('insert into follow set ?', {
        id_user: req.body.id_user,
        id_follow: req.body.id_follow
    })
})
app.post('/unfollow', (req, res) => {
    conn.query('delete from follow where ? &&  ?', {
        id_user: req.body.id_user,
        id_follow: req.body.id_follow
    })
})

// ============= SEARCH ================ //
app.get('/search/:name', (req, res) => {
    var sql = `select * from user where username = '${req.params.name}'`;
    var sql2 = `select * from follow join user on follow.id_follow = user.id where user.username = '${req.params.name}'`;
    var sql3 = `select * from follow join user on follow.id_user = user.id where user.username = '${req.params.name}'`;

    conn.query(sql, (err, search) => {
        if (err) throw err;
        conn.query(sql2, (err, following) => {
            if (err) throw err;
            conn.query(sql3, (err, follower) => {
                if (err) throw err;
                res.json({ search, follower, following })
            })
        })
    })
})


app.listen(3030, console.log('server run'));