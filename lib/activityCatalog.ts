import { worksheetSets } from "@/lib/worksheets";
import { stories } from "@/lib/stories";

export type ActivityKind = "worksheets" | "games" | "stories" | "science";
export type LearningActivity = {
  href: string;
  kind: ActivityKind;
  title: string;
  description: string;
  searchText: string;
  ages: [number, number];
  detail: string;
  artwork: string;
  preview?: string;
};

function ageRange(label: string): [number, number] {
  const ages = label.match(/\d+/g)?.map(Number);
  return ages?.length === 2 ? [ages[0], ages[1]] : [3, 8];
}

export function getActivityCatalog(locale: string): LearningActivity[] {
  const ar = locale === "ar";
  const worksheets: LearningActivity[] = worksheetSets.map((pack) => ({
    href: `/printables/${pack.id}`, kind: "worksheets",
    title: ar ? pack.titleAr : pack.titleEn,
    description: ar ? pack.descAr : pack.descEn,
    searchText: `${pack.titleAr} ${pack.titleEn} ${pack.descAr} ${pack.descEn}`,
    ages: ageRange(pack.ageEn),
    detail: `${pack.pages.toLocaleString(ar ? "ar-u-nu-latn" : "en")} ${ar ? "صفحة · PDF" : "pages · PDF"}`,
    artwork: pack.emoji, preview: `/printables/previews/${pack.id}.png`,
  }));
  const storyActivities: LearningActivity[] = stories.map((story) => ({
    href: `/stories/${story.slug}`, kind: "stories",
    title: ar ? story.titleAr : story.titleEn,
    description: ar ? story.introAr : story.introEn,
    searchText: `${story.titleAr} ${story.titleEn} ${story.introAr} ${story.introEn}`,
    ages: ageRange(story.agesEn), detail: ar ? story.minutesAr : story.minutesEn,
    artwork: story.emoji,
  }));
  const interactives = [
    { href: "/games/count", kind: "games", en: "Count & discover", ar: "عُدّ واكتشف", descEn: "Count the fruit and match Arabic numerals from 1 to 10.", descAr: "عُدّ الفاكهة واختر الرقم المناسب من 1 إلى 10.", artwork: "1 2 3", ages: [3, 6] },
    { href: "/games/trace", kind: "games", en: "Trace the letters", ar: "تتبّع الحروف", descEn: "Follow each Arabic letter with a finger or a pencil on screen.", descAr: "اتبع شكل كل حرف عربي بإصبعك أو بالقلم على الشاشة.", artwork: "ب", ages: [4, 7] },
    { href: "/games/tap", kind: "games", en: "Listen & find", ar: "استمع وابحث", descEn: "Listen to a letter, then find its matching shape.", descAr: "استمع إلى الحرف، ثم ابحث عن شكله الصحيح.", artwork: "أ", ages: [3, 7] },
    { href: "/coloring", kind: "games", en: "Little color studio", ar: "مرسم الألوان الصغير", descEn: "Make the alphabet your own with colors and stickers.", descAr: "لوّن الحروف وزيّنها بالملصقات على ذوقك.", artwork: "🎨", ages: [3, 7] },
    { href: "/play", kind: "games", en: "Letter playground", ar: "ملعب الحروف", descEn: "Tap a letter and hear its name. Explore at your own pace.", descAr: "المس الحرف واسمع اسمه. اكتشف الحروف على مهلك.", artwork: "ج", ages: [3, 6] },
    { href: "/learn/solar-system", kind: "science", en: "A trip through space", ar: "رحلة في الفضاء", descEn: "Explore the planets in an interactive solar system.", descAr: "اكتشف الكواكب في مجموعة شمسية تفاعلية.", artwork: "🪐", ages: [4, 8] },
    { href: "/learn/water-cycle", kind: "science", en: "Where does rain come from?", ar: "من أين يأتي المطر؟", descEn: "Follow water from the sea to the clouds and back.", descAr: "اتبع رحلة الماء من البحر إلى السحب ثم عودته.", artwork: "🌧️", ages: [4, 8] },
    { href: "/learn/states-of-matter", kind: "science", en: "Ice, water & steam", ar: "ثلج وماء وبخار", descEn: "Discover solids, liquids and gases with a hands-on simulation.", descAr: "اكتشف حالات المادة الصلبة والسائلة والغازية بمحاكاة تفاعلية.", artwork: "🧊", ages: [5, 8] },
    { href: "/learn/gravity", kind: "science", en: "Let's explore gravity", ar: "لنكتشف الجاذبية", descEn: "Experiment with falling objects and find out what pulls them down.", descAr: "جرّب إسقاط الأشياء واكتشف ما يجذبها إلى الأرض.", artwork: "🍎", ages: [5, 8] },
  ] as const;
  const games: LearningActivity[] = interactives.map((activity) => ({
    href: activity.href, kind: activity.kind, title: ar ? activity.ar : activity.en,
    description: ar ? activity.descAr : activity.descEn,
    searchText: `${activity.en} ${activity.ar} ${activity.descEn} ${activity.descAr}`,
    ages: [...activity.ages], artwork: activity.artwork,
    detail: ar ? "نشاط تفاعلي" : "Interactive activity",
  }));
  return [worksheets[0], games[0], storyActivities[0], worksheets[2], games[1], games[5],
    ...worksheets.slice(1, 2), ...worksheets.slice(3), ...games.slice(2, 5), ...games.slice(6), ...storyActivities.slice(1)];
}
