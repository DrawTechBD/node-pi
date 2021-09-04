const utils = require("../../helper/utils");
const UserModel = require("../user/userModel");
const QRModel = require("./qrModel");
const QRCode = require("qrcode");
const fs = require("fs");
const enigma = require("../../helper/enigma");

class QrService {
  showAll = async () => QRModel.find();

  generate = async (form, _id) => {
    const {user, anon} = form;
    if (utils.isEmpty(user)) throw "User data required";

    //  Update user data
    const updatedUser = await UserModel.findOneAndUpdate({_id}, {
      name: user.name,
      phone: user.phone,
      messenger: user.messenger,
      location: {...user.location},
    },{
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
    console.log(updatedUser);

    // Create a Chat request data
    const qr = await QRModel.findOneAndUpdate({owner: _id}, {owner: _id}, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    })
      .then((q) => {
        return {chat: q._id};
      }).catch(e => e);

    // Generate Base64 String from data for QR Code
    const data = anon ? JSON.stringify(qr) : JSON.stringify({...user,...qr, email: updatedUser.email});
    if(data == null) throw "Error Generating QR";
    let url = await QRCode.toDataURL(data, {type: 'png'})
      .then((qr) => {
        return qr;
      }).catch(e => {
        return null;
      });
    url = url.split(',')[1];
    // save file
    // await fs.writeFile(`public/assets/qr/${qr._id}.png`, url, 'base64', (err) => {
    //   if (err) throw(err);
    // });
    return url;
  }

  scan = async (string) => {
    const str = enigma.decrypt(string);
    // Encrypted Data
    if (ObjectId.isValid(str))
      return string;

    // Non-Encrypted Data
    else
      return {
      anon: false,
      data: JSON.parse(str),
    };
  }
}

module.exports = new QrService();
