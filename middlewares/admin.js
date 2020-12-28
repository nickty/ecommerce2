

exports.isAdmin = (req, res, next) => {
    if(req.profile.role===0){
        return res.status(400).json({
            error: 'Admin Resource'
        }) 
    }

    next()
}