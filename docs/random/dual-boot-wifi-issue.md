# Fixing Intel AX200 Wi-Fi Not Working on Ubuntu (Dual Boot with Windows)


Recently, I faced an annoying issue after booting into Ubuntu which was running alongside Windows(dual boot) on my ASUS VivoBook 14 (Model: M413IA) .My Wifi was not working , i switched to Windows and it worked just fine. MyWifi card is Intel Wi-Fi 6 AX200 card.

After a lot of digging, debugging, and trial-and-error, I figured out the root cause and fixed it. This post documents that journey, in case anyone else is facing the same issue.

**The Symptoms :**

In Ubuntu, running:

```bash
nmcli device
```
The output
```bash

DEVICE           TYPE      STATE                   CONNECTION         
enxca89f39a6d94  ethernet  connected               Wired connection 1 
lo               loopback  connected (externally)  lo                 
docker0          bridge    connected (externally)  docker0
```
Wi-Fi was completely missing.

Then I checked the network hardware:

```bash
sudo lshw -C network
```

The output:
```bash
*-network UNCLAIMED
   description: Network controller
   product: Intel Corporation Wi-Fi 6 AX200
```
The device was "unclaimed" — a clear sign that the kernel recognized it, but no driver was managing it.


**The Error in Logs**

To get more detail, I ran:

`dmesg | grep iwlwifi
`
It showed
```bash
iwlwifi 0000:01:00.0: probe with driver iwlwifi failed with error -110
```

`error -110` typically points to a timeout, meaning the device isn’t responding correctly during initialization.

**What Didn’t Work**

I tried a lot of common fixes:
- Reinstalling `linux-firmware`
- Manually loading the `iwlwifi` module with `modprobe`
- Setting GRUB options like `pcie_aspm=off` and `pci=nomsi`
- Updating initramfs
- Checking `rfkill` (nothing was blocked)
- Enabling Network Stack in BIOS
- Disabling Secure Boot and Fast Boot

None of these worked.


**The Real Cause: Windows Fast Startup**

Eventually, I booted back into Windows to double-check if the card was functional. It was. This confirmed that the hardware wasn’t faulty.

Then I remembered that **Windows Fast Startup** sometimes causes devices to be left in a low-power or suspended state — especially Wi-Fi and Bluetooth cards.

This was the key.

**The Fix That Worked**

Here’s exactly what I did:

1. **Booted into Windows**
2. Went to **Control Panel → Power Options → Choose what the power buttons do**
3. Clicked “Change settings that are currently unavailable”
4. **Disabled**: _Turn on fast startup (recommended)_ `remember: turn this off`
5. Performed a **full shutdown** (Shift + Shutdown)
6. Booted into Ubuntu

Now, the Wi-Fi card is detected properly:'

`nmcli device`

`wlp1s0  wifi      disconnected  -- `

And no more `probe failed with error -110` in `dmesg`.



**Summary**

If your Intel AX200 card isn’t working on Ubuntu and you're dual-booting with Windows, disable Fast Startup in Windows and fully power off the system. The card will reset, and Linux will be able to initialize it properly.

It’s a frustrating issue, but once you know the cause, the fix is pretty simple.
