const utils = require("../../helper/utils");
const UserModel = require("../user/userModel");
const QRModel = require("./qrModel");
const QRCode = require("qrcode");
const fs = require("fs");
const enigma = require("../../helper/enigma");

class QrService {
  showAll = async () => QRModel.find();

  /**
   * Generate QR Code
   * @param form
   * @param {String} form.name
   * @param {String} form.phone
   * @param {String} form.messenger
   * @param {String} form.location
   * @param {String} _id
   * @returns {Promise<*|T>}
   */
  generate = async (form, _id) => {
    const {user, anon} = form;
    if (utils.isEmpty(user)) throw "User data required";

    //  Update user data
    const u = await UserModel.findOne({_id});
    u.name = user.name;
    u.phone = user.phone;
    u.messenger = user.messenger;
    u.location = user.location;
    u.save();

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
    const data = anon ? JSON.stringify(qr) : JSON.stringify({...user,...qr});
    if(data == null) throw "Error Generating QR";
    let url = await QRCode.toDataURL(data, {type: 'png'})
      .then((qr) => {
        return qr;
      }).catch(e => {
        return null;
      });
    url = url.split(',')[1];
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
