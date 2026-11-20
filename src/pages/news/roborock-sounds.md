---
layout: ../../layouts/DocsLayout.astro
title: How to Customize the Sounds on a Roborock Vacuum
date: 2026-10-23
author: Zachary Bomke
description: Guide to replacing the default voice lines on a rooted Roborock vacuum using Valetudo and a bind mount.
---

> Written on 2026-10-23. Tested on a Roborock Q7 Max+. Commands written for Linux systems in mind, as long as you have SSH this all should still work though.

> [!warning] Disclaimer
> I am not responsible for any damage inflicted on your robot by following this guide. This worked on my vacuum, but it might permanently brick yours. I am a 19 year old idiot. Take that for what you will.

> [!abstract]- Summary
> We're going to replace the sounds on the robot by extracting the original sound files, then pushing a folder with a new sound pack and creating a bind mount to override the original sounds while leaving them in place.

> [!info]- First, root the device
> You must root the vacuum with [Valetudo](https://valetudo.cloud/) first before continuing. If you have the same vacuum, [this video guide](https://www.youtube.com/watch?v=qHuCcxR9jNc) is great, otherwise be careful to not leave screws behind and keep them fairly organized.

Once you have your vacuum rooted, connect to it via SSH. We're going to copy all the original sounds onto your computer first to make it easier to build a sound pack.

```bash
# Edit VACUUM_IP and adjust the second path if you want it saved somewhere else
scp -O "root@VACUUM_IP:/mnt/resources/audio_default/sounds/*.ogg" ~/Documents/roborock_original_sounds/
```

You will now have a folder with all the sounds your robot can say. You can play these and see what you want to do with them, and just override the sounds as you please. There are plenty of tools online to generate audio in voices of your choice, I'm not going to link to any specific one because the meta for them will likely change pretty quickly. Roborock takes these sounds as a `.ogg`, other formats can be easily converted over to be compatible with `ffmpeg`:

```bash
for f in *.mp3; do ffmpeg -i "$f" -c:a libvorbis "${f%.mp3}.ogg"; done
```

Once your voice pack is done, push the new sounds onto the robot!

```bash
# Run inside the folder where your .ogg files are located, replace VACUUM_IP with yours
ssh VACUUM_IP mkdir -p /mnt/data/custom_sounds
scp -O ./*.ogg root@VACUUM_IP:/mnt/data/custom_sounds/
```

Because the firmware is read-only and to reduce the risk of breaking anything, we will use a [bind mount](https://www.baeldung.com/linux/bind-mounts) to make the system sound folder point to our new custom folder we just pushed. This will not persist on restart (yet), so if something weird happens for any reason you _should_ be able to just reboot and it'll go back exactly how it was before.

```bash
# SSH on the robot
mount --bind /mnt/data/custom_sounds /mnt/resources/audio_custom/sounds
```

Now, start a clean or any action that you changed the sound for and you should now hear your new sounds! Once you make sure everything works, add the bind command to the end of your Valetudo startup script like so:

```bash
#!/bin/bash
if [[ -f /mnt/data/valetudo ]]; then
        mkdir -p /mnt/data/miio/

        if grep -q -e "cfg_by=tuya" -e "cfg_by=rriot" /mnt/data/miio/wifi.conf; then
                sed -i "s/cfg_by=tuya/cfg_by=miot/g" /mnt/data/miio/wifi.conf
                sed -i "s/cfg_by=rriot/cfg_by=miot/g" /mnt/data/miio/wifi.conf
                echo region=de >> /mnt/data/miio/wifi.conf
                echo 0 > /mnt/data/miio/device.uid
                echo "de" > /mnt/data/miio/device.country
        fi

        # Delete useless cleanup logs on each boot to enable Valetudo to update itself
        rm -r /mnt/data/rockrobo/rrlog/*REL

        VALETUDO_CONFIG_PATH=/mnt/data/valetudo_config.json /mnt/data/valetudo >> /dev/null 2>&1 &

        mount -o bind /mnt/data/custom_sounds /mnt/resources/audio_custom/sounds # Custom change for audio
fi

### It is strongly recommended that you put your changes inside the IF-statement above. In case your changes cause a problem, a factory reset will clean the data partition and disable your chances.
### Keep in mind that your robot model does not have a recovery partition. A bad script can brick your device!
```

Congratulations, you now have a clanker that will say whatever cool or silly things you want! If something didn't go how you expected, you can try shooting me a message on the [contact page](/contact) of the site and maybe we can figure something out together and I'll make this page better in turn.
