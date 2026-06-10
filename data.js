const celebritiesData = [
  {
    id: 1,
    name: 'Альберт Эйнштейн',
    profession: 'Физик-теоретик',
    birthYear: 1879,
    deathYear: 1955,
    country: 'Германия/США',
    coordinates: [48.1351, 11.582],
    image: 'img/einstein.jpg',
    category: 'Наука',
    quotes: [
      {
        text: 'Воображение важнее знания. Знание ограничено, тогда как воображение охватывает весь мир.',
        themes: ['wisdom', 'motivation', 'success'],
      },
      {
        text: 'Только те, кто предпринимают абсурдные попытки, смогут достичь невозможного.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Жизнь — как вождение велосипеда. Чтобы сохранить равновесие, ты должен двигаться.',
        themes: ['wisdom', 'motivation', 'happiness'],
      },
      {
        text: 'Логика приведет вас из пункта А в пункт Б. Воображение доставит вас куда угодно.',
        themes: ['wisdom', 'motivation', 'success'],
      },
      {
        text: 'Стремитесь не к тому, чтобы добиться успеха, а к тому, чтобы ваша жизнь имела смысл.',
        themes: ['wisdom', 'success', 'happiness'],
      },
    ],
  },
  {
    id: 2,
    name: 'Стив Джобс',
    profession: 'Предприниматель, основатель Apple',
    birthYear: 1955,
    deathYear: 2011,
    country: 'США',
    coordinates: [37.7749, -122.4194],
    image: 'img/jobs.jpg',
    category: 'Бизнес',
    quotes: [
      {
        text: 'Единственный способ делать великую работу — любить то, что делаешь.',
        themes: ['motivation', 'success', 'happiness'],
      },
      {
        text: 'Инновация отличает лидера от последователя.',
        themes: ['success', 'motivation'],
      },
      {
        text: 'Ваше время ограничено, не тратьте его, живя чужой жизнью.',
        themes: ['wisdom', 'motivation', 'happiness'],
      },
      {
        text: 'Будьте эталоном качества. Некоторые люди не привыкли к среде, где совершенство — это норма.',
        themes: ['success', 'motivation'],
      },
      {
        text: "Самое влиятельное изречение в моей жизни: 'Каждый день спрашивай себя: если бы сегодня был последний день моей жизни, хотел бы я делать то, что собираюсь сделать сегодня?'",
        themes: ['wisdom', 'happiness'],
      },
    ],
  },
  {
    id: 3,
    name: 'Махатма Ганди',
    profession: 'Политический и духовный лидер',
    birthYear: 1869,
    deathYear: 1948,
    country: 'Индия',
    coordinates: [22.5726, 88.3639],
    image: 'img/gandhi.jpg',
    category: 'Политика',
    quotes: [
      {
        text: 'Будь тем изменением, которое ты хочешь видеть в мире.',
        themes: ['wisdom', 'motivation'],
      },
      {
        text: 'Счастье — это когда то, что вы думаете, говорите и делаете, пребывает в гармонии.',
        themes: ['happiness', 'wisdom'],
      },
      {
        text: 'Сила не приходит от физической способности. Она приходит от несгибаемой воли.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Глаз за глаз сделает весь мир слепым.',
        themes: ['wisdom', 'love'],
      },
      {
        text: 'Любовь — самая сильная сила, которой обладает мир, и в то же время самая скромная.',
        themes: ['love', 'wisdom'],
      },
    ],
  },
  {
    id: 4,
    name: 'Мария Кюри',
    profession: 'Физик и химик',
    birthYear: 1867,
    deathYear: 1934,
    country: 'Польша/Франция',
    coordinates: [52.2297, 21.0122],
    image: 'img/curie.jpg',
    category: 'Наука',
    quotes: [
      {
        text: 'В жизни ничего не следует бояться, всё следует только понимать.',
        themes: ['wisdom', 'motivation'],
      },
      {
        text: 'Я принадлежу к тем, кто думает, что наука — это великая красота.',
        themes: ['happiness', 'wisdom'],
      },
      {
        text: 'Никогда не считайте, что вы уже достигли всего, и не позволяйте никому убедить вас в этом.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Я узнала, что так же, как и нить, характер сплетается из мелких поступков.',
        themes: ['wisdom', 'success'],
      },
      {
        text: 'Человек никогда не замечает того, что было сделано; он видит только то, что осталось сделать.',
        themes: ['wisdom', 'motivation'],
      },
    ],
  },
  {
    id: 5,
    name: 'Фёдор Достоевский',
    profession: 'Писатель',
    birthYear: 1821,
    deathYear: 1881,
    country: 'Россия',
    coordinates: [55.7558, 37.6173],
    image: 'img/dostoevsky.jpg',
    category: 'Литература',
    quotes: [
      {
        text: 'Счастье не в счастье, а лишь в его достижении.',
        themes: ['happiness', 'motivation'],
      },
      {
        text: 'Красота спасет мир.',
        themes: ['love', 'wisdom'],
      },
      {
        text: 'Надо любить жизнь больше, чем смысл жизни.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Тайна человеческого бытия не в том, чтобы только жить, а в том, для чего жить.',
        themes: ['wisdom', 'motivation'],
      },
      {
        text: 'Любовь столь всесильна, что перерождает и нас самих.',
        themes: ['love', 'happiness'],
      },
    ],
  },
  {
    id: 6,
    name: 'Маргарет Тэтчер',
    profession: 'Премьер-министр Великобритании',
    birthYear: 1925,
    deathYear: 2013,
    country: 'Великобритания',
    coordinates: [51.5074, -0.1278],
    image: 'img/thatcher.jpg',
    category: 'Политика',
    quotes: [
      {
        text: 'Успех — это не то, как высоко вы поднялись, а то, как вы делаете мир лучше.',
        themes: ['success', 'motivation'],
      },
      {
        text: 'Я терпелива, когда дело касается глупости, но не когда дело касается некомпетентности.',
        themes: ['success', 'wisdom'],
      },
      {
        text: 'Победа важна не тогда, когда ты выигрываешь, а когда ты учишься на своих ошибках.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Быть лидером — значит быть способным привести людей оттуда, где они находятся, туда, где они должны быть.',
        themes: ['success', 'motivation'],
      },
      {
        text: 'Дом должен быть центром, но не границей мира женщины.',
        themes: ['wisdom', 'happiness'],
      },
    ],
  },
  {
    id: 7,
    name: 'Никола Тесла',
    profession: 'Изобретатель, инженер',
    birthYear: 1856,
    deathYear: 1943,
    country: 'Сербия/США',
    coordinates: [45.815, 15.9819],
    image: 'img/tesla.jpg',
    category: 'Наука',
    quotes: [
      {
        text: 'Уединение — это секрет изобретательности: именно одиночество рождает гениальное.',
        themes: ['wisdom', 'success'],
      },
      {
        text: 'Наш мир погружен в огромный океан энергии, мы летим в бесконечном пространстве с непостижимой скоростью.',
        themes: ['wisdom'],
      },
      {
        text: 'Действие даже самого маленького существа приводит к изменениям во всей вселенной.',
        themes: ['wisdom', 'motivation'],
      },
      {
        text: 'Наука — это не что иное, как изощренное возвращение к неведению.',
        themes: ['wisdom'],
      },
      {
        text: 'Я не забочусь о том, что они украли мою идею. Я забочусь о том, что у них нет своих.',
        themes: ['success', 'motivation'],
      },
    ],
  },
  {
    id: 8,
    name: 'Уинстон Черчилль',
    profession: 'Премьер-министр Великобритании',
    birthYear: 1874,
    deathYear: 1965,
    country: 'Великобритания',
    coordinates: [51.5074, -0.1278],
    image: 'img/churchill.jpg',
    category: 'Политика',
    quotes: [
      {
        text: 'Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.',
        themes: ['success', 'motivation'],
      },
      {
        text: 'Пессимист видит трудность в каждой возможности; оптимист видит возможность в каждой трудности.',
        themes: ['motivation', 'happiness'],
      },
      {
        text: 'Никогда, никогда, никогда не сдавайтесь.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Цена величия — ответственность.',
        themes: ['wisdom', 'success'],
      },
      {
        text: 'Историю пишут победители.',
        themes: ['wisdom'],
      },
    ],
  },
  {
    id: 9,
    name: 'Фрида Кало',
    profession: 'Художница',
    birthYear: 1907,
    deathYear: 1954,
    country: 'Мексика',
    coordinates: [19.4326, -99.1332],
    image: 'img/kahlo.jpg',
    category: 'Искусство',
    quotes: [
      {
        text: 'Ноги, зачем они мне, если у меня есть крылья, чтобы летать?',
        themes: ['motivation', 'happiness'],
      },
      {
        text: 'Я пишу себя, потому что я часто бываю одна и потому что я - тема, которую я знаю лучше всего.',
        themes: ['wisdom'],
      },
      {
        text: 'Попытайся сделать невозможное, чтобы узнать свои возможности.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Любовь — это ключ ко всем тайнам.',
        themes: ['love', 'wisdom'],
      },
      {
        text: 'Дерево, надеюсь, у меня достаточно сил, чтобы однажды с радостью сесть под твою тень.',
        themes: ['happiness', 'love'],
      },
    ],
  },
  {
    id: 10,
    name: 'Конфуций',
    profession: 'Философ',
    birthYear: 551,
    deathYear: 479,
    country: 'Китай',
    coordinates: [35.8617, 104.1954],
    image: 'img/confucius.jpg',
    category: 'Философия',
    quotes: [
      {
        text: 'Выберите себе работу по душе, и вам не придется работать ни дня в своей жизни.',
        themes: ['happiness', 'success', 'motivation'],
      },
      {
        text: 'Счастье — это когда тебя понимают, большое счастье — это когда тебя любят, настоящее счастье — это когда любишь ты.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Не важно, как медленно ты идешь, пока ты не останавливаешься.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Тот, кто повторяет старое и узнает новое, может быть лидером.',
        themes: ['wisdom', 'success'],
      },
      {
        text: 'Где бы ты ни был — делай всё от души.',
        themes: ['motivation', 'happiness'],
      },
    ],
  },
  {
    id: 11,
    name: 'Лев Толстой',
    profession: 'Писатель',
    birthYear: 1828,
    deathYear: 1910,
    country: 'Россия',
    coordinates: [54.1961, 37.6182],
    image: 'img/tolstoy.jpg',
    category: 'Литература',
    quotes: [
      {
        text: 'Счастлив тот, кто счастлив у себя дома.',
        themes: ['happiness', 'love'],
      },
      {
        text: 'Думай хорошо, и мысли созреют в добрые поступки.',
        themes: ['wisdom', 'motivation'],
      },
      {
        text: 'Любовь есть жизнь.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Чтобы жить честно, надо рваться, путаться, биться, ошибаться, начинать и бросать.',
        themes: ['wisdom', 'motivation'],
      },
    ],
  },
  {
    id: 12,
    name: 'Аристотель',
    profession: 'Философ',
    birthYear: 384,
    deathYear: 322,
    country: 'Древняя Греция',
    coordinates: [40.6401, 22.9444],
    image: 'img/aristotle.jpg',
    category: 'Философия',
    quotes: [
      {
        text: 'Мы есть то, что мы постоянно делаем. Совершенство, следовательно, не действие, а привычка.',
        themes: ['wisdom', 'motivation', 'success'],
      },
      {
        text: 'Корень учения горек, но плоды его сладки.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Ум заключается не только в знании, но и в умении прилагать знание на деле.',
        themes: ['wisdom', 'success'],
      },
      {
        text: 'Лучше в совершенстве выполнить небольшую часть дела, чем сделать плохо в десять раз больше.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Любовь — это то, что объединяет душу и тело.',
        themes: ['love', 'wisdom'],
      },
    ],
  },
  {
    id: 13,
    name: 'Коко Шанель',
    profession: 'Модельер',
    birthYear: 1883,
    deathYear: 1971,
    country: 'Франция',
    coordinates: [48.8566, 2.3522],
    image: 'img/chanel.jpg',
    category: 'Бизнес',
    quotes: [
      {
        text: 'Чтобы быть незаменимой, нужно всегда быть разной.',
        themes: ['success', 'motivation'],
      },
      {
        text: 'Самое лучшее в жизни — быть свободным. Самое худшее — потерять эту свободу.',
        themes: ['happiness', 'wisdom'],
      },
      {
        text: 'Заботясь о красоте, надо начинать с сердца и души.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Роскошь — это когда внутреннее содержание соответствует внешнему.',
        themes: ['wisdom', 'happiness'],
      },
      {
        text: 'Успех часто достигается теми, кто не знает о неизбежности неудачи.',
        themes: ['success', 'motivation'],
      },
    ],
  },
  {
    id: 14,
    name: 'Мать Тереза',
    profession: 'Монахиня, миссионерка',
    birthYear: 1910,
    deathYear: 1997,
    country: 'Индия',
    coordinates: [22.5726, 88.3639],
    image: 'img/teresa.jpg',
    category: 'Философия',
    quotes: [
      {
        text: 'Мы не можем делать великие дела. Только маленькие дела с великой любовью.',
        themes: ['love', 'motivation'],
      },
      {
        text: 'Если вы судите людей, у вас не остается времени, чтобы любить их.',
        themes: ['love', 'wisdom'],
      },
      {
        text: 'Бедность — это отсутствие любви.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Не все могут делать великие вещи. Но мы можем делать маленькие вещи с великой любовью.',
        themes: ['love', 'motivation'],
      },
      {
        text: 'В этом мире мы не можем сделать больших дел. Мы можем делать только маленькие дела, но с большой любовью.',
        themes: ['love', 'happiness'],
      },
    ],
  },
  {
    id: 15,
    name: 'Вольфганг Амадей Моцарт',
    profession: 'Композитор',
    birthYear: 1756,
    deathYear: 1791,
    country: 'Австрия',
    coordinates: [47.8095, 13.055],
    image: 'img/mozart.jpg',
    category: 'Искусство',
    quotes: [
      {
        text: 'Музыка даже в самых ужасных драматических ситуациях должна всегда пленять слух, всегда оставаться музыкой.',
        themes: ['wisdom'],
      },
      {
        text: 'Ни высокий интеллект, ни воображение не могут породить гения. Любовь, любовь, любовь — вот душа гения.',
        themes: ['love', 'wisdom'],
      },
      {
        text: 'Между мной и моей музыкой я выбираю музыку.',
        themes: ['happiness', 'love'],
      },
      {
        text: 'Чтобы заслужить аплодисменты, нужно писать вещи настолько понятные, что любой извозчик мог бы напеть их.',
        themes: ['success', 'wisdom'],
      },
      {
        text: 'Счастье — это когда ты можешь заниматься тем, что любишь.',
        themes: ['happiness', 'motivation'],
      },
    ],
  },
  {
    id: 16,
    name: 'Оскар Уайльд',
    profession: 'Писатель',
    birthYear: 1854,
    deathYear: 1900,
    country: 'Ирландия',
    coordinates: [53.3498, -6.2603],
    image: 'img/wilde.jpg',
    category: 'Литература',
    quotes: [
      {
        text: 'Любить себя — это начало романа длиною в жизнь.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Будь собой, все остальные роли уже заняты.',
        themes: ['motivation', 'happiness'],
      },
      {
        text: 'Жизнь — это самая редкая вещь на свете. Большинство людей просто существуют.',
        themes: ['wisdom', 'motivation'],
      },
      {
        text: 'Нужно всегда быть влюбленным. Вот почему никогда не стоит жениться.',
        themes: ['love'],
      },
      {
        text: 'Успех — это наука: если у тебя есть условия, ты получишь результат.',
        themes: ['success', 'wisdom'],
      },
    ],
  },
  {
    id: 17,
    name: 'Виктор Гюго',
    profession: 'Писатель',
    birthYear: 1802,
    deathYear: 1885,
    country: 'Франция',
    coordinates: [48.8566, 2.3522],
    image: 'img/hugo.jpg',
    category: 'Литература',
    quotes: [
      {
        text: 'В жизни есть лишь одно счастье — любить и быть любимым.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Будущее — это сердце, а не разум.',
        themes: ['wisdom', 'love'],
      },
      {
        text: 'Величайшее счастье в жизни — это уверенность, что тебя любят.',
        themes: ['love', 'happiness'],
      },
      {
        text: 'Смеяться над умными людьми — привилегия дураков.',
        themes: ['wisdom'],
      },
      {
        text: 'Музыка выражает то, что нельзя сказать, но о чем невозможно молчать.',
        themes: ['wisdom', 'love'],
      },
    ],
  },
  {
    id: 18,
    name: 'Марк Твен',
    profession: 'Писатель',
    birthYear: 1835,
    deathYear: 1910,
    country: 'США',
    coordinates: [38.627, -90.1994],
    image: 'img/twain.jpg',
    category: 'Литература',
    quotes: [
      {
        text: 'Секрет успеха в том, чтобы начать.',
        themes: ['success', 'motivation'],
      },
      {
        text: 'Через 20 лет вы будете больше сожалеть о том, чего не сделали, чем о том, что сделали.',
        themes: ['motivation', 'happiness'],
      },
      {
        text: 'Любовь — это не то, что вы находите. Любовь — это то, что находит вас.',
        themes: ['love'],
      },
      {
        text: 'Держитесь подальше от людей, которые пытаются принизить ваши амбиции.',
        themes: ['motivation', 'success'],
      },
      {
        text: 'Самый лучший способ поднять себе настроение — поднять его кому-то другому.',
        themes: ['happiness', 'love'],
      },
    ],
  },
];

const themeTranslations = {
  motivation: 'Мотивация',
  love: 'Любовь',
  wisdom: 'Мудрость',
  happiness: 'Счастье',
  success: 'Успех',
};

const themeIcons = {
  motivation: '💪',
  love: '❤️',
  wisdom: '🧠',
  happiness: '😊',
  success: '🌟',
};
