All my plugins for [Avia client](https://github.com/AvaLilac/for-desktop)

# AddToFavourites

Adds a button to the image viewer to add the image to favourites. Currently no support for adding a custom title because I'm too stupid to figure out how to do it but I might add it in the future. Also for some reason the image only shows up in favourites after you refresh, no fucking clue why that is.

**EXAMPLE:**

<img src ='https://cdn.stoatusercontent.com/attachments/oBqekRKV2PBOEcXNgJ43U6yH6SjoNpoql7m5LNizap/original' width='1199' height ='716'>

# BetterFavourites

Improves avia's built in favourites system by adding a button to the image viewer to add the image to favourites, a refresh button to the favourites panel (click to make images/gifs added via the add favourites button show up) and making clicking on an image/gif put the link into the chat bar instead of copying it to the clipboard. This plugin is just a combination of AddToFavourites,FavsToChat and a new refresh button.

# ButtonFix

Fixes avia buttons injecting in channels where you can't send messages. I'm sure a fix for this will be integrated at some point, but if you're impatient like me here's a fix for in the meantime

# CopyAttachmentLink

Adds a button to non-image/video attachments to copy the attachment link

**EXAMPLE:**

<img src="https://cdn.stoatusercontent.com/attachments/PVa1fivgi5zuQ9VSC6pilOkI__imR-h38zO8w2GGMa/original" width="1569" height="221">

# CustomHomeButton

Allows you to set a custom home button image

**HOW TO USE:**

After enabling the plugin, paste the following into your quick css:
```css
[class='homebutton']{
    background-image:url('YOUR IMAGE URL HERE');
    background-size:contain;
    height:32px;
}
```

# EmojiSounds

Allows you to set sounds to be played when certain emojis are sent in chat

**HOW TO USE:**

After enabling the plugin, go into your user settings and click on the button that says '(Avia Emoji Sounds Settings)'. Then, paste the emoji and the direct link to the sound you want in the appropriate boxes.

**IMPORTANT:**

If you are adding a built in emoji, make sure it is the unicode character for that emoji, not the name surrouned by colons (eg 💩 instead of :poop:)

If you are adding a custom emoji, make sure it includes colons surrounding the id (eg :01KM6WXFGF24VTEEJ4RPR56N1Q: instead of 01KM6WXFGF24VTEEJ4RPR56N1Q)

# FavsToChat

Makes clicking an image/gif in the favourites panel put the link in the chat bar instead of copying it to the clipboard

# ForceEmojiPack

Forces emojis in embeds and message reactions to use your selected emoji pack

**HOW TO USE**

After installing the plugin, open your user settings and click on the "appearance" tab. Once you've done that, the plugin should work. You can test it by reacting to a message with any default emoji and if the emoji is rendered from your selected emoji pack, the plugin works.


# ShrinkEmojis

It shrinks emojis 🤯

# WARNING!

I have severe brain damage so these plugins probably have some quite serious flaws, but from my testing they work

if anything doesn't work properly, feel free to contact me on stoat (0simp#2291) to tell me how fucking stupid I am, or fix it yourself (tbh if you know ANYTHING about coding you're probably better off doing the latter)
