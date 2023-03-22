import { prismaClient } from "./clients";

await prismaClient.user.updateMany({
  data: {
    streak: 0,
  },
});
