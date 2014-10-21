plainJane
=========

A plain Jane carousel that needs no jQuery. 3.8k minified, 1.3k gzipped.

### How to use

var carousel = plainJane(".slides");

### Options

- speed: 5000 (duration between slide transitions)
- runOnTimer: true (set to 'false' if slides will be changed manually)
- janeClass: 'plain-jane' (class for the carousel)
- activeClass: 'active-jane' (class for active slide)
- prevClass: 'jane-prev' (class for previous button)
- nextClass: 'jane-next' (class for next button)
- createButtons: true (set to 'false' if you do not want nav buttons created)
- pauseOnHover: true (set to 'false' if you do not want the timer compromised)
- displayToggle: true (set to 'false' to use the transition callback for more full featured transitions)

### Callbacks

- onInit
- onTransition
- onDestroy

### Coming soon

- Demo page
- More features
