const checkUser = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.user_role;
        //console.log(userRole); //get user role from request.body
        if(permissions.includes(userRole)){
            next()
        }
        else{
            return res.status(401).json("Unauthorized Access! No Permission!");
        }
    }   
} 

module.exports = { checkUser }

