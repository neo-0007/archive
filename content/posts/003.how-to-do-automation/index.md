---
title: "How to write automation scripts"
summary: "be lazy, let the computer do your work "
toc: false
readTime: false
autonumber: true
math: false
showTags: false
hideBackToTop: true
categories: ['kde','tech']
tags: ['kde']
---

## Press keys

For pressing keys we use ydotool , the syntax for pressing keys is a little confusing when you look at it :

```bash
ydotool key KEY_CODE:ACTION
```

KEY_CODE

Linux uses a file named `input-event-codes.h` that defines numeric codes for everything an input device can generate in Linux. Simply speaking for every type of keypress there is a numerical representation. For example LEFTCTRL key is represented by 29 letter T is represented by 20.
How to find the code for the key you want to press , You can read the original `.h` file by `nano /usr/include/linux/input-event-codes.h` if you are in a linux system ( i hope you are using one). or inspect the file [here](https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h)

I use grep to find the code for the key i want since the header file is too long `grep KEY_LEFTCTRL /usr/include/linux/input-event-codes.h` and so on.

ACTION
1 : key is pressed
0 : key is released

So to press and release `Ctrl` to open up a terminal you can type the following

```bash
ydotool key 29:1 29:0
```

## Press key combinations

Key combinations is the same as above , you just need to keep all the keys pressed using the action 1.
So to press `Ctrl+Alt+T` which opens up a terminal you can type the following

```bash
ydotool key 29:1 56:1 20:1 29:1 56:0 29:0
```

This will open up a terminal (hopefully).

## Click ( left, right, double)

For performing mouse clicks we can use the click command in ydotool , If you are do not like codes unlike me i am sorry but again we have codes...

```bash
ydotool click OPTIONS BUTTON_CODE
```

OPTIONS

```bash
--repeat=N : can be used to press a button N times
--P : can be used to press and release a button as that's what we mostly do
```

BUTTON_CODE

This is a hexadecimal value that represents different mouse buttons (left, right, middle, etc.).  
Yes, it looks ugly at first, but once you always open up my blog ( self promotion ).

```bash
ydotool click 0xC0   # left click
ydotool click 0xC1   # right click
ydotool click 0xC2   # middle button click (scroll button)

ydotool click 0x40   # left button down (press)
ydotool click 0x80   # left button up (release)

ydotool click 0x41   # right button down (press)
ydotool click 0x81   # right button up (release)
```

And some combinations
This can be useful to select text, drag and drop and so on..

```bash
ydotool click 0x40 # left down 
ydotool mousemove 300 0 # drag right 
ydotool mousemove 0 200 # drag down 
ydotool click 0x80 # left up
```

same as above but more reliable

```bash
ydotool click 0x40
ydotool mousemove -D 20 300 0
ydotool mousemove -D 20 0 200
ydotool click 0x80
```

## Type text

Typing text is pretty simple using ydotool

```bash
ydotool type "string-you-want-to-type"
```

## Focus a specific app

```bash
kdotool search --name "Window Title" windowactivate
kdotool search --class appname windowactivate
kdotool search --classname org.kde.app windowactivate ( for kde apps )
```

## Send mouse and keyboard commands to a specific window

Focus the window using kdotool than execute commands using ydotool since commands are executed in the active window always

Move mouse to a specific coordinate

There is a command in ydotool

```bash
ydotool mousemove --absolute -x x-value -y y-value
```

but that does not work in Wayland properly.

The

```bash
ydotool mousemove -x x-value -y y-value
```

works that moves the mouse reltive to current so we can use that.

1) mousemove -9999 -9999 ( moves the mouse to top left 0,0)
2) mousemove x y ( now relative to 0,0 so that's like absolute )

## Move mouse inside a specific window

Since we cannot directly send mouse events to a window on Wayland, we rely on window geometry that we can get using kdotool and do relative mouse movement using ydotool.

The steps are:

1. Focus the window  
2. Get the window geometry  
3. Reset the mouse to `(0,0)`  
4. Move the mouse relatively using the window coordinates  

```bash
# First, focus the window:
kdotool search --class firefox windowactivate

# Get the window geometry:
kdotool search --class firefox getwindowgeometry
# Example output:
# x=120
# y=80
# width=1280
# height=800

#Reset the mouse position to the top-left corner of the screen:
ydotool mousemove -x -9999 -y -9999

# Now move the mouse inside the window (top-left corner of the window):
ydotool mousemove -x 120 -y 80

#At this point, the mouse cursor is inside the target window. so you can now move inside the window , but only once than again repeat the above steps once again ( i will think of a script to automate this)

```

## Move mouse to the center of a window

Moving to the center of a window uses the same idea, but instead of moving to x and y, we add half the width and height.

From the geometry:
x=120
y=80
width=1280
height=800

Calculate the center:

```bash
center_x = x + width / 2

center_y = y + height / 2
```

Reset the mouse again:

```bash
ydotool mousemove -x -9999 -y -9999
```

Move the mouse to the center of the window:

`ydotool mousemove -x center_x -y center_y`

These completes all the basic actions that i can think of as required to automate user actions , ofcouse we need to combine many of above to do tasks that simulate real user.
