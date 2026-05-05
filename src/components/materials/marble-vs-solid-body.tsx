import { BeforeAfterSlider } from "@/components/materials/before-after-slider";

export function MarbleVsSolidBody() {
  return (
    <>
      <p className="mb-6 text-base leading-[1.9]">
        Marble-style PVC thrives when lighting can graze the surface — think living rooms beside full-height
        drapes or hospitality booths with pin spots. Solid and micro-grain palettes let joinery or artwork
        lead; they conceal scuffs longer in corridors kids attack daily.
      </p>
      <BeforeAfterSlider
        beforeSrc="https://images.unsplash.com/photo-1615876235889-fd91a7d29dde?auto=format&fit=crop&w=1200&q=80"
        beforeAlt="Marble-look PVC surface with warm veining"
        afterSrc="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        afterAlt="Solid minimal wall finish with micro-grain texture"
        beforeLabel="Marble-look"
        afterLabel="Solid / micro-grain"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-sm border border-foreground/10 bg-[var(--header-surface)] p-5">
          <h3 className="font-serif text-xl text-foreground">Marble-look moods</h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            Amplify dusk lighting, veil TV walls, disguise oversized structural columns with continuous
            veining.
          </p>
        </div>
        <div className="rounded-sm border border-foreground/10 bg-[var(--header-surface)] p-5">
          <h3 className="font-serif text-xl text-foreground">Solid & micro-grain moods</h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            Support bold furniture colours, camouflage fingerprints near entries, unify open-plan cubes
            with quiet surfaces.
          </p>
        </div>
      </div>
    </>
  );
}
