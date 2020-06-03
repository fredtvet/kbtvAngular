import {
    query,
    style,
    animate,
    group,
    stagger,
    animation,
  } from "@angular/animations";

export const slideAnimation = animation([
    query(
      ":enter, :leave",
      style({ position: "fixed", width: "100%", height: "100%" }),
      { optional: true }
    ),
    query(".route-anim-block", style({ opacity: 0 }), { optional: true }),
    group([
      query(
        ":enter",
        [
          style({ transform: '{{ enterX }}' }),
          animate("0.25s ease-in-out", style({ transform: "translateX(0%)" })),
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({ transform: "translateX(0%)" }),
          animate(
            "0.25s ease-in-out",
            style({ transform: '{{ leaveX }}' })
          ),
        ],
        { optional: true }
      ),
    ]),
    query(
      ":enter .route-anim-block",
      stagger(40, [
        style({ transform: "translateY(100px)" }),
        animate(
          ".2s ease-in-out",
          style({ transform: "translateY(0px)", opacity: 1 })
        ),
      ]),
      { optional: true }
    ),    
  ])