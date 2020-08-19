const db = require('./index.js');
const Translations = require('./Translations.js');

// ::::: Mock Data Generation :::::

// Mock Data Generator

let signs = ['Nope', '2hr_st', 'no_parking', 'zonal_parking' ,'load_unload']

let SPsigns = ['Nope', '2 horas de estacionamiento solamente', 'No estacionar', 'Solo estacionamiento para residentes locales', 'cargar y descargar solamente'];
let FRsigns = ['Nope', '2 heures de stationnement seulement', 'Stationnement interdit', 'Uniquement le stationnement des résidents locaux', 'charger et décharger uniquement'];
let JPsigns = ['Nope','2時間駐車のみ', '駐車禁止', '地域住民専用駐車場', 'ロードおよびアンロードのみ'];
let KRsigns = ['Nope', '2 시간 주차', '주차 금지', '지역 주민 전용 주차장', '로드 및 언로드 만'];

const generateMockData = (number) => {
  const mockData = {};
  mockData.language = 'JP';
  mockData.trnaslationID = number;
  mockData.sign = signs[number];
  mockData.translation = JPsigns[number];
  return mockData;
};

// Seeding Function
const insertMockData = (mockData) => {
  Translations.create(mockData)
    .catch((err) => console.log('Error: Mock Data Seeding Failed', err));
};

// Seed Mock Data

for (let i = 1; i <= 4; i++) {
  insertMockData(generateMockData(i));
  console.log('Seeding successful')
}

module.exports = generateMockData;
