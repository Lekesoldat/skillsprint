import AuthShowcase from "../components/AuthShowcase";
import { Button } from "../components/ui/Button";
import { useToast } from "../hooks/use-toast";

export default function Page() {
  const { toast } = useToast();
  return (
    <div className="flex w-full flex-col justify-center">
      <AuthShowcase />
      <Button
        onClick={() => {
          toast({
            title: "Riktig svar!",
            description: "+50 poeng",
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}
