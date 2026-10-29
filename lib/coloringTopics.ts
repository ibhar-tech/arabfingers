import { animalsData, fruitsVegData, transportData, solarData, ramadanData, seaData, bodyPartsData, seasonsData } from "./worksheets";

import { coloringShapes } from "./coloringShapes";

export type ColoringPicture = { id: string; en: string; ar: string; shape: string };

export const coloringTopics = [
  { id: "letters", en: "Arabic letters", ar: "الحروف العربية", icon: "أ", pictures: [] as ColoringPicture[] },
  { id: "animals", en: "Animals", ar: "الحيوانات", icon: "🦁", pictures: animalsData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "fruit", en: "Fruit & vegetables", ar: "فواكه وخضروات", icon: "🍓", pictures: fruitsVegData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "transport", en: "Vehicles", ar: "المواصلات", icon: "🚗", pictures: transportData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "space", en: "Space", ar: "الفضاء", icon: "🚀", pictures: solarData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "sea", en: "Under the sea", ar: "عالم البحار", icon: "🐳", pictures: seaData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "ramadan", en: "Ramadan & Eid", ar: "رمضان والعيد", icon: "🌙", pictures: ramadanData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "body", en: "My body", ar: "جسمي", icon: "✋", pictures: bodyPartsData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "seasons", en: "Seasons", ar: "الفصول", icon: "🌳", pictures: seasonsData.map(picture => ({ ...picture, id: picture.shape })) },
  { id: "shapes", en: "Shapes", ar: "الأشكال", icon: "⭐", pictures: [
    { id: "heart", shape: "heart", en: "Heart", ar: "قلب" },
    { id: "droplet", shape: "droplet", en: "Water drop", ar: "قطرة ماء" },
    { id: "leaf", shape: "leaf", en: "Leaf", ar: "ورقة شجر" },
    { id: "circle", shape: "circle", en: "Circle", ar: "دائرة" },
    { id: "diamond", shape: "diamond", en: "Diamond", ar: "معيّن" },
    { id: "star", shape: "star", en: "Star", ar: "نجمة" },
  ] },
];

export function coloringSvg(shape: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="600" height="600" fill="none" stroke="#344b5a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${coloringShapes[shape]}</svg>`;
}
