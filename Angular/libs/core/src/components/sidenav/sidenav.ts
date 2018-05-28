import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  forwardRef,
  Inject,
  Input,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { CoreDrawer, CoreDrawerContainer, CoreDrawerContent } from './drawer';
import { coreDrawerAnimations } from './drawer-animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  selector: 'core-sidenav-content',
  template: '<ng-content></ng-content>',
  host: {
    class: 'core-drawer-content core-sidenav-content',
    '[style.margin-left.px]': '_container._contentMargins.left',
    '[style.margin-right.px]': '_container._contentMargins.right'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoreSidenavContent extends CoreDrawerContent {
  constructor(
      changeDetectorRef: ChangeDetectorRef,
      @Inject(forwardRef(() => CoreSidenavContainer)) container: CoreSidenavContainer) {
    super(changeDetectorRef, container);
  }
}

@Component({
  moduleId: module.id,
  selector: 'core-sidenav',
  exportAs: 'coreSidenav',
  template: '<ng-content></ng-content>',
  animations: [coreDrawerAnimations.transformDrawer],
  host: {
    '[@transform]': '_animationState',
    class: 'core-drawer core-sidenav',
    tabIndex: '-1',
    '(@transform.start)': '_onAnimationStart($event)',
    '(@transform.done)': '_onAnimationEnd($event)',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.core-drawer-end]': 'position === "end"',
    '[class.core-drawer-over]': 'mode === "over"',
    '[class.core-drawer-push]': 'mode === "push"',
    '[class.core-drawer-side]': 'mode === "side"',
    '[class.core-sidenav-fixed]': 'fixedInViewport',
    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
    '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoreSidenav extends CoreDrawer {

  /** Whether the sidenav is fixed in the viewport. */
  @Input()
  get fixedInViewport(): boolean { return this._fixedInViewport; }
  set fixedInViewport(value) { this._fixedInViewport = coerceBooleanProperty(value); }
  private _fixedInViewport = false;

  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  @Input()
  get fixedTopGap(): number { return this._fixedTopGap; }
  set fixedTopGap(value) { this._fixedTopGap = coerceNumberProperty(value); }
  private _fixedTopGap = 0;

  /**
   * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
   * fixed mode.
   */
  @Input()
  get fixedBottomGap(): number { return this._fixedBottomGap; }
  set fixedBottomGap(value) { this._fixedBottomGap = coerceNumberProperty(value); }
  private _fixedBottomGap = 0;
}

@Component({
  moduleId: module.id,
  selector: 'core-sidenav-container',
  exportAs: 'coreSidenavContainer',
  templateUrl: 'sidenav-container.html',
  styleUrls: ['drawer.scss'],
  host: {
    class: 'core-drawer-container core-sidenav-container',
    '[class.core-drawer-container-explicit-backdrop]': '_backdropOverride'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoreSidenavContainer extends CoreDrawerContainer {
  @ContentChildren(CoreSidenav) _drawers: QueryList<CoreSidenav>;
  @ContentChild(CoreSidenavContent) _content: CoreSidenavContent;
}
