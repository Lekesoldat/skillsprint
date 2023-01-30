import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export default function Page() {
  return (
    <>
      <Button text={"This is a button"} type="shadow" />
      <Badge text={"This is a badge"} color="red" />
    </>
  );
}
