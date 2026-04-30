import { METADATA } from "../constants/constants";

export function Header() {
  const [firstName, ...restName] = METADATA.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <header className="mb-8 lg:mb-16 w-full text-left">
      <h1 className="font-headline text-[clamp(3.5rem,10vw,4.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground flex flex-wrap lg:flex-col items-baseline lg:items-start lg:gap-1">
        <span className="lowercase">{firstName}</span>
        {lastName && (
          <span className="flex items-baseline">
            <span className="hidden lg:inline text-foreground">//&nbsp;</span>
            <span className="lg:hidden inline">&nbsp;</span>
            <span className="lowercase">{lastName}</span>
          </span>
        )}
      </h1>
      <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-primary/60 leading-relaxed">
        Open-source repositories
      </p>
    </header>
  );
}
