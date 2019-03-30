const User = require('../models/user');

exports.get_users_Render = (req, res) => {
    User.find()
        .select('id userName googleId status')
        .exec()
        .then(docs => {
            const response = {
                // count: docs.length,
                UserList: docs.map(doc => {
                    return {
                        id: doc.id,
                        userName: doc.userName,
                        googleId: doc.googleId,
                        status:doc.status
                    }
                })
            };
            res.render('users', {user: req.user, myData: response});
        })
        .catch(err => {
            console.log(err);
        });
    // res.render('users',{user:req.user});
};

exports.delete_users_Render = (req, res) => {
    const idToReove = req.body.userIdToDelete;
    User.findById(idToReove)
        .exec()
        .then(searchResult => {
            if (searchResult) {
                if (searchResult.status) {
                    console.log('Nie można usunąć admina! koniec kropek!');
                    res.redirect('/users');
                } else {
                    User.remove({_id: idToReove})
                        .exec()
                        .then(result => {
                            // res.status(200).json({
                            //     message: 'User deleted!',
                            //     request: {
                            //         type: 'GET',
                            //         url: 'http://localhost:3000/users',
                            //         body: {name: 'String', price: 'Number'}
                            //     }
                            // });
                            res.redirect('/users');
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        })
                }
            } else {
                console.log('Nie znaleziono takiego usera!');
                res.redirect('/users');
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};