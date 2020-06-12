const bcyprt = require('bcrypt');

module.exports = {
    login: async(req,res) => {
        const db = req.app.get("db");
        const {username, password} = req.body;

        const user = await db.check_user(username);

        if(!user[0]) {
            return res.status(409).send("User does not exist")
        }else {
            const authenticated = bcrypt.compareSync(password, user[0].password)

            if (authenticated) {
                req.session.user = {
                    userId: user[0].id, // whats happening with the user[0]'s here
                    username: user[0].username
                }
            }
        }
    }
}