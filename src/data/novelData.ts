import { DramaticScene, QuizQuestion, ProverbPair } from '../types';

export const DRAMATIC_SCENES: DramaticScene[] = [
  {
    id: 'scene-1',
    title: 'Akasining Qilmishi va Onaning Faryodi',
    subtitle: 'Oilaviy halokat va yurakni larzaga soluvchi sarzanish',
    imageSrc: '/src/assets/images/sahna_ona_aka_ziddiyat_1791286836805.jpg',
    description: "Kitobdagi eng ta'sirchan va dahshatli sahnalardan biri: oilada boylik, behayo tamagirlik va ma'naviy inqiroz girdobiga tushgan to'ng'ich o'g'ilning jinoyati fosh bo'ladi. Onaning sabr kosasi to'lib, o'z jigarbandiga alam, ko'z yosh va nafrat bilan baqirgan, faryod chekkan onlar.",
    bookExcerpt: "\"Ko'zlaringga qara! Nimalar qilib qo'yding, nodon?! Biz sen uchun yashamaganmidik? Butun uyimizni, nomusimizni yer bilan bitta qilding-ku! Nega bunday qilding?! Axir sening peshonangga qashshoqlik yozilganmidi yoki och edingmi?! Harom boylik ortidan quvib, o'zingni ham, singillaringni ham xor qilding-ku!..\"",
    moralLesson: "Mol-dunyo ortidan ko'r-ko'rona quvish insoniylik qiyofasini yo'qotadi. Ota-onaning e'tiborsizligi va noto'g'ri tarbiyasi eng yaqin insonlar o'rtasida tuzalmas yaralar va nadomat keltirib chiqaradi."
  },
  {
    id: 'scene-wheelchair',
    title: "Katta Akasining Aravada O'tirgani",
    subtitle: "Taqdir sinovi: Katta akasi aravada o'tirib, mungli termulgan onlar",
    imageSrc: '/src/assets/images/sahna_aka_aravada_1791346896673.jpg',
    description: "Kitobdagi eng iztirobli fojialardan biri: oilaviy to'qnashuvlar va qilmishlar ortidan katta akasining aravada (nogironlik aravachasida) o'tirib qolgani. Deraza yonida o'tirib, o'tgan kunlar va bevaqt so'ngan yoshligiga chuqur nadomat bilan boqayotgan akasining mungli ko'zlari tasviri.",
    bookExcerpt: "\"Katta akasi deraza oldida, aravada jimgina o'tirardi. Uning aravachasi go'yo oilaning singan umidlari ustida to'xtab qolgandek edi. Nigora uning oldiga kelib, yelkasidan mehr bilan quchdi. Akasi ko'z yoshlarini tiyolmay shivirladi: 'Qaniydi o'sha xatolarni qilmaganimda edi... Qaniydi hamma narsani orqaga qaytarib bo'lsa edi...' Uning mungli ko'zlarida kechikkan nadomat olovi yonardi.\"",
    moralLesson: "Sog'lik, erkinlik va oila mehr-oqibati har qanday boylikdan ustundir. Nojo'ya qadamlar insonni aravaga mixlab, butun umrlik pushaymonga mubtalo qilishi mumkin."
  },
  {
    id: 'scene-2',
    title: "Mungli Ko'zlar — Mehrga Zor Bolalar Nigohi",
    subtitle: 'Hashamat ichidagi yolg\'izlik va singan umidlar',
    imageSrc: '/src/assets/images/mungli_kozlar_hero_1791286822170.jpg',
    description: "Zafar, Nigora va kenja ukalarining bevaqt ulg'aygan, ma'sum qalblari. Ota-ona mashina, koshona, mansab deb bir-biri bilan urushib, oxir-oqibat ajrashib ketgach, ularning ko'zlarida qolgan mangu mung va qayg'u ifodasi.",
    bookExcerpt: "\"Ular hali bolalikning shirin onlaridan bahramand bo'lishga ham ulgurmagan edilar. Quloqlari ostida ota-onasining tinimsiz talashuvlari, tilla taqinchoqlar va gilamlar ustidagi g'azabli janjallar jaranglardi. Nigora akasining yelkasiga bosh qo'yib jimgina yig'lardi: 'Aka, bizga hech narsa kerak emas, faqat dadam bilan oyim janjallashmasin...' Ammo bu mungli ko'zlarni eshitadigan quloq qolmagandi.\"",
    moralLesson: "Bolaga eng zarur narsa tilla taxt emas, balki oiladagi mehr, o'zaro hurmat va tinch-totuvlikdir."
  },
  {
    id: 'scene-3',
    title: 'Hikmat va Axloq Mezoni',
    subtitle: "Turkiy Guliston va asardagi ma'naviy tarbiya saboqlari",
    imageSrc: '/src/assets/images/sahna_kitob_hikmat_1791286860564.jpg',
    description: "Abdulla Avloniy ta'kidlaganidek: 'Tarbiya biz uchun yo hayot — yo mamot, yo najot — yo halokat, yo saodat — yo falokat masalasidir'. Ushbu qadriyatlar kitobi yosh avlodni tubanlikdan saqlab qoluvchi birdan-bir mayoqdir.",
    bookExcerpt: "\"Diyonat, or-nomus va qanoat yo'q joyda kazzoblik, buxl va shaqovat ildiz otadi. Oltin bilan to'ldirilgan sandiq emas, balki ilm va pok axloq bilan bezatilgan qalb saodat keltiradi.\"",
    moralLesson: "Har bir o'quvchi kitobdan ibrat olib, o'z hayotida niyat pokligi va qanoat fazilatini ustun qo'yishi shart."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: "\"Mungli ko'zlar\" romanining bosh g'oyasi nima haqida?",
    context: "Xudoyberdi To'xtaboyevning ushbu mashhur dramatik asari jamiyatdagi og'riqli muammolarni ko'rsatadi.",
    options: [
      "Boylik va mol-dunyoga hirs qo'yish oilani barbod qilishi va bolalar taqdiriga zomin bo'lishi",
      "Sayohatlar va yangi mamlakatlarni kashf etish qiziqishlari",
      "Katta shahar hayotidagi texnik yangiliklar",
      "Faqat maktab o'quvchilarining darsdagi baholari"
    ],
    correctAnswerIndex: 0,
    explanation: "Asarda moddiy boylik ketidan quvib, ma'naviyatni unutgan oilaning halokati va bundan eng ko'p jabr ko'rgan ma'sum bolalar fojiasi ochib beriladi.",
    points: 20,
    category: 'asar_mazmuni'
  },
  {
    id: 'q-2',
    question: "Asardagi eng keskin va dramatik sahna nima bilan bog'liq?",
    context: "Onaning akasiga alam bilan baqirishi va oiladagi fojiaviy to'qnashuv.",
    options: [
      "Do'stlar bilan futbol o'yinidagi janjal",
      "Akasining jinoyati, xiyonati va qilmishlari fosh bo'lib, onaning yurakni teshuvchi faryodi va sarzanishi",
      "Imtihondan yiqilib qaytishi",
      "Yozgi ta'tilda qishloqqa ketish masalasi"
    ],
    correctAnswerIndex: 1,
    explanation: "Kitobdagi eng kuchli ruhiy lahza – onaning to'ng'ich o'g'ilning egri yo'lga kirib, oila sha'nini barbod qilganini ko'rib, nafrat va alam bilan baqirib faryod urishidir.",
    points: 25,
    category: 'fojia_sababi'
  },
  {
    id: 'q-3',
    question: "\"Mungli ko'zlar\" iborasi asarda qanday ma'noni ifodalaydi?",
    context: "Asar nomi bevosita qahramonlar ruhiyatiga ishora qiladi.",
    options: [
      "Ko'zoynak taqib yuradigan a'lochi o'quvchilarni",
      "Ota-ona mehridan mahrum bo'lib, kattalarning xatolari tufayli g'am-alam chekkan bolalar nigohini",
      "Ko'zlari charchagan shifokorlarni",
      "Uzoq safarga ketgan yo'lovchilarni"
    ],
    correctAnswerIndex: 1,
    explanation: "Ota-onaning ajralishi, janjallari va jinoyatlari natijasida sarson qolgan farzandlarning ko'zlaridagi mangu dard va g'am 'mungli ko'zlar' deb nomlangan.",
    points: 20,
    category: 'qahramonlar'
  },
  {
    id: 'q-4',
    question: "Lug'atdagi 'Nadomat' so'zi qanday ma'noni bildiradi?",
    context: "Kitobdagi fojia qahramonlarining kechikkan holati bilan bog'liq so'z.",
    options: [
      "Xursandchilik va shodlik",
      "Pushaymon qilish, qattiq afsuslanish",
      "Katta to'y va bayram",
      "Chiroyli kiyim kiyish"
    ],
    correctAnswerIndex: 1,
    explanation: "Lug'at bo'yicha 'Nadomat' – pushaymon qilish, afsuslanish ma'nosini anglatadi. Asardagi barcha xatolarning oqibati kechikkan nadomatdir.",
    points: 15,
    category: 'lugat_hikmat'
  },
  {
    id: 'q-5',
    question: "Zafar va Nigoraning ota-onasi o'rtasidagi kelishmovchiliklarning asl ildizi nimada edi?",
    context: "Oiladagi ma'naviy muhit buzilishi.",
    options: [
      "Moddiy manfaatlar, tilla, xorijiy mollar va noqonuniy yo'llar bilan boyish hirsi",
      "Qaysi kitobni ko'proq o'qish haqidagi ilmiy bahs",
      "Hovlidagi daraxtlarni kesish-kesmaslik mojarosi",
      "Qo'shnilar bilan salomlashish tartibi"
    ],
    correctAnswerIndex: 0,
    explanation: "Otaning nohalol boylik ortidan quvishi, onaning esa bu hashamatga ko'r-ko'rona berilishi oilaning mehr rishtalarini uzib yubordi.",
    points: 20,
    category: 'fojia_sababi'
  },
  {
    id: 'q-6',
    question: "Lug'atdagi 'Zohirparast' so'zi kimlarga nisbatan ishlatiladi?",
    context: "Asarda insonlarning faqat kiyim-kechagi va boyligiga qarab baho beruvchi kimsalar.",
    options: [
      "Faqat ichki dunyoni o'rganadigan donishmandlarga",
      "Ishga yuzaki qarovchi, narsalarning faqat tashqi tomoniga, yaltiroqligiga e'tibor beruvchi kishiga",
      "Bog'bonlarga va dehqonlarga",
      "Kechasi uxlamay ishlaydiganlarga"
    ],
    correctAnswerIndex: 1,
    explanation: "Zohirparast – bu ishga yuzaki qarash, bir narsaning mohiyatini tushunmay faqat tashqi ko'rinishiga mahliyo bo'luvchi kishidir.",
    points: 15,
    category: 'lugat_hikmat'
  },
  {
    id: 'q-7',
    question: "Asar qahramoni Zafarning qilmishlariga onasi qanday munosabat bildirdi?",
    context: "Tarixiy keskin suhbat paytida.",
    options: [
      "Uni maqtadi va yangi sovg'alar berdi",
      "Hech narsa bo'lmagandek beparvo bo'ldi",
      "Yuragi ezilib, joni halqumiga kelib sarzanish qildi va bor alamini sochildi",
      "Uni sayohatga yubordi"
    ],
    correctAnswerIndex: 2,
    explanation: "Ona o'z bolasining bunday tuban qilmishlarini eshitib dahshatga tushdi va yurak-bag'ri ezilib qattiq baqirdi, sarzanish qildi.",
    points: 20,
    category: 'asar_mazmuni'
  },
  {
    id: 'q-8',
    question: "Lug'atda 'Ummul xabois' iborasi qanday izohlangan?",
    context: "Axloqiy manbalarda yomon illatlarning ildizi haqidagi muhim atama.",
    options: [
      "Eng yaxshi fazilatlar to'plami",
      "Yomonliklarning onasi (barcha illatlarning bosh manbai)",
      "Baland tog' cho'qqisi",
      "Ota-onaga yaxshilik qilish"
    ],
    correctAnswerIndex: 1,
    explanation: "'Ummul xabois' – yomonliklarning onasi, barcha buzuqlik va gunohlarning boshlang'ich manbaidir.",
    points: 15,
    category: 'lugat_hikmat'
  },
  {
    id: 'q-9',
    question: "Nigora obrazi orqali muallif qanday xarakterni gavdalantiradi?",
    context: "Zafarning singlisi Nigora ruhiyati.",
    options: [
      "Beparvo va kibrli qizcha",
      "Beg'ubor, qalbida mehrga tashna, ota-onasining janjallaridan ezilgan mushtipar qizcha",
      "Faqat pul sanaydigan tijoratchi",
      "Maktabni tashlab ketgan sho'x bola"
    ],
    correctAnswerIndex: 1,
    explanation: "Nigora – oiladagi janjallar, adolatsizlik va mehrsizlikdan eng qattiq ozor chekkan, mungli nigohli qizaloqdir.",
    points: 20,
    category: 'qahramonlar'
  },
  {
    id: 'q-10',
    question: "Lug'atdagi 'Shikasta' so'zi nimani anglatadi?",
    context: "'Mungli ko'zlar' asaridagi ko'ngillar holatini tavsiflashda qo'llaniladi.",
    options: [
      "Mustahkam devor",
      "Siniq, ko'ngli ozor topgan, yaralangan",
      "Juda tez yuguruvchi",
      "Yangi tikilgan kiyim"
    ],
    correctAnswerIndex: 1,
    explanation: "Shikasta – siniq, ko'ngli ozor topgan ma'nosidadir. Bolalarning shikasta dili hech qanday oltin bilan tuzalmaydi.",
    points: 15,
    category: 'lugat_hikmat'
  },
  {
    id: 'q-11',
    question: "Xudoyberdi To'xtaboyevning \"Mungli ko'zlar\" asaridagi eng muhim ibrat nima?",
    context: "O'quvchi bu kitobni o'qib qanday xulosaga kelishi kerak?",
    options: [
      "Qancha ko'p nohalol pul topsang, shuncha yaxshi",
      "Oila birdamligi, halollik va mehr eng buyuk boylikdir; nohalol dunyo faqat halokatga boshlaydi",
      "Bolalarga faqat qimmatbaho kiyimlar kerak",
      "Ota-ona farzand tarbiyasiga aralashmasligi kerak"
    ],
    correctAnswerIndex: 1,
    explanation: "Asar har bir insonni halol yashashga, oilaviy mehr-oqibatni moddiy boylikdan ustun qo'yishga chorlaydi.",
    points: 25,
    category: 'asar_mazmuni'
  },
  {
    id: 'q-12',
    question: "Lug'atdagi 'Fatonat' so'zining ma'nosi qaysi javobda to'g'ri berilgan?",
    context: "Zehn va aqlga oid ijobiy fazilat.",
    options: [
      "O'tkir zehn, ziyraklik, tez fahmlilik",
      "Dangasalik va uyquchilik",
      "Qo'rquv va sarosima",
      "Birovning gapini poylash"
    ],
    correctAnswerIndex: 0,
    explanation: "Fatonat – o'tkir zehn, ziyraklik va voqealarni tezda idrok eta olish qobiliyatidir.",
    points: 15,
    category: 'lugat_hikmat'
  },
  {
    id: 'q-13',
    question: "Asarda katta akasining aravada (nogironlar aravachasida) o'tirib qolishi qanday fojiani aks ettiradi?",
    context: "Katta akasining aravada derazaga termulib, pushaymon bo'lgan sahnasi.",
    options: [
      "Nojo'ya qilmishlar, fojiali oqibatlar va bevaqt so'ngan yoshlikning kechikkan nadomatini",
      "Yozgi lagerdagi yangi sport mashg'ulotini",
      "Maktabdagi dars qoldirish bahonasini",
      "Tengdoshlari bilan velosiped poygasiga tayyorgarlikni"
    ],
    correctAnswerIndex: 0,
    explanation: "Katta akasining aravada o'tirib qolishi — xatolarning og'ir va tuzalmas asorati, mol-dunyo ortidan quvish qanday ayanchli jismoniy va ruhiy fojiaga olib kelishining ramzidir.",
    points: 25,
    category: 'fojia_sababi'
  }
];

export const PROVERB_PAIRS: ProverbPair[] = [
  {
    id: 'p-1',
    firstPart: "Boylik qo'lning kiri...",
    secondPart: "...ammo mehr qalbning nuridir.",
    meaning: "Moddiy boylik bugun bor, ertaga yo'q, lekin insoniy mehr va oqibat abadiydir.",
    theme: 'Mehr va boylik'
  },
  {
    id: 'p-2',
    firstPart: "Ota xazinasi mol-dunyo emas...",
    secondPart: "...balki tarbiya va or-nomusdir.",
    meaning: "Farzandga qoldiriladigan eng buyuk meros boylik emas, axloqiy fazilatdir.",
    theme: 'Tarbiya'
  },
  {
    id: 'p-3',
    firstPart: "Farzand ko'zida mung bo'lsa...",
    secondPart: "...uyda oltin sochilsa ham zulmatdir.",
    meaning: "Bolaning ko'z yoshi va g'ami bor joyda hech qanday hashamat baxt keltirmaydi.",
    theme: 'Farzand baxti'
  },
  {
    id: 'p-4',
    firstPart: "Halol mehnat bilan topilgan qora non...",
    secondPart: "...harom topilgan shirin xurmodan afzaldir.",
    meaning: "Halollik vijdonga xotirjamlik beradi, nohalol yo'l esa fojia sari elitadi.",
    theme: 'Halollik'
  },
  {
    id: 'p-5',
    firstPart: "Nadomat toshi og'ir bo'lar...",
    secondPart: "...vaqti o'tib qilingan pushaymonda.",
    meaning: "Bevafo va buzuq ishlarning oqibati kechikkan alamli pushaymondir.",
    theme: 'Nadomat'
  },
  {
    id: 'p-6',
    firstPart: "Diyonat yo'qolgan joyda...",
    secondPart: "...oilaning ustuni qulaydi.",
    meaning: "Soflik va ishonch barham topsa, oila mustahkamligi parchalanadi.",
    theme: 'Diyonat'
  },
  {
    id: 'p-7',
    firstPart: "Zohirparast kishi libosga aldanar...",
    secondPart: "...dono kishi qalb go'zalligiga qarar.",
    meaning: "Tashqi yaltiroqlik mohiyat emas, qalb tozaligi haqiqiy boylikdir.",
    theme: 'Haqiqat'
  },
  {
    id: 'p-8',
    firstPart: "Ummul xabois — hirs va nafs...",
    secondPart: "...qanoat esa saodat kalitidir.",
    meaning: "Ochko'zlik barcha yomonliklarning onasi, yetarlisiga shukr qilish esa najotdir.",
    theme: 'Qanoat'
  }
];
