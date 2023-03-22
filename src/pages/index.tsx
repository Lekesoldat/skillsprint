import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function Page() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex w-full flex-col items-center justify-evenly">
      {/* Welcome */}
      <p className="text-2xl text-brand-blue">
        Hei og velkommen til{" "}
        <span className="inline-block w-fit -skew-y-2 bg-brand-yellow px-2 font-bold text-brand-black">
          SkillSprint!
        </span>
      </p>

      {!sessionData && (
        <>
          <p className="italic">
            NB! Vi ser at du ikke er logget inn. Logg inn allerede nå!
          </p>
          <Button onClick={() => signIn()}>Logg inn</Button>
        </>
      )}

      <div>
        <p className="break-normal">
          I denne applikasjonen finner du relevante matteoppgaver knyttet til
          det du nylig har lært om. Når du har gjort en oppgave i boken din, så
          registrerer du svaret i applikasjonen! Konkurrer enten med deg selv,
          eller med de andre i klassen din om å få flest poeng!
        </p>

        <p className="mt-2 underline underline-offset-4">
          Noen ting å tenke på:
        </p>
        <ul className="list-inside list-disc">
          <li>
            Ulike oppgaver gir ulik mengde{" "}
            <span className="font-bold">poeng</span>. Velg med omhu!
          </li>
          <li>
            Har du og en klassekamerat like mange poeng, så vinner den som har
            lengste beste <span className="font-bold">streak</span>
          </li>
          <li>
            Konkurrer med deg selv og jobb mot{" "}
            <span className="font-bold">prestasjoner</span>
          </li>
          <li>
            På innsikt-siden kan du få en{" "}
            <span className="font-bold">oversikt</span> over hvordan du ligger
            an sammenlignet med klassen og i de ulike kapitlene
          </li>
        </ul>
      </div>

      <div className="text-center">
        <div className="mb-4">
          I dag starter vi <span className="font-bold">ikke</span> med
          undersøkelsen. Denne tas på slutten av timen.
        </div>
        <Link href={"/survey"}>
          <Button>Til Spørreundersøkelse</Button>
        </Link>
      </div>
    </div>
  );
}
