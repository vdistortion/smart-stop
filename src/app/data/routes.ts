export interface IRoute {
  number: number | string;
  type: string;
  route: string;
  time: number;
}

export interface IRouteDetail {
  name: string;
  active?: boolean;
}

export const routeList: IRoute[] = [
  {
    number: 8,
    type: 'trol',
    route: 'пкио им. гагарина — чкпз',
    time: 2,
  },
  {
    number: 10,
    type: 'trol',
    route: 'ул. молдавская — солнечный берег',
    time: 3,
  },
  {
    number: 4,
    type: 'bus',
    route: 'ул. мамина — юургу',
    time: 5,
  },
  {
    number: 26,
    type: 'trol',
    route: 'ул. молдавская — пос. первоозерный',
    time: 7,
  },
  {
    number: 2,
    type: 'bus',
    route: 'юургу — мехколонна',
    time: 10,
  },
  {
    number: 19,
    type: 'trol',
    route: 'пкио им. гагарина — пос. первоозерный — тэц №3',
    time: 12,
  },
  {
    number: 14,
    type: 'bus',
    route: 'ж/д вокзал — пос. новосинеглазово',
    time: 15,
  },
  {
    number: 17,
    type: 'trol',
    route: 'ул. молдавская — ж/д вокзал',
    time: 20,
  },
  {
    number: 18,
    type: 'bus',
    route: 'автобусный парк — ж/д вокзал',
    time: 25,
  },
  {
    number: 83,
    type: 'bus',
    route: 'юургу — пос. старокамышинск',
    time: 30,
  },
  {
    number: '90c',
    type: 'bus',
    route: 'ж/д вокзал — сад "кристалл"',
    time: 34,
  },
  {
    number: 2,
    type: 'trol',
    route: 'чтз — пкио им. гагарина',
    time: 0,
  },
  {
    number: 16,
    type: 'trol',
    route: 'амз — жби',
    time: 0,
  },
];

export const routeDetail: IRouteDetail[] = [
  {
    name: 'ул. Молдавская',
  },
  {
    name: '8-й Микрорайон',
  },
  {
    name: 'ул. Солнечная',
  },
  {
    name: 'ул. Ворошилова',
  },
  {
    name: 'ТК "Комсомольский"',
  },
  {
    name: 'Гостиница "Виктория"',
  },
  {
    name: 'пр. Победы',
  },
  {
    name: 'Педучилище',
  },
  {
    name: 'ул. Братьев Кашириных',
  },
  {
    name: 'Каширинский рынок',
  },
  {
    name: 'пос. Бабушкина',
  },
  {
    name: 'ул. Чайковского',
  },
  {
    name: 'ул. Северо-Крымская',
  },
  {
    name: 'ТРК "Родник"',
  },
  {
    name: 'Зоопарк',
  },
  {
    name: 'Многофункциональный центр',
  },
  {
    name: 'ул. Труда',
  },
  {
    name: 'Агроуниверситет',
  },
  {
    name: 'Алое поле',
  },
  {
    name: 'Публичная Библиотека',
  },
  {
    name: 'пл. Революции',
    active: true,
  },
  {
    name: 'Магазин "Детский мир"',
  },
  {
    name: 'ул. Плеханова',
  },
  {
    name: 'ул. Евтеева',
  },
  {
    name: 'Институт путей сообщения',
  },
  {
    name: 'пл. Привокзальная',
  },
];
