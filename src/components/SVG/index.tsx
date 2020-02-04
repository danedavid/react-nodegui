import { QPainter, RenderHint, PenStyle, QColor, QPoint, WidgetEventTypes } from '@nodegui/nodegui';
import { ComponentConfig, registerComponent } from "../config";
import { Fiber } from "react-reconciler";
import { RNSVG, SVGProps } from "./RNSVG";
import { AppContainer } from "../../reconciler";

class SVGConfig extends ComponentConfig {
  tagName = RNSVG.tagName;
  shouldSetTextContent(nextProps: SVGProps): boolean {
    return false;
  }
  createInstance(
    newProps: SVGProps,
    rootInstance: AppContainer,
    context: any,
    workInProgress: Fiber
  ): RNSVG {
    const widget = new RNSVG();
    widget.setProps(newProps, { width: 0, height: 0 });
    /********** */
    // This code won't be here
    // It'll be moved to the child component
    // Each child component will add its own event listener
    // to the same instance
    /********** */
    widget.addEventListener(WidgetEventTypes.Paint, () => {
      const painter = new QPainter(widget);
      painter.setRenderHint(RenderHint.Antialiasing);
      painter.translate(widget.geometry().width() / 2, widget.geometry().height() / 2);
      const side = Math.min(widget.geometry().width(), widget.geometry().height());

      painter.setPen(PenStyle.NoPen);
      const hourColor = new QColor(127, 0, 127);
      painter.setBrush(hourColor);

      painter.save();
      const time = new Date();
      painter.rotate(30.0 * (time.getHours() + time.getMinutes() / 60.0));
      const hourHand = [new QPoint(7, 8), new QPoint(-7, 8), new QPoint(0, -40)];
      painter.drawConvexPolygon(hourHand);
      painter.restore();
      painter.end();
    });
    return widget;
  }
  commitMount(
    instance: RNSVG,
    newProps: SVGProps,
    internalInstanceHandle: any
  ): void {
    return;
  }
  finalizeInitialChildren(
    instance: RNSVG,
    newProps: SVGProps,
    rootContainerInstance: AppContainer,
    context: any
  ): boolean {
    return false;
  }
  commitUpdate(
    instance: RNSVG,
    updatePayload: any,
    oldProps: SVGProps,
    newProps: SVGProps,
    finishedWork: Fiber
  ): void {
    instance.setProps(newProps, oldProps);
  }

  getContext = (parentContext: any, rootInstance: AppContainer) => {
    return {
      // need to be able to get the widget instance created in
      // createInstance() here, so that we can pass it down to
      // child components like <Rect/>
      widgetInstance: {}
    };
  }
}

export const SVG = registerComponent<SVGProps>(new SVGConfig());