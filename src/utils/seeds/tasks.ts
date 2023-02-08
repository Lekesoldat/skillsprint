import type { Category, Prisma, Task, User } from "@prisma/client";
import { faker, prismaClient } from "./seed";

export async function createTasks(categories: Category[]) {
  console.info("\n📝 Seeding tasks...");
  const data: Prisma.TaskCreateInput[] = [
    {
      id: "cldiog5kk000008l29k73fx8g",
      title: "Oppgave 1a",
      description: "Beskrivelse av oppgave 1a",
      category: { connect: { id: faker.helpers.arrayElement(categories).id } },
      points: 400,
      answer: "42",
    },
    {
      id: "cldioiaq9000f08l27ek850k3",
      title: "Oppgave 1b",
      description: "Beskrivelse av oppgave 1b",
      category: { connect: { id: faker.helpers.arrayElement(categories).id } },
      points: 350,
      answer: "32",
      prevTask: { connect: { id: "cldiog5kk000008l29k73fx8g" } },
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
  ];

  const start = new Date(2023, 2, 4, 12);
  const end = new Date(2023, 2, 4, 15);

  const promises = mock.map((id) => {
    const taskId = faker.helpers.arrayElement(tasks).id;
    const userId = faker.helpers.arrayElement(users).id;

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
