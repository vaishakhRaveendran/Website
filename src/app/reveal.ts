import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Fades and lifts an element into view as it enters the viewport.
 *
 * Usage: <section reveal> ... </section>
 *
 * The hiding class is added by this directive (not authored in the template), so
 * if JavaScript never runs the content simply stays visible. Honours
 * prefers-reduced-motion by opting out entirely.
 */
@Directive({
  selector: '[reveal]'
})
export class Reveal implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    el.classList.add('reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      // threshold 0 with no rootMargin: anything already on screen reveals
      // immediately, so short non-scrolling pages can never strand an element
      // in a permanently hidden state.
      { threshold: 0, rootMargin: '0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
