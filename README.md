plainJane
=========

A plain Jane carousel that needs no jQuery. 3.8k minified, 1.3k gzipped.

### How to use

var carousel = plainJane(".slides");

### Options

**speed** Duration between slide transitions
```
default: 5000
options: integer
```

**runOnTimer** (Set to 'false' if slides will be changed manually)
```
default: true
options: boolean (true / false)
```

**janeClass** Class for the carousel
```
default: 'plain-jane'
options: element class
```

**activeClass** Class for active slide
```
default: 'active-jane'
options: element class
```

**prevClass** Class for previous button
```
default: 'jane-prev'
options: element class
```

**nextClass** Class for next button
```
default: 'jane-next'
options: element class
```

**createButtons** (Set to 'false' if you do not want nav buttons created)
```
default: true
options: boolean (true / false)
```

**pauseOnHover** (Set to 'false' if you do not want the timer compromised)
```
default: true
options: boolean (true / false)
```

**displayToggle** (Set to 'false' to use the transition callback for more full featured transitions)
```
default: true
options: boolean (true / false)
```

### Callbacks

- onInit
- onTransition
- onDestroy

### Coming soon

- Demo page
- More features
