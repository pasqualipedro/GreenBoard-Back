const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    const token = request.get('Authorization');
    
    if(!token) {
        response.status(401).json({ msg: 'Request without token' })
    };

    const tokenWithoutBearer = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(
            tokenWithoutBearer,
            process.env.SECRET_JWT
        );
        console.log(decodedToken);
        request.user = {...decodedToken}; /** ----->> HERE WE PASS THE DECODED.TOKEN AHEAD */
        next();
    } catch (error) {
        response.status(401).json({ msg: 'Unauthorized' });        
    }
}

module.exports = auth