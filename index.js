let crypto = require('crypto');
const { EncryptJWT } = require('jose/jwt/encrypt');
const { jwtDecrypt } = require('jose/jwt/decrypt');

let secret = 'my_secret_key';

/*
Generate 32 Byte key from plain text secret
in 2000 iterations using sha512 */

let secretKey = crypto.pbkdf2Sync(secret, 'salt', 2000, 32, 'sha512');

let TestFuction = async () => {
    /* Encrypt JWT with payload
    { name: "Taiwo Hassan", id: "12" }
    */
    const jwt = await new EncryptJWT(
        {
            name: "Taiwo Hassan",
            id: "12"
        }
    )
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .encrypt(secretKey)

    /* Display Encrypted JWT*/
    console.log("Encrypted JWT:", jwt);

    /* Decrypting The JWT */
    const { payload, protectedHeader } = await jwtDecrypt(jwt, secretKey);

    /* Display Decrypted JWT*/
    console.log("Header:", protectedHeader);
    console.log("Decrypted JWT:", payload);
}

TestFuction();



