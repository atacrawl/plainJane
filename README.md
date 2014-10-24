plainJane
=========

A plain Jane carousel that needs no jQuery. 4.4k minified, 1.5k gzipped.

### How to use

```
var carousel = plainJane(".slides");
```

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

**toggleMethod** (Set to 'false' if you do not want buttons or dots)
```
default: 'buttons'
options: 'buttons', 'dots', boolean (false)
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

**dotsListClass** Class for dots list
```
default: 'jane-dots'
options: element class
```

**dotClass** Class for each dot
```
default: 'jane-dot'
options: element class
```

**activeDotClass** Class for active dot
```
default: 'active-dot'
options: element class
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
