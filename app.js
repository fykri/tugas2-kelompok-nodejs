const express = require('express')
const path = require('path')
const methodOverride =require('method-override')
const app = express()
const port = 8000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

let mahasiswa = [
    {
        "nama" : "Dzul Fikri",
        "nim" : "13020210122",
        "noTelpon" : "085770677814"
    },
    {
        "nama" : "Ardy Dwi Putra",
        "nim" : "13020210136",
        "noTelpon" : "082543643784"
    },
    {
        "nama" : "Fathur",
        "nim" : "13020210134",
        "noTelpon" : "0815639321235"
    },
    {
        "nama" : "Ilham",
        "nim" : "13020210153",
        "noTelpon" : "082653784921"
    },
    {
        "nama" : "Fery",
        "nim" : "13020210435",
        "noTelpon" : "086321453487"
    },

]

const sequentilSearch = (arr, target) => {
    const lowercaseTarget = target.toLowerCase();
    const result = [];
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].nama.toLowerCase() === lowercaseTarget) {
            result.push(arr[i]);
        }
    }
    return result;
}

stack = [];
app.get('/', (req, res) => {
    let result = mahasiswa; 
    if (req.query.nama) {
        const { nama } = req.query;
        result = sequentilSearch(mahasiswa, nama);
    }

    const noData = (result.length === 0) ? "Data tidak ditemukan" : "";
    res.render('home.ejs', { result, noData });
});

app.post('/', (req, res) => {
    const data = req.body;
    stack.unshift(`data dengan nama ${data.nama} ditambahkan`)
    mahasiswa.push(data); 
    res.redirect('/');
});

app.delete('/:nim', (req, res) => {
    const { nim } = req.params;
    const newStack = mahasiswa.filter(m => m.nim === nim)
    stack.unshift(`data dengan nama ${newStack[0].nama} terhapus`)
    mahasiswa = mahasiswa.filter(mhs => mhs.nim !== nim);
    res.redirect('/');
});


app.get('/riwayat', (req, res)=> {
    res.render('riwayat.ejs', {stack})
})

app.listen(port, ()=> {
    console.log(`server running in http://localhost:${port}`);
})