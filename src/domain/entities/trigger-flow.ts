import { Position } from "../port/entities/orders/position.port";
import { TriggerFlowProps, TriggerSet } from "../port/entities/trigger-flow.port";

/**
 * Trigger flow
 * @param flow: An array of TriggerSet. Each set of triggers will be tested independently.
 */
 export class TriggerFlow {

  constructor(private props: TriggerFlowProps) {}

  private andTriggersWereTriggered(triggerSet: TriggerSet):boolean {
    const triggered = triggerSet.triggers.map(trigger => trigger.isTriggered());
    return !triggered.includes(false); 
  }

  private orTriggersWereTriggered(triggerSet: TriggerSet):boolean {
    const triggered = triggerSet.triggers.map(trigger => trigger.isTriggered());
    return triggered.includes(true); 
  }

  public getTriggeredPositions(): Position[] {
    return this.props.flow.reduce((positions, triggerSet) => {
      if (!triggerSet.triggers.length) return positions;
      if (triggerSet.operator === "and" && this.andTriggersWereTriggered(triggerSet)) positions.push(triggerSet.position);
      else if (triggerSet.operator === "or" && this.orTriggersWereTriggered(triggerSet)) positions.push(triggerSet.position)
      return positions;
    }, []);
  }
}

