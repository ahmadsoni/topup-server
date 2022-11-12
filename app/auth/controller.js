const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Player = require('../player/model');
const config = require('../../config');

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;
      if (req.file) {
        const tmp_path = req.file.path;
        const originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const filename = `${req.file.filename}.${originaExt}`;
        const target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const player = new Player({ ...payload, avatar: filename });
            await player.save();
            delete player._doc.password;
            res.status(201).json({
              data: player,
              message: 'Player created successfully',
              error: 2,
            });
          } catch (err) {
            if (err && err.name === 'ValidationError') {
              return res.status(422).json({
                error: 1,
                message: err.message,
                field: err.errors,
              });
            }
            next(err);
          }
        });
      } else {
        const player = new Player(payload);
        await player.save();
        delete player._doc.password;
        res.status(201).json({
          data: player,
          message: 'Player created successfully',
          error: 2,
        });
      }
    } catch (err) {
      if (err && err.name === 'ValidationError') {
        return res.status(422).json({
          error: 1,
          message: err.message,
          field: err.errors,
        });
      }
      next(err);
    }
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    Player.findOne({ email }).then((player) => {
      if (player) {
        const checkPassword = bcrypt.compareSync(password, player.password);
        if (checkPassword) {
          const token = jwt.sign({
            player: {
              id: player.id,
              username: player.username,
              email: player.email,
              nama: player.nama,
              phoneNumber: player.phoneNumber,
              avatar: player.avatar,
            },
          }, config.jwtKey);

          res.status(200).json({
            data: { token },
            message: 'Login success',
          });
        } else {
          res.status(403).json({
            message: 'password yang anda masukan salah.',
          });
        }
      } else {
        res.status(403).json({
          message: 'email yang anda masukan belum terdaftar.',
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: err.message || 'Internal server error',
      });
      next();
    });
  },
};
