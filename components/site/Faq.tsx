"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/types";

type FaqProps = {
  dict: Dictionary["faq"];
};

export function Faq({ dict }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-3xl text-brand">{dict.title}</h2>

      <div className="mt-10 flex flex-col gap-3">
        {dict.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="rounded-xl bg-brand/[0.06] px-6 py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-ink">{item.question}</span>
                <span
                  className="shrink-0 text-lg font-semibold text-ink"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="mt-3 border-t border-ink/10 pt-3 text-sm leading-relaxed text-ink-muted">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
