import {
    query,
    style,
    animate,
    group,
    animation,
  } from "@angular/animations";

export const slideAnimation = animation([
    query(
      ":enter, :leave",
      style({ position: "absolute", width: "100%", height: "100%" }),
      { optional: true }
    ),
    group([
      query(
        ":enter",
        [
          style({ transform: '{{ enterX }}' }),
          animate("0.3s ease-in-out", style({ transform: "translateX(0%)" })),
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({ transform: "translateX(0%)" }),
          animate(
            "0.3s ease-in-out",
            style({ transform: '{{ leaveX }}' })
          ),
        ],
        { optional: true }
      ),
    ]),  
  ])