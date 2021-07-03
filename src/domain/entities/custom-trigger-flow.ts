import { CustomTriggerFlowProps } from "../port/entities/custom-trigger-flow.port";
import { Position } from "../port/entities/orders/position.port";
import { TriggerFlowProps, TriggerSet } from "../port/entities/trigger-flow.port";

/**
 * Trigger flow
 * @param flow: An array of TriggerSet. Each set of triggers will be tested independently.
 */
 export class CustomTriggerFlow {

  constructor(private props: CustomTriggerFlowProps) {}

  public getTriggeredPositions(): Position[] {
    return this.props.triggers.reduce((positions, trigger) => {
      const position = trigger.isTriggered();
      if (position) positions.push(position);
      return positions;
    }, []);
  }
}

