const Bank = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render('admin/bank/view_bank', {
        bank,
        alert,
        name: req.session.user.name,
        title: 'Halaman dasboard',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/bank/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Bank',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      const bank = await Bank({ name, bankName, noRekening });
      await bank.save();
      req.flash('alertMessage', 'Berhasil Tambah Bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      res.render('admin/bank/edit', {
        bank,
        name: req.session.user.name,
        title: 'Halaman Edit Bank',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;
      await Bank.findOneAndUpdate({ _id: id }, {
        name,
        bankName,
        noRekening,
      });
      req.flash('alertMessage', 'Berhasil Ubah Bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findOneAndRemove({ _id: id });
      req.flash('alertMessage', 'Berhasil Delete Bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
};
