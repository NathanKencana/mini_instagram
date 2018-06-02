var mysql = require('mysql');
var express = require('express');
var app = express();
var cors = require('cors');
var bodyparser = require('body-parser');
var url = require('url');
var uniqid = require('uniqid')

const fileUpLoad = require('express-fileupload');
app.use(fileUpLoad());

app.use('/images', express.static(__dirname + "/img/"));

app.use(cors());
app.use(bodyparser.json());


var urlenc = bodyparser.urlencoded({ extended: true });
app.use(express.static(__dirname));

var conn = mysql.createConnection(
    {
        host: "localhost",
        port: 3307,
        database: "insta",
        user: "root",
        password: "usbw"
    }
)

// ============== User ============== //
app.get(`/user/:id`, (req, res) => {
    conn.query(`select * from user_login join post on user_login.id = post.id_user where user_login.id = ${req.params.id}`,
        (err, user) => {
            res.send(user);
        })
})

app.get('/login', (req, res) => {
    conn.query('select * from user_login',
        (err, login) => {
            res.send(login)
        })
})

app.post('/register', urlenc, (req, res) => {
    conn.query(`select username from user_login where ?`,
        {
            username: req.body.username
        },
        (err, regis) => {
            if (err) throw err;
            let status_register;

            if (regis.length > 0) {
                status_register = 'error';
            }
            else {
                conn.query(`insert into user_login set ?`,
                    {
                        username: req.body.username,
                        password: req.body.password
                    })
                status_register = 'register success';
            }
            res.json(status_register);
        })
})

app.post('/editprofile/:id', urlenc, (req, res) => {
    var sql = 'update user_login set ? where ?';

    let temp = req.files.file;
    let pict = req.files.file.name;
    let nama_pict = uniqid() + '.' + pict.split('.')[1];
    temp.mv(__dirname + '/img/' + nama_pict, (err) => {
        if(err) throw err;
    })
    conn.query(sql,
        [
            {
                username: req.body.username,
                password: req.body.password,
                prof_pic: nama_pict
            },
            {
                id: req.params.id
            }
        ],
        (err, hasil) => {
            if (err) throw err;
        });

})


// ============== Post ============== //
app.get('/timeline/:id', (req,res) => {
    var sql1= `select * from post join user_login on post.id_user = user_login.id where id_user = ${req.params.id}`
    var sql2= ``
    conn.query(sql1, 
    (err, timeline) => {
        res.send(timeline)
    })
})
// app.get('/timeline/:id', (req, res) => {
//     var sql1 = `SELECT * 
//     FROM follows f 
//     join post p 
//     join user_login ul on f.id_user = ul.id
//     WHERE f.id_follower = '${req.params.id}'`

//     var sql2 = `SELECT * 
//     FROM posts
//     WHERE id_user = '${req.params.id}'`;
//     var baru = new Object();
//     conn.query(sql1,
//         (err, timeline) => {
//             if (err) throw err;
//             baru.timeline1 = timeline
//             conn.query(sql2,
//                 (err, timeline2) => {
//                     baru.timeline2 = timeline2
//                     res.send(baru);
//                 })
//         })
// })

app.post('/post/:id', urlenc, (req, res) => {
    if (!req.files)
        return res.status(404).send('No Photo uploaded.');

    let temp = req.files.file;
    let pict = req.files.file.name;
    console.log(pict)
    let nama_pict = 'z' + uniqid() + '.' + pict.split('.')[1];
    console.log(nama_pict)
    console.log(req.body.caption)
    console.log(req.params.id)

    temp.mv(__dirname + '/img/' + nama_pict, (err) => {
        if (err) return res.status(500).status.send(err);

        // res.send('File Uploaded');
        conn.query(`insert into post set ? `,
            {
                id_user: req.params.id,
                picture: nama_pict,
                caption: req.body.caption
            })

    })
})


// ============== Follow ============== //
app.get('/follower/:id', (req, res) => {
    var sql = `select * from follows join user_login on id_follower = user_login.id where id_following = ?`;
    conn.query(sql, [req.params.id],
        (err, follow) => {
            if (err) throw err;
            res.send(follow)
        })
})
app.get('/following/:id', (req, res) => {
    var sql = `select * from follows join user_login on id_user = user_login.id where id_follower = ?`;
    conn.query(sql, [req.params.id],
        (err, following) => {
            if (err) throw err;
            res.send(following);
        })
})
app.post('/follow/:id', urlenc, (req, res) => {
    conn.query('insert into follows set ?',
        {
            id_user: req.body.id_user,
            id_follower: req.params.id
        })
    res.json(req.body)
})


// ============= LIKE ================ //
app.post('/like/:id', (req, res) => {
    var sql1 = `insert into post_like set ('id_post', 'id_user') values ([${req.params.id}], [${req.body.id_user}]`;
    conn.query(sql1, (err, like) => {
        if (err) throw err;
        res.json(req.body)
    })
})

app.post('/unlike/:id', (req, res) => {
    var sql1 = `delete from post_like where id_post = ${req.params.id} && id_user = ${req.body.id}`;
    conn.query(sql1, (err, unlike) => {
        if (err) throw err;
        res.json(req.body)
    })
})

// ============== SEARCH ================== //
app.get("/search/:id", (req, res) => {
    conn.query(`select * 
    from user_login 
    left join follows on user_login.id = follows.id_user
    left join post on user_login.id = post.id_user
    where username like '${req.params.id}'`,
        (err, search) => {
            if (err) throw err;
            res.json(search);
        })
})


app.listen(3030, console.log(`server run`));
