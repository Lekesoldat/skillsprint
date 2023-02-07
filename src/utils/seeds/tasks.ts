import type { Prisma, Task, User } from "@prisma/client";
import { faker, prismaClient } from "./seed";

export async function createTasks() {
  console.info("\n📝 Seeding tasks...");
  const data: Prisma.TaskCreateInput[] = [
    {
      id: "cldiog5kk000008l29k73fx8g",
      title: "Oppgave 1a",
      description:
        "En en liten seilbåt har et trekantet seil med et areal på 9 m². Høyden på seilet er 6 meter. Formelen for arealet til en trekant er math(A=\\frac{gh}{2}). Hva er formelen for grunnlinjen i denne trekanten?",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 50,
      answer: "g=\\frac{2A}{h}",
    },
    {
      id: "cldioiaq9000f08l27ek850k3",
      title: "Oppgave 1b",
      description:
        "En en liten seilbåt har et trekantet seil med et areal på 9 m². Høyden på seilet er 6 meter. Formelen for arealet til en trekant er math(A=\\frac{gh}{2}). Bruk formelen og regn ut lengden til grunnlinjen.",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 75,
      answer: "3",
      prevTask: { connect: { id: "cldiog5kk000008l29k73fx8g" } },
    },
    {
      id: "cldudjgkh000008ig5tnn2ixf",
      title: "Oppgave 2a",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(5a+20b+10c)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 25,
      answer: "5(a+4b+2c)",
    },
    {
      id: "cldudoi2p000208igdu8ebtud",
      title: "Oppgave 2b",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(2a^2 b-2ab)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 50,
      answer: "2ab(a-1)",
      prevTask: { connect: { id: "cldudjgkh000008ig5tnn2ixf" } },
    },
    {
      id: "cldudqbi5000308ig86l16ppf",
      title: "Oppgave 2c",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(2b^3 + 10b^2 - 4b)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 75,
      answer: "2b(b^2 + 5b - 2)",
      prevTask: { connect: { id: "cldudoi2p000208igdu8ebtud" } },
    },
    {
      id: "cldudr1a2000408ig1qzaa7pm",
      title: "Oppgave 2d",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(5x^3 y^2-10x^2 y+xy^2)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 100,
      answer: "xy(5x^2 y-10x+y)",
      prevTask: { connect: { id: "cldudqbi5000308ig86l16ppf" } },
    },
    {
      id: "cldudrdaz000508ig6393dei9",
      title: "Oppgave 2e",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(9x^3 y^2 + 27x^2 y^3)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 100,
      answer: "9x^2 y^2 (x + 3y)",
      prevTask: { connect: { id: "cldudr1a2000408ig1qzaa7pm" } },
    },
    {
      id: "cldudrj6k000608igclru197t",
      title: "Oppgave 2f",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(4xy^2 z+8x^2 yz + 16xyz^2)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 125,
      answer: "4xyz(y+2x+4z)",
      prevTask: { connect: { id: "cldudrdaz000508ig6393dei9" } },
    },
  ];

  return await prismaClient.$transaction(
    data.map((task) =>
      prismaClient.task.upsert({
        where: { id: task.id },
        create: task,
        update: task,
      })
    )
  );
}

export async function createTaskAttempts(tasks: Task[], users: User[]) {
  console.info("\n✅ Seeding task attempts...");

  const completed = new Map<[string, string], boolean>();

  const mock = [
    "cldogid0u008c3b6kjg2uw1vg",
    "cldogid0u008d3b6kank7s9lk",
    "cldogid0u008e3b6kchb2v769",
    "cldogid0u008f3b6klc11wvgs",
    "cldogid0u008g3b6k7dnhymx0",
    "cldogid0u008h3b6krzduw3kg",
    "cldogid0u008i3b6ktayeayni",
    "cldogid0u008j3b6kvtmhe5nr",
    "cldogid0u008k3b6kkiwmnl11",
    "cldogid0u008l3b6ku2p4my55",
    "cldogid0u008m3b6kmmdh6wy4",
    "cldogid0u008n3b6kgofd8evg",
    "cldogid0u008o3b6kg6sn5js3",
    "cldogid0u008p3b6krsyusjf7",
    "cldogid0u008q3b6k6s7dnv8r",
    "cldogid0u008r3b6k2lok10yj",
    "cldogid0u008s3b6kdli7gi7f",
    "cldogid0u008t3b6kjdkzp77l",
    "cldogid0u008u3b6kvyacb95b",
    "cldogid0u008v3b6kvc2i5dmt",
    "cldogid0u008w3b6kdulsbfjy",
    "cldogid0u008x3b6k1zu8ai25",
    "cldogid0u008y3b6kie2x9d4y",
    "cldogid0u008z3b6ko9nv9ija",
    "cldogid0u00903b6kqr22n7w3",
    "cldogid0u00913b6kng0bao01",
    "cldogid0u00923b6ke9xuuyjn",
    "cldogid0u00933b6kibegh3x4",
    "cldogid0u00943b6kpu8k8g9w",
    "cldogid0u00953b6k76khd9hj",
    "cldogid0u00963b6krly53lpk",
    "cldogid0u00973b6ko3j98cec",
    "cldogid0u00983b6kfl1050q0",
    "cldogid0u00993b6kyorl1w0v",
    "cldogid0u009a3b6k7uc0wgj4",
    "cldogid0u009b3b6k0m4xysoe",
    "cldogid0u009c3b6k7blr0w0k",
    "cldogid0u009d3b6kdwdmvg9q",
    "cldogid0u009e3b6ko5ugcuuu",
    "cldogid0u009f3b6kl2jrjhm3",
    "cldogid0u009g3b6k5rn2wph8",
    "cldogid0u009h3b6kegj3yxhv",
    "cldogid0u009i3b6kw863pak0",
    "cldogid0u009j3b6k1vduxr4r",
    "cldogid0u009k3b6kdc9rxxtp",
    "cldogid0u009l3b6kev82knz6",
    "cldogid0u009m3b6k3i8bkloe",
    "cldogid0u009n3b6k45frt8t6",
    "cldogid0u009o3b6kyb3vtgre",
    "cldogid0u009p3b6kp2dctvbi",
    "cldogid0u009q3b6kkly7xjc1",
    "cldogid0u009r3b6kw142voek",
    "cldogid0u009s3b6kl66ybi0d",
    "cldogid0u009t3b6ku5vamoot",
    "cldogid0u009u3b6k4c0guvey",
    "cldogid0u009v3b6ko1yjsugt",
    "cldogid0u009w3b6kdro20035",
    "cldogid0u009x3b6k0h98rrww",
    "cldogid0u009y3b6kuuw2i6u1",
    "cldogid0u009z3b6kmt4lyxtx",
    "cldogid0u00a03b6k1mo6qg2a",
    "cldogid0u00a13b6kj501wrnd",
    "cldogid0u00a23b6kgg3nv1km",
    "cldogid0u00a33b6k06k9wdlg",
    "cldogid0u00a43b6k252g9jq7",
    "cldogid0u00a53b6kqbgfmizu",
    "cldogid0u00a63b6kt0rsu673",
    "cldogid0u00a73b6kqbail36q",
    "cldogid0u00a83b6kc4pb1wav",
    "cldogid0u00a93b6ke9k0qvh6",
    "cldogid0u00aa3b6k06eao2t6",
    "cldogid0u00ab3b6ka92cr0ou",
    "cldogid0u00ac3b6kl8nu0hkt",
    "cldogid0u00ad3b6kt20mj6ko",
    "cldogid0u00ae3b6k0dk141wf",
    "cldogid0u00af3b6k01kuxj11",
    "cldogid0u00ag3b6k6m8m1mn3",
    "cldogid0u00ah3b6k556366f0",
    "cldogid0u00ai3b6k1wjjs4oy",
    "cldogid0u00aj3b6kzgv9sgsy",
    "cldogid0u00ak3b6kgd8y86al",
    "cldogid0u00al3b6kwyjnkbls",
    "cldogid0u00am3b6k30g6780p",
    "cldogid0u00an3b6kzpked7tj",
    "cldogid0u00ao3b6kx2rs6zdk",
    "cldogid0u00ap3b6kbzl1iqyh",
    "cldogid0u00aq3b6kfkgn867n",
    "cldogid0u00ar3b6kq94e7sqw",
    "cldogid0u00as3b6kihvm0xf8",
    "cldogid0u00at3b6k37nrf2w4",
    "cldogid0u00au3b6kzxyxdfeh",
    "cldogid0u00av3b6kft51kuph",
    "cldogid0u00aw3b6k1lvbb3q9",
    "cldogid0u00ax3b6khno3e5nx",
    "cldogid0u00ay3b6kwfja9ghh",
    "cldogid0u00az3b6kq6ewqn0b",
    "cldogid0u00b03b6krhlensg5",
    "cldogid0u00b13b6kaqqkc53d",
    "cldogid0u00b23b6k1t9xhb8l",
    "cldogid0u00b33b6kaqcyxixj",
    "clduedkhe00b43b6kpbdsdr0a",
    "clduedkhe00b53b6kxz054b20",
    "clduedkhe00b63b6kocgr2zic",
    "clduedkhe00b73b6kf0s8ongn",
    "clduedkhe00b83b6kzsak93ar",
    "clduedkhe00b93b6khvo6zcgg",
    "clduedkhe00ba3b6kwgpr4b8m",
    "clduedkhe00bb3b6kuy19145x",
    "clduedkhe00bc3b6kdih0i9ld",
    "clduedkhe00bd3b6ku9lsudqv",
    "clduedkhe00be3b6kq6fxdcei",
    "clduedkhe00bf3b6koffjgg0e",
    "clduedkhe00bg3b6kpx0d84z4",
    "clduedkhe00bh3b6kyvaostqz",
    "clduedkhe00bi3b6kzg2hns8l",
    "clduedkhe00bj3b6kfnnoss0k",
    "clduedkhe00bk3b6kn0jfnmp1",
    "clduedkhe00bl3b6kky4gsylh",
    "clduedkhe00bm3b6k2nqi2w2r",
    "clduedkhe00bn3b6kakjkrr84",
    "clduedkhe00bo3b6k4dzzn1od",
    "clduedkhe00bp3b6kkefle35e",
    "clduedkhe00bq3b6kzb0s3sfh",
    "clduedkhe00br3b6kkra0jdvb",
    "clduedkhe00bs3b6kfzdqprv2",
    "clduedkhe00bt3b6k4e3lgokq",
    "clduedkhe00bu3b6k8h21133v",
    "clduedkhe00bv3b6kkpgqjels",
    "clduedkhe00bw3b6kbg43xieh",
    "clduedkhe00bx3b6k4x8m4p9g",
    "clduedkhe00by3b6k931rsmzg",
    "clduedkhe00bz3b6kvzsg0pq0",
    "clduedkhe00c03b6k2o2wn8jg",
    "clduedkhe00c13b6k25a6jo1n",
    "clduedkhe00c23b6k7g268hms",
    "clduedkhe00c33b6kn8in1fim",
    "clduedkhe00c43b6kuxbabywt",
    "clduedkhe00c53b6ki5gw98mb",
    "clduedkhe00c63b6ka27g7ihw",
    "clduedkhe00c73b6ku1alngez",
    "clduedkhe00c83b6kv60sdjf3",
    "clduedkhe00c93b6k0rkwuo36",
    "clduedkhe00ca3b6kt124j7jr",
    "clduedkhe00cb3b6k1wrj3l81",
    "clduedkhe00cc3b6khvddalaz",
    "clduedkhe00cd3b6kod2undov",
    "clduedkhe00ce3b6k0g7uhmfd",
    "clduedkhe00cf3b6kv5ajq8da",
    "clduedkhe00cg3b6k95voohrh",
    "clduedkhe00ch3b6k9wjas4k7",
    "clduedkhe00ci3b6kr2uvk50c",
    "clduedkhe00cj3b6ku9ztwof7",
    "clduedkhe00ck3b6kycox7k1i",
    "clduedkhe00cl3b6kzvz1r2qx",
    "clduedkhe00cm3b6k9qaopxq0",
    "clduedkhe00cn3b6k5kyt6ucl",
    "clduedkhe00co3b6kvzkpi82q",
    "clduedkhe00cp3b6kb1dgw5dt",
    "clduedkhe00cq3b6k2f0eus0z",
    "clduedkhe00cr3b6kcnp6ippi",
    "clduedkhe00cs3b6ka2gwejyg",
    "clduedkhe00ct3b6kouvsa38o",
    "clduedkhe00cu3b6kn87pnazk",
    "clduedkhe00cv3b6k1m0h9fxj",
    "clduedkhe00cw3b6k5tj2e7ln",
    "clduedkhe00cx3b6k2ntdlxfp",
    "clduedkhe00cy3b6kziboiic0",
    "clduedkhe00cz3b6kce2wtg4e",
    "clduedkhe00d03b6kdzjpygtg",
    "clduedkhe00d13b6kct5tgzgx",
    "clduedkhe00d23b6kovbebgc7",
    "clduedkhe00d33b6kedkokpu5",
    "clduedkhe00d43b6k0mvfw1yk",
    "clduedkhe00d53b6kqqn8l560",
    "clduedkhe00d63b6k4j8vt4ht",
    "clduedkhe00d73b6k7b60nw0h",
    "clduedkhe00d83b6kjbz2wn6a",
    "clduedkhe00d93b6ky3bclmca",
    "clduedkhe00da3b6kcdr03bjn",
    "clduedkhe00db3b6kwsozw5vm",
    "clduedkhe00dc3b6kc5vmlk0u",
    "clduedkhe00dd3b6ksdlzue1j",
    "clduedkhe00de3b6k2icw11po",
    "clduedkhe00df3b6kse6mf5vw",
    "clduedkhe00dg3b6kuifaopzq",
    "clduedkhe00dh3b6k28ez7f9x",
    "clduedkhe00di3b6kdjzuo0yh",
    "clduedkhe00dj3b6k5drzt8mv",
    "clduedkhe00dk3b6kba24wk18",
    "clduedkhe00dl3b6kyqcb8cqp",
    "clduedkhe00dm3b6kryd380at",
    "clduedkhe00dn3b6kigi6xl5l",
    "clduedkhe00do3b6kmm5lqhrs",
    "clduedkhe00dp3b6kocwu0pj5",
    "clduedkhe00dq3b6kti5pq3lr",
    "clduedkhe00dr3b6k93bf9its",
    "clduedkhe00ds3b6kp5ztg91e",
    "clduedkhe00dt3b6k9l3xhaqm",
    "clduedkhe00du3b6kb208vn5y",
    "clduedkhe00dv3b6kr3lveriq",
  ];

  const start = new Date(2023, 2, 4, 12);
  const end = new Date(2023, 2, 4, 15);

  let count = 0;

  const promises = mock.map((id) => {
    const taskId = faker.helpers.arrayElement(tasks).id;
    const userId =
      count <= 5
        ? "cldacds260001sb515t861jm3"
        : faker.helpers.arrayElement(users).id;

    if (count <= 5) {
      count++;
    }

    const result = completed.get([taskId, userId])
      ? "PENDING"
      : faker.helpers.arrayElement(["FAIL", "SUCCESS", "PENDING"] as const);

    const elapsedTime = faker.datatype.number({ min: 100, max: 1000 });
    const createdAt = faker.date.between(start, end);

    if (result === "SUCCESS") {
      completed.set([taskId, userId], true);
    }

    return prismaClient.taskAttempt.upsert({
      where: { id },
      create: {
        id,
        taskId,
        userId,
        result,
        elapsedTime,
        createdAt,
      },
      update: {
        elapsedTime,
        taskId,
        userId,
        result,
        createdAt,
      },
    });
  });

  return await prismaClient.$transaction(promises);
}
