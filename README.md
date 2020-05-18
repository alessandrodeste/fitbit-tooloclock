# fitbit-tooloclock

A Fitbit Versa clock face showing a subset of metrics and some extra buttons to keep track of daily actions

## Features

- Simple clock with cardio and steps metrics
- Battery indicator
- Configurable time log for reminders (
    _use case_: do I have took the pill? have I given to my baby the vitamin D today? at what time my baby start to sleep?
    _behaviour_: on long click (0.5s for the side buttons, 0s for the central one) is logged the time, after midnight are reset the 2 side buttons, longer click (2s) force reset

## Screenshots

![](screenshots/versa2_01.png)

## Backlog

- [ ] Improve design and usability
- [ ] Settings to configure the toggles for reminders (name, color, enable/disable)
- [ ] Enable a second timezone (see [fitbit-dual-clockface](https://github.com/edinbb/fitbit-dual-clockface))
- [ ] daily mood/energy tracker (how do I feel today?). This feature would need a frontend application to visualise the month trend
- [ ] make each extra buttons configurable between 3 types: toggle, mood/energy tracker, time log
- [ ] customisable colors

## Testing

I've tested the application only on my Fitbit Versa 2

## How to build

*Prerequisites*: Node.js 10.x+

> npm install
> npx fitbit
> $fitbit: connect phone
> $fitbit: connect device
> $fitbit: bi

You can read Fitbit's [CLI Reference](https://dev.fitbit.com/build/guides/command-line-interface/#building-and-installing-your-project) to learn how to build and deploy this face to your device.

## Contributing

I'm going to experiment with fitbit apis developing a clock based on my personal needs.
Any contribution is welcome and if you want to collaborate just ping me, we can plan together a different roadmap. :)

## Resources

- [sdk-moment](https://github.com/Fitbit/sdk-moment)
- [metrix-fitbit](https://github.com/rootasjey/metrix-fitbit)
- [Fitbit Assets](https://github.com/Fitbit/sdk-design-assets)
- Template: [create-fitbit-app](https://github.com/Fitbit/sdk-design-assets)
