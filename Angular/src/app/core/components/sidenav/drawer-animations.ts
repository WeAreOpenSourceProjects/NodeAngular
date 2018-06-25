import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

/** Animations used by the Material drawers. */
export const coreDrawerAnimations: {
  readonly transformDrawer: AnimationTriggerMetadata;
} = {
  /** Animation that slides a drawer in and out. */
  transformDrawer: trigger('transform', [
    state('open, open-instant', style({
      width: '{{width}}'
    }), { params: { width: '0px' } }),
    state('void', style({
      // Avoids the shadow showing up when closed in SSR.
      width: '{{collapsedWidth}}px',
      'box-shadow': 'none'
    }), { params: { collapsedWidth: 0 } }
  ),
    transition('void => open-instant', animate('0ms')),
    transition('void <=> open, open-instant => void',
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
  ])
};
