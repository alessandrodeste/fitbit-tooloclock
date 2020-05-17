# fitbit-tooloclock

A Fitbit Versa clock face showing a subset of metrics and some extra buttons to keep track of daily actions

## Features

- [x] Simple clock with cardio and steps metrics
- [ ] Configurable toggles for reminders (
    _use case_: do I have took the pill? have I given to my baby the vitamin D today?
    _behaviour_: on switch On is logged the datetime and the switch pressed, after midnight reset to Off
- [ ] Settings to configure the 3 toggles (name, color, enable/disable)

## Backlog

- [ ] Enable a second timezone (see [fitbit-dual-clockface](https://github.com/edinbb/fitbit-dual-clockface))
- [ ] Improve design and usability
- [ ] button to log a time (long press to retrieve previous time) (use case: i'm feeding the baby now, when i feeded last time?)
- [ ] daily mood/energy tracker (how do I feel today?). This feature would need a frontend application to visualise the month trend
- [ ] make each extra buttons configurable between 3 types: toggle, mood/energy tracker, time log
- [ ] customisable colors

## Testing

I've tested the application only on my Fitbit Versa 2

## Contributing

I'm going to experiment with fitbit apis developing a clock based on my personal needs.
Any contribution is welcome and if you want to collaborate just ping me, we can plan together a different roadmap. :)

## Resources

- sdk-moment: [https://github.com/Fitbit/sdk-moment]
- Fitbit Assets: [https://github.com/Fitbit/sdk-design-assets]
