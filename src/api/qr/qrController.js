const QRCode = require("qrcode");
const fs = require("fs");
const enigma = require("../../helper/enigma");

const QRModel = require('./qrModel');
const UserModel = require('../user/userModel');

const utils = require('../../helper/utils');

module.exports = {
  /**
   * Generate QR Code
   * @param param: Object user, bool anon
   * @returns {Promise<*>}
   */
  generate: async (req, res) => {
    try {
      const {user, anon} = req.body;
      console.log("Generating", req.body);
      // return req.status(500).json("That's bad");
      if (utils.isEmpty(user)) {
        return res.status(500).json("User data required");
        // throw "User data required";
      }
      //  Update user data
      const updatedUser = await UserModel.findOneAndUpdate({_id: req.user._id}, {
        name: user.name,
        phone: user.phone,
        messenger: user.messenger,
        location: {...user.location},
      },{
        upsert: true,
          new: true,
          setDefaultsOnInsert: true
      });
      // Create a Chat request data
      const qr = await QRModel.findOneAndUpdate({owner: req.user._id}, {owner: req.user._id}, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      })
        .then((q) => {
          return {chat: q._id};
        }).catch(e => e);

      const data = anon ? JSON.stringify(qr) : JSON.stringify({...user,...qr, email: updatedUser.email});
      if(data == null) throw "Error Generating QR";
      let url = await QRCode.toDataURL(data, {type: 'png'})
        .then((qr) => {
          return qr;
        }).catch(e => {
          return null;
        });
      url = url.split(',')[1];
      await fs.writeFile('qr.png', url, 'base64', (err) => {
        if (err) throw(err);
      });
      return res.json(url);
    } catch (e) {
      console.log('error', e);
      return res.status(500).json({
        msg: "Error generating QR",
        error: e,
      });
    }
  },
  scan: async (req, res) => {
    try {
      console.log(`Request: ${req.body.data}`)
      const str = enigma.decrypt(req.body.data);
      if (ObjectId.isValid(str)) {
        return res.json(str);
      }
      return res.json({
        anon: false,
        data: JSON.parse(str),
      });
      // return res.json(await UserService.show(id));
    } catch (e) {
      return res.status(500).json({
        msg: "Error decrypting user",
        error: e,
      });
    }
  },

}
