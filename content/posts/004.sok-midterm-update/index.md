---
title: "SOK2026: Porting energy measurement scripts of KEcoLab to Wayland"
summary: "Mid term update for SOK2026"
toc: false
readTime: false
autonumber: false
date: 2026-03-02T23:00:00+06:30
math: false
showTags: false
hideBackToTop: true
categories: ['kde','tech']
tags: ['kde','sok2026','KEcoLab','Kde Eco']
---

## About me

Hi Everyone ,I am Hrishikesh Gohain a third year undergraduate student in Computer Science & Engineering from India. For the past few weeks I have been working as a Season of KDE mentee with my mentors Joseph P. De Veaugh-Geiss ,Aakarsh MJ and Karanjot Singh.
This post summarizes the work I have done until Week 5.

## About KEcoLab

[KDE Eco](https://eco.kde.org/) is an ongoing initiative by the KDE Community that promotes the use and development of Free , Open Source and Sustainable Software. [KEcoLab](https://invent.kde.org/sdk/kecolab) is a project that allows you to measure energy consumption of your software through ci/cd pipeline using a remote lab.It also generates a detailed report which can further be used to document and review the energy consumed when using one's software and to obtain Blue Angel eco certification.

## About the SOK Project

The Lab computer on which the software runs for testing was migrated to Fedora 43 recently, which comes with Wayland by default. Writing Standard Usage Scenario scripts, which are needed to emulate user behavior, was previously done with xdotool, but that will not work on Wayland. My work so far has been to port the existing test scripts to a Wayland-compatible tool. For those who want to contribute test scripts to measure their own software , the current scripts can be taken as a reference. My next tasks are to prepare new test scripts to measure energy usage of Plasma Desktop Environmen itself.

## Work done so Far

### Week 1

In the first week I studied the Lab architecture and how testing of software is done using KEcoLab. The work done by past mentees as part of SOK and GSoC was very helpful for my research which you can read [here](https://eco.kde.org/blog/2023-06-13-gsoc23-energy-measurement-lab/) , [here](https://eco.kde.org/blog/) and [here](https://eco.kde.org/categories/kde-eco/). I also set up access to the lab computers through SSH. RDP access had some issues which were solved with the help of my mentors. To replicate the lab environment locally, I set up a Fedora 43 Virtual Machine so that I can test scripts under the same Wayland environment as the lab PC.
I also documented and published a [blog](https://hrishikeshgohain.netlify.app/posts/002.why-measure-software/) about the project and shared with my university community to promote the use of Free and Open Source Software and how it relates to sustainability.

### Week 2 and Week 3

I communicated with my mentors and other community members to decide the new wayland compatible tool. After evaluating different options, we decided to use:

- ydotool: for key press, mouse clicks and movements (works using the uinput subsystem)
- kdotool : for working with application windows (focusing, identifying window IDs, etc.)

A combination of tools was required to meet all our requirements. To help future contributors, I published my first blog on Planet KDE explaining how to set up and use ydotool and kdotool . I also imported the repositories into KDE Invent for long term compatibility and wrote setup scripts for easier installation and configuration. These tools did not work out of the box and I had to make some workarounds and setup before usage which i documented in the blog.

### Week 4 and Week 5

During these weeks, along with my mentors, I installed and set up the required tools on the Lab PC. I then ported the test scripts of Okular from xdotool to ydotool and kdotool and did testing on my local machine first. Currently, the CI/CD infrastructure through which these scripts run on the Lab PC is temporarily broken due to the migration to Fedora 43. Once these issues are fixed, we will test the new Wayland compatible scripts on the actual lab hardware and compare the results with previous measurements.

## Next Steps

I will be working on measuring energy usage of Plasma Desktop Environment itself. It will be more challenging than measuring a normal software application because Plasma is not a single process. It is made up of multiple components such as KWin (compositor), plasmashell, background services, widgets, and system modules. All of these together form the desktop experience.

Unlike normal applications like Okular or Kate, Plasma is always running in the background. So we cannot simply “open” and “close” it like a normal app. Because of this, some changes may be required in the current way of testing using KEcoLab.

To properly design the Standard User Scenario (SUS) scripts for Plasma, I will discuss closely with my mentors and also seek feedback and suggestions from the Plasma community. Defining what should be considered a “standard” usage pattern will require careful discussion and community input.

## Lessons learned

It has been a very amazing journey till now. I learned how to make right choices of tools/software after properly understanding the requirements instead of directly starting implementation.

## Thank You Note

I'd like to take a moment to thank my mentors Aakarsh, Karanjot, and Joseph. I am also thankful to the KDE e.V. and the KDE community for supporting us new contributors in the incredible KDE project.

[KEcoLab](https://invent.kde.org/sdk/kecolab) is hosted on Invent. Are you interested in contributing? You can join the Matrix channels [Measurement Lab Development](https://matrix.to/#/#kde-eco-dev:kde.org) and [KDE Eco](https://matrix.to/#/#kde-eco:kde.org) and introduce yourself.

Thank you!
