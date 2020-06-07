import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// here is the default text string
export class DefaultOwlDateTimeIntl extends OwlDateTimeIntl {
  
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel= 'Legg til ett sekund';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel= 'Minus ett sekund';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel= 'Legg til ett minutt';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel= 'Minus ett minutt';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel= 'Legg til en time';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel= 'Minus en time';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel= 'Forrige måned';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel= 'Neste måned';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel= 'Forrige år';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel= 'Neste år';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel= 'Forrige 21 år';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel= 'Neste 21 år';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel= 'Bytt til månedsvisning';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel= 'Velg måned og år';

  /** A label for the cancel button */
  cancelBtnLabel= 'Avbryt';

  /** A label for the set button */
  setBtnLabel= 'Legg til';

  /** A label for the range 'from' in picker info */
  rangeFromLabel= 'Fra';

  /** A label for the range 'to' in picker info */
  rangeToLabel= 'Til';

  /** A label for the hour12 button (AM) */
  hour12AMLabel= 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel= 'PM';

};
