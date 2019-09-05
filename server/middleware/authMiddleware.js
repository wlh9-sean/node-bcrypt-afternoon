const usersOnly = (req, res, next) => {
    if(!req.session.user){
        return res.status(401).send('Please log in')
    }
    next()
}

const adminsOnly = (req, res, next) => {
    if(!req.session.isAdmin){
        return res.status(403).send('You are not an admin')
    }
    next()
}






module.exports = {
    usersOnly
}