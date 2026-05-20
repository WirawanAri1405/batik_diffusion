export interface BatikData {
    id: string;
    svgIds: string[]; // ID dari elemen <path> SVG pada peta
    region: string;
    motifs: {
        name: string;
        img: string;
        desc: string;
    }[];
}

export const batikDatabase: BatikData[] = [
    {
        id: 'jateng',
        svgIds: ['YO'],
        region: 'Yogyakarta & Surakarta',
        motifs: [
            {
                name: 'Batik Parang',
                img: 'batik/batik_parang_0096.jpg',
                desc: 'Kurva "S" yang tak terputus meniru ombak laut yang tanpa lelah menghantam tebing karang, melambangkan ketahanan, semangat pantang menyerah, ketekunan, dan upaya perbaikan diri yang berkelanjutan. Mengenakan Parang juga menandakan darah bangsawan, otoritas tertinggi, kemuliaan, serta karisma seorang pemimpin. Dahulu merupakan motif terlarang (Batik Larangan) yang ketat hanya untuk Sultan, keluarga kerajaan, dan ksatria, kini motif ini menjadi andalan utama dalam upacara tradisional Jawa serta acara nasional yang sangat formal.'
            },
            {
                name: 'Batik Kawung',
                img: 'batik/batik_kawung_0109.jpg',
                desc: 'Terdiri dari empat bentuk oval yang berpotongan di satu titik pusat membentuk rantai geometris, terinspirasi oleh buah aren atau irisan bunga teratai mekar. Motif ini melambangkan kemurnian, ketulusan, kesucian, dan kerendahan hati. Lingkaran yang saling bersinggungan mengingatkan para pemimpin dan bangsawan agar selalu bertindak bijaksana, adil, dan membumi tanpa keangkuhan. Dahulu dikhususkan secara eksklusif untuk keluarga kerajaan Sultan, sekarang Kawung banyak dikenakan dalam acara formal dan upacara adat.'
            },
            {
                name: 'Batik Bokor Kencono',
                img: 'batik/batik_bokor_kencono_0025.jpg',
                desc: 'Menampilkan visual simetris berbentuk wadah atau mangkuk seremonial emas yang dikelilingi oleh sulur tanaman, biji-bijian, atau sayap Garuda. Motif ini merepresentasikan otoritas, kemuliaan, bangsawan, serta tanggung jawab berat dari seorang pemimpin yang bijaksana, sekaligus simbol wadah keberkahan, kekayaan, dan nasib baik. Secara tradisional, motif klasik pedalaman ini dicadangkan bagi kaum bangsawan saat menghadiri upacara besar di dalam istana maupun pertemuan formal tingkat tinggi.'
            },
            {
                name: 'Batik Sekar Jagad',
                img: 'batik/batik_sekarjagad_0014.jpg',
                desc: 'Memiliki arti "Bunga-bunga di Alam Semesta", motif patchwork atau mosaik asimetris ini menyerupai peta gugusan pulau yang diisi oleh berbagai isen-isen tradisional yang berbeda-beda. Pola ini melambangkan keindahan, pesona, serta kekayaan keberagaman budaya dan alam dunia. Penggabungan berbagai motif acak menjadi satu kain yang indah mencerminkan persatuan dalam perbedaan, keharmonisan, serta kasih sayang dalam keluarga. Sangat sering digunakan untuk acara kebudayaan, pertemuan formal, dan pakaian diplomatik resmi.'
            },
            {
                name: 'Batik Sido Luhur',
                img: 'batik/batik_sidoluhur_0005.jpg',
                desc: 'Berakar dari kata "Sido" (menjadi/tercapai) dan "Luhur" (mulia/terhormat), motif ini merupakan bentuk doa visual agar pemakainya dapat mencapai kemurnian hati, ketulusan, serta kedudukan moral yang tinggi di masyarakat. Motif ini juga menyimbolkan harapan untuk meraih posisi atau jabatan yang terhormat dengan kepemimpinan yang bijaksana. Motif sakral ini sangat sering dan menonjol dikenakan oleh orang tua mempelai pria maupun wanita selama upacara pernikahan adat Jawa.'
            },
            {
                name: 'Batik Sido Mukti',
                img: 'batik/batik_sidomukti_0049.jpg',
                desc: 'Menampilkan struktur geometris belah ketupat yang diisi oleh ornamen kupu-kupu yang melambangkan transformasi kehidupan baru, serta tanaman yang bermekaran. Motif ini membawa doa mendalam agar pemakainya memperoleh kemakmuran yang berkelanjutan, kekayaan, nasib baik, serta kebahagiaan hidup tanpa kesulitan ekonomi. Sebagai corak pengantin yang sangat populer, motif ini menjadi simbol kesetiaan romantis dan keharmonisan keluarga, wajib dipakai oleh sepasang mempelai pada upacara pernikahan.'
            },
            {
                name: 'Batik Sido Mulyo',
                img: 'batik/batik_sidomulyo_0011.jpg',
                desc: 'Kaya akan simbol-simbol kehidupan seperti Meru (gunung suci), pohon, sayap Gurda, atau kupu-kupu kecil dalam kisi geometris yang simetris. Membawa pesan doa bagi pasangan baru agar hidup mereka dipenuhi kemuliaan, kehormatan, kejayaan, serta aliran berkah yang terus-menerus. Ornamen istana di dalamnya menandakan pencapaian status sosial yang dihormati tanpa kehilangan akar keluarga yang harmonis. Secara tradisional dikenakan oleh sepasang pengantin selama prosesi pernikahan Jawa.'
            },
            {
                name: 'Batik Srikraton',
                img: 'batik/batik_srikaton_0001.jpg',
                desc: 'Menampilkan lambang agung kerajaan berskala besar seperti sayap Gurda dan teratai mekar simetris yang dibingkai oleh kisi-kisi padat. Desain formal pedalaman ini memancarkan kemegahan, otoritas absolut, serta kharisma suci dari seorang penguasa berdaulat, sekaligus simbol aliran kekayaan dari istana kepada rakyat. Corak ini dirancang secara ketat khusus untuk menghadiri acara-acara agung di dalam lingkungan istana keraton serta upacara tradisional yang sangat bergengsi.'
            },
            {
                name: 'Batik Tribusono',
                img: 'batik/batik_tribusono_0003.jpg',
                desc: 'Sebuah motif batik kreasi modern asal Surakarta yang memadukan tanaman rimbun, daun detail, serta kepak burung yang sedang terbang. Kehadiran sepasang burung dan bunga melambangkan kasih sayang, romansa cinta, dan keharmonisan hubungan keluarga. Kerapatan polanya mencerminkan kekayaan dan kelimpahan isi bumi, serta simbol inovasi budaya yang tumbuh anggun tanpa meninggalkan akar tradisinya. Bersifat sangat fleksibel untuk dikenakan pada pernikahan modern, acara formal malam hari, maupun pertemuan kasual yang modis.'
            },
            {
                name: 'Batik Truntum',
                img: 'batik/batik_tuntrum_0052.jpg',
                desc: 'Diciptakan oleh Kanjeng Ratu Kencana, motif mikro-geometris yang sangat presisi ini menggambarkan taburan bintang kecil yang berkedip di langit malam atau kuncup melati yang sedang terbuka. Truntum memiliki arti "tumbuh kembali", melambangkan cinta tanpa syarat, kesetiaan, ketulusan, kesabaran yang luar biasa, serta panduan cahaya spiritual di tengah kegelapan masa sulit. Motif emosional ini wajib dikenakan oleh orang tua dari kedua mempelai pada malam midodareni dan hari pernikahan sebagai penuntun hikmat bagi pasangan baru.'
            },
            {
                name: 'Batik Wahyu Tumurun',
                img: 'batik/batik_wahyu_tumurun_0001.jpg',
                desc: 'Memiliki arti "Turunnya Wahyu atau Berkah Ilahi", motif sakral ini didominasi oleh gambar mahkota kerajaan yang melayang, dikelilingi oleh sulur bunga, burung merak, atau pasang ayam jantan. Motif ini adalah bentuk doa visual untuk memohon bimbingan surgawi, hubungan spiritual dengan Tuhan, serta petunjuk dalam hidup. Mahkota tersebut menyimbolkan mandat kepemimpinan, kebijaksanaan, keadilan, dan kharisma tinggi, serta harapan akan kemakmuran kekal. Sangat disukai untuk acara pelantikan jabatan tinggi atau dikenakan oleh pasangan pengantin.'
            },
            {
                name: 'Batik Wirasat',
                img: 'batik/batik_wirasat_0006.jpg',
                desc: 'Merupakan batik komposit yang menjalin beberapa simbol utama keraton seperti gunung Meru, pohon kehidupan, dan latar belakang Truntum menjadi satu bentangan kain. Kain ini merepresentasikan transfer petuah bijak, ketekunan, kerendahan hati, serta manifestasi fisik dari berkah, harapan, dan kasih sayang orang tua yang mendalam demi persatuan keluarga anaknya. Ornamen Gurda di dalamnya bertindak sebagai perisai perlindungan spiritual dari kemalangan. Secara ketat wajib dipakai oleh orang tua mempelai saat pernikahan.'
            }
        ]
    },
    {
        id: 'jabar',
        svgIds: ['JB'],
        region: 'Cirebon, Jawa Barat',
        motifs: [
            {
                name: 'Batik Mega Mendung',
                img: 'batik/batik_mega_mendung_0004.jpg',
                desc: 'Menampilkan pola awan bergradasi tajam sebanyak tujuh hingga sembilan lapisan warna yang melambangkan tingkatan lapisan langit. Secara filosofis, awan pembawa hujan ini bermakna bahwa seorang pemimpin harus memiliki sifat yang mengayomi, adil, berkepala dingin, dan mampu menahan amarah di tengah kekuasaan besar. Awan mendung juga melambangkan kesuburan dan air kehidupan bagi pertanian bumi. Motif ikonik ini sangat populer digunakan oleh seluruh lapisan masyarakat Cirebon untuk pakaian sehari-hari, kedinasan, maupun upacara adat.'
            },
            {
                name: 'Batik Singa Barong',
                img: 'batik/batik_singa_barong_0008.jpg',
                desc: 'Mahakarya istana Kasepuhan Cirebon yang menggambarkan kereta kencana dalam wujud makhluk mitologi gabungan: kepala singa/harimau (simbol pengaruh Hindu/Eropa), belalai gajah (India), serta sayap dan sisik naga (Tiongkok). Gabungan unik ini merepresentasikan sinkretisme budaya, kebijaksanaan ilahi, serta otoritas absolut Sultan yang disegani lintas bangsa. Makhluk ganas ini dipercaya menjadi roh penjaga kerajaan untuk menolak bala dan roh jahat. Dahulu khusus untuk keluarga kesultanan, sekarang dipakai pada festival budaya besar dan acara formal.'
            },
            {
                name: 'Batik Liong',
                img: 'batik/batik_liong_0028.jpeg',
                desc: 'Menggambarkan naga Tiongkok yang meliuk-liuk di antara awan pusaran air sambil mengejar mutiara api, mencerminkan asimilasi budaya Tionghoa yang kuat di wilayah pesisir Jawa. Naga merupakan lambang tertinggi dari kemakmuran, kekayaan melimpah, kekuatan perlindungan dari roh jahat, serta kekuasaan kepemimpinan yang berwibawa. Didominasi oleh warna-warna cerah pembawa keberuntungan seperti merah dan emas, kain ini sangat sering dipakai pada perayaan Tahun Baru Imlek, festival kebudayaan, dan pesta pernikahan.'
            }
        ]
    },
    {
        id: 'jbatik', // ID Gabungan untuk Pesisir Pekalongan
        svgIds: ['JT'],
        region: 'Pekalongan, Jawa Tengah',
        motifs: [
            {
                name: 'Batik Buketan',
                img: 'batik/batik_buketan_0080.jpg',
                desc: 'Terpengaruh oleh budaya Eropa (Belanda) melalui kata Perancis "boeket" yang berarti rangkaian bunga. Fokus visualnya berupa buket tanaman bunga yang asimetris dilengkapi detail kupu-kupu, burung walet, atau merak yang menawan. Rangkaian bunga dan pasangan fauna ini melambangkan romansa percintaan, kasih sayang yang tulus, kesetiaan, serta keharmonisan dalam keluarga, sekaligus simbol mekarnya nasib baik. Karena estetikanya yang ceria dan romantis, kain ini sangat disukai untuk pesta pernikahan, formal siang hari, dan pakaian kasual modern.'
            },
            {
                name: 'Batik Jlamprang',
                img: 'batik/batik_jlamprang_0032.jpg',
                desc: 'Motif geometris murni yang terinspirasi dari kain tenun sutra Patola India dan seni Islam Timur Tengah yang menghindari penggambaran makhluk hidup. Polanya sangat simetris, terbentuk dari kotak dan titik presisi yang membentuk bintang segi delapan atau bunga teratai. Bintang tersebut melambangkan kompas kosmik, harmoni ilahi antara semesta dan pencipta, sementara kisi-kisinya bermakna ketekunan dan persatuan hidup yang tertib. Populer dipakai pada pertemuan keagamaan, pakaian kasual harian, dan acara formal pesisir.'
            },
            {
                name: 'Batik Tujuh Rupa',
                img: 'batik/batik_tujuh_rupa_0005.jpg',
                desc: 'Sebuah mahakarya pesisir Pekalongan yang memadukan budaya Jawa dengan warisan keramik dan lukisan cat air Tiongkok. Polanya asimetris, sangat padat, menampilkan ekosistem rimbun dari tanaman bunga mekar, merak, burung kecil, dan serangga. Keragaman flora dan fauna ini menyimbolkan kesuburan tanah Nusantara serta kehidupan yang melimpah ruah akan berbagai berkah dan kebahagiaan. Hubungan kupu-kupu dan bunga memancarkan romansa keluarga, sekaligus cerminan jiwa pesisir yang dinamis, adaptif, dan terbuka.'
            }
        ]
    },
    {
        id: 'dayak',
        svgIds: ['KB', 'KT', 'KI', 'KS', 'KU'],
        region: 'Kalimantan',
        motifs: [
            {
                name: 'Batik Dayak',
                img: 'batik/batik_dayak_0007.jpg',
                desc: 'Memiliki akar kuat pada tradisi suku, alam Borneo, dan kepercayaan animisme, menampilkan lengkungan tebal saling mengunci yang meniru Batang Garing (Pohon Kehidupan). Ornamen pelindung seperti tameng, burung Enggang, dan naga mitologi (Aso) bertindak sebagai jimat perlindungan spiritual untuk menolak kekuatan jahat dan kemalangan. Pohon kehidupan melambangkan ikatan ilahi antara dunia atas, manusia, dan dunia bawah, sementara Enggang melambangkan kemuliaan dan kepemimpinan. Dipakai pada ritual adat, festival, hingga pakaian kasual modern.'
            }
        ]
    },
    {
        id: 'betawi',
        svgIds: ['JK'],
        region: 'DKI Jakarta',
        motifs: [
            {
                name: 'Batik Betawi',
                img: 'batik/batik_betawi_0023 (1).jpeg',
                desc: 'Mencerminkan karakteristik masyarakat perkotaan pesisir Jakarta yang dinamis, egaliter, bebas dari aturan ketat keraton, serta berasimilasi dengan budaya Arab, Tionghoa, dan Eropa. Warnanya sangat kontras dan mencolok, menggambarkan flora-fauna lokal, Monas, Ondel-ondel, atau batas tumpal segitiga geometris. Pola ini melambangkan ketahanan, sifat terbuka, dan kemampuan adaptasi yang luar biasa dari suku Betawi, sementara bunga mekar menyimbolkan kesuburan lahan pesisir. Banyak digunakan untuk kedinasan formal, festival budaya, dan pakaian sehari-hari.'
            }
        ]
    }
];