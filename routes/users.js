
const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';

    // GET ALL USERS
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // GET USERS BY ID
    app.get('/users/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            const userId = req.params["id"];

            const users = JSON.parse(data)

            res.send(users[userId]);
        });
    });

    // SEARCH USER BY NAME
    app.get('/searchUsersByName', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const filters = req.query;
            const users = Object.values(JSON.parse(data))
            const filteredUsers = users.filter(user=>user.name.indexOf(filters.filters)>-1)
            res.send(filteredUsers)
        });
    });
}

module.exports = userRoutes;
