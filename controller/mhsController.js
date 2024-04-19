// controllers/homeController.js
const { sequentilSearch } = require('../sequentilSearch');
let mahasiswa = require('../data.json');

exports.getIndex = async(req, res) => {
    let result = mahasiswa; 
    if (req.query.nama) {
        const { nama } = req.query;
        result = sequentilSearch(mahasiswa, nama);
    }

    const noData = (result.length === 0) ? "Data tidak ditemukan" : "";
    res.render('home.ejs', { result, noData });
};

let stack = []
exports.postData = async(req, res) => {
    const data = req.body;
    stack.unshift(`data dengan nama ${data.nama} ditambahkan`)
    mahasiswa.push(data); 
    res.redirect('/');
};
exports.deleteData = async(req, res) => {
    const { nim } = req.params;
    const newStack = mahasiswa.filter(m => m.nim === nim)
    stack.unshift(`data dengan nama ${newStack[0].nama} terhapus`)
    mahasiswa = mahasiswa.filter(mhs => mhs.nim !== nim);
    res.redirect('/');
};

exports.showriwayat = async(req, res) => {
    res.render('riwayat.ejs', {stack});
}