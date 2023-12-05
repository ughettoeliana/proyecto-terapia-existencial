import jwt from 'jsonwebtoken'

export function createAccessToken(payload){
 return new Promise((resolve, reject) => {jwt.sign(
    payload,
    "secret token",
    {
      expiresIn: "30d",
    },
    (err, token) => {
      if (err) {reject(err);}
      resolve(token)
    }
  );
});
};
