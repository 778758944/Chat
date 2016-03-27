/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-25 22:09:56
 * @version $Id$
 */
var path=require('path');
fs=require('fs');

exports.privateKey=fs.readFileSync(path.join(__dirname,'./private/privatekey.pem')).toString();
exports.certificate=fs.readFileSync(path.join(__dirname,'./private/certificate.pem')).toString();
