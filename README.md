All my plugins for [Avia client](https://github.com/AvaLilac/for-desktop)

# AddToFavourites

Adds a button to the image viewer to add the image to favourites. Currently no support for adding a custom title because I'm too stupid to figure out how to do it but I might add it in the future. Also for some reason the image only shows up in favourites after you refresh, no fucking clue why that is.

**EXAMPLE:**

<img src ='https://cdn.stoatusercontent.com/attachments/oBqekRKV2PBOEcXNgJ43U6yH6SjoNpoql7m5LNizap/original' width='1199' height ='716'>

# BetterCategories

Makes collapsing categories fully collapse them because for some reason that isn't a thing by default (sometimes)

**IMPORTANT:**

This plugin is a bit buggy and sometimes collapsing a category will do fuck all. If that happens, click random channels in the category and try again until it works, it should eventually

# BetterFavourites

Improves avia's built in favourites system by adding a button to the image viewer to add the image to favourites, a refresh button to the favourites panel (click to make images/gifs added via the add favourites button show up) and making clicking on an image/gif put the link into the chat bar instead of copying it to the clipboard. This plugin is just a combination of AddToFavourites,FavsToChat and a new refresh button.

# ButtonFix

Fixes avia buttons injecting in channels where you can't send messages. I'm sure a fix for this will be integrated at some point, but if you're impatient like me here's a fix for in the meantime

# ChunkyMembers

Makes the member and pinned message lists cover the chat entirely. I recommend combining it with the following css:

```css
/*Add a background image to member and pinned messages list*/
[class='will-change_transform scr-bar-c_var(--md-sys-color-primary)_transparent ov-y_auto ov-x_hidden ov_hidden! scr-bar-g_stable flex-sh_0 w_var(--layout-width-channel-sidebar) bdr_var(--borderRadius-lg)']{
background-image: url("YOUR IMAGE URL HERE");
background-size: cover;
position:relative;
right:32px;
}
[class='will-change_transform scr-bar-c_var(--md-sys-color-primary)_transparent ov-y_auto ov-x_hidden ov_hidden! scr-bar-g_stable flex-sh_0 w_var(--layout-width-channel-sidebar) bdr_var(--borderRadius-lg) ov-y_scroll! ov-x_hidden!']{
    background-image: url("YOUR IMAGE URL HERE");
    background-size: cover;
    position:relative;
    right:32px;
}
```

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


# GifFix

Fixes gifs and animated emojis not animating when they should

# HideImageLinks

Hides image links if they're the only content in the message

**EXAMPLE:**

<img src ='https://cdn.stoatusercontent.com/attachments/UIrGkC6ipDiOpd0t3FHHzMAaIH9sG8_-tqc93RbHB0/original' width='1330' height='420'>

# NoAnnoyingToolTips

Removes annoying tooltips (eg toggle main sidebar)

# ShrinkEmojis

It shrinks emojis 🤯

# UpdateChecker

Adds an update checker for local plugins and the ability to install any updates it finds

**IMPORTANT:**

- The update checker requires a url to be present for the plugin in order to check for updates. This means it won't work for local plugins you added before installing unless you uninstall and reinstall them

- This url should be the **DIRECT** link to the plugin's js file, the same one you would use if you were adding it as a non local plugin

# WARNING!

I have severe brain damage so these plugins probably have some quite serious flaws, but from my testing they work

if anything doesn't work properly, feel free to contact me on stoat (0simp#2291) to tell me how fucking stupid I am, or fix it yourself (tbh if you know ANYTHING about coding you're probably better off doing the latter)
