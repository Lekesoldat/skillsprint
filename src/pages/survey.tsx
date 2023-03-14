import { isAfter } from "date-fns";
import { PostTest } from "../components/surveys/PostTest";
import { PreTest } from "../components/surveys/PreTest";

export default function Page() {
  const testDay = new Date("2023-03-16");

  if (isAfter(new Date(), testDay)) {
    return <PostTest />;
  }

  return <PreTest />;
}
