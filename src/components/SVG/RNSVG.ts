import { QWidget, NodeWidget } from "@nodegui/nodegui";
import { RNWidget } from "../config";
import { ViewProps, setViewProps } from "../View/RNView";
import { throwUnsupported } from "../../utils/helpers";

export interface SVGProps extends ViewProps<any> {
  width: number;
  height: number;
  children?: any;
};

const setSVGProps = (
  widget: RNSVG,
  newProps: SVGProps,
  oldProps: SVGProps
) => {
  const setter: SVGProps = {
    set width(width: number) {
      widget.resize(width, newProps.height);
    },
    set height(height: number) {
      widget.resize(newProps.width, height);
    }
  };
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNSVG extends QWidget implements RNWidget {
  appendInitialChild(child: NodeWidget<any>): void {
    // throwUnsupported(this);
  }
  appendChild(child: NodeWidget<any>): void {
    // throwUnsupported(this);
  }
  insertBefore(child: NodeWidget<any>, beforeChild: NodeWidget<any>): void {
    throwUnsupported(this);
  }
  removeChild(child: NodeWidget<any>): void {
    throwUnsupported(this);
  }
  setProps(newProps: SVGProps, oldProps: SVGProps) {
    setSVGProps(this, newProps, oldProps);
  }
  static tagName = "svg";
}
