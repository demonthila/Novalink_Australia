import { Button } from "@/components/ui/Button";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <EyebrowLabel index="404">Page not found</EyebrowLabel>
      <h1 className="text-display mt-6 max-w-[14ch] font-medium">This page has moved or doesn’t exist.</h1>
      <p className="text-lede mt-6 max-w-md text-grey-2">Head back to the homepage, or tell us what you were looking for.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </section>
  );
}
