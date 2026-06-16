All my plugins for [Avia client](https://github.com/AvaLilac/for-desktop)

Plugins marked as (REDUNDANT) are no longer needed because their functionality exists in either normal stoat or avia and will therefore not receive updates

Plugins marked as (DISCONTINUED) will no longer recieve updates, either because they have been replaced by something else or because I can't be bothered

# AddToFavourites (DISCONTINUED)

Adds a button to the image viewer to add the image to favourites. Currently no support for adding a custom title because I'm too stupid to figure out how to do it but I might add it in the future. Also for some reason the image only shows up in favourites after you refresh, no fucking clue why that is. This plugin has been discontinued in favour of BetterFavourites

**EXAMPLE:**

<img src ='https://cdn.stoatusercontent.com/attachments/oBqekRKV2PBOEcXNgJ43U6yH6SjoNpoql7m5LNizap/original' width='1199' height ='716'>

# BetterCategories (DISCONTINUED)

Makes collapsing categories fully collapse them because for some reason that isn't a thing by default (sometimes). This plugin has been discontinued because it is a buggy fucking mess. I may recontinue it at some point if I feel like it

**IMPORTANT:**

This plugin is a bit buggy and sometimes collapsing a category will do fuck all. If that happens, click random channels in the category and try again until it works, it should eventually

# BetterDownloadButton

Prevents download buttons from opening new tabs. If your browser supports it (all major browsers apart from firefox and safari do, the desktop app also does), clicking download buttons will display a window like the one shown below that lets you choose where to save the file, otherwise it will save to your downloads folder

<img src='https://cdn.stoatusercontent.com/attachments/Jz6-gTxWA4nCOmOLwRI-y9l3mEPO3qTVHP1vnjC8TK/original'>

# BetterFavourites

Improves avia's built in favourites system by adding a button to the image viewer to add the image to favourites, a refresh button to the favourites panel (click to make images/gifs added via the add favourites button show up) and making clicking on an image/gif put the link into the chat bar instead of copying it to the clipboard. This plugin is just a combination of AddToFavourites,FavsToChat and a new refresh button. 

# BetterImageViewer

Improves stoat's image viewer by adding a button to view the image in a new tab. Also fixes the bar thing with all the buttons on it going off the screen on phones

**EXAMPLE:**

<img src='https://cdn.stoatusercontent.com/attachments/EkENTrjbMWB8msgwi8TIu8Jr32-yoX-MptCWvVpbpG/original'>

(it's the third button from the left)

# ButtonFix (REDUNDANT)

Fixes avia buttons injecting in channels where you can't send messages. This plugin is now redundant because it has been integrated into avia (I can technically say I contributed something to avia now 😎)

# ChunkyMembers

Makes the member and pinned message lists cover the chat entirely. I recommend combining it with the following css:

```css
/*Add a background image to member and pinned messages list*/
[class='will-change_transform scr-bar-c_var(--md-sys-color-primary)_transparent ov-y_auto ov-x_hidden ov_hidden! scr-bar-g_stable flex-sh_0 w_var(--layout-width-channel-sidebar) bdr_var(--borderRadius-lg)']{
background-image: url("YOUR IMAGE URL HERE");
background-size: cover;
position:relative;
right:16px;
}
[class='will-change_transform scr-bar-c_var(--md-sys-color-primary)_transparent ov-y_auto ov-x_hidden ov_hidden! scr-bar-g_stable flex-sh_0 w_var(--layout-width-channel-sidebar) bdr_var(--borderRadius-lg) ov-y_scroll! ov-x_hidden!']{
    background-image: url("YOUR IMAGE URL HERE");
    background-size: cover;
    position:relative;
    right:16px;
}
```

# ClickSounds

Plays a sound effect whenever you click on a button.

**UI FOR SETTING THE CLICK SOUND (accessed via user settings):**

<img src='https://cdn.stoatusercontent.com/attachments/g-fRAhuhIAt0QL6e3Mgo72bY3ar7F4Z7TGtNszdzXw/original'>

# CopyAttachmentLink

Adds a button to non-image/video attachments to copy the attachment link

**EXAMPLE:**

<img src="https://cdn.stoatusercontent.com/attachments/PVa1fivgi5zuQ9VSC6pilOkI__imR-h38zO8w2GGMa/original" width="1569" height="221">

# CopyRoleID

Makes it possible to copy role ids without needing the manage roles permission. Note that the member list for each server needs to be loaded in order for this plugin to work, so if you try to copy a role's id and see text that says "Couldn't copy role id", briefly open the member list then try again. To use simply press the "copy role id" button in the user roles modal

<img src="https://cdn.stoatusercontent.com/attachments/JLnHARt9_PFodEJsLOMsGsQd8W1ZJcyND7GvNYq8pJ/original">

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

# DeleteMessagesOnBan (REDUNDANT)

Allows you to delete a user's messages from up to the past 7 days when banning them. This plugin is now redundant because its functionality exists in normal stoat

# EditEmojis

Adds client side support for renaming emojis. Note that even if the emoji is successfully renamed, the new name will not show up client side until you refresh. This is a stoat issue that I don't think I can do anything about

**Screenshot of the ui for renaming emojis:**

<img src='https://cdn.stoatusercontent.com/attachments/LueCbA5ZrhQPhunndpWQvH_nCAo8cyGLJg1roiT64E/original'>

# EmojiSounds

Allows you to set sounds to be played when certain emojis are sent in chat

**HOW TO USE:**

After enabling the plugin, go into your user settings and click on the button that says '(Avia Emoji Sounds Settings)'. Then, paste the emoji into the emoji box and upload a sound file

**IMPORTANT:**

If you are adding a built in emoji, make sure it is the unicode character for that emoji, not the name surrouned by colons (eg 💩 instead of :poop:)

If you are adding a custom emoji, make sure it includes colons surrounding the id (eg :01KM6WXFGF24VTEEJ4RPR56N1Q: instead of 01KM6WXFGF24VTEEJ4RPR56N1Q)

# FavsToChat (DISCONTINUED)

Makes clicking an image/gif in the favourites panel put the link in the chat bar instead of copying it to the clipboard. This plugin has been discontinued in favour of BetterFavourites

# ForceEmojiPack (REDUNDANT)

Forces emojis in embeds and message reactions to use your selected emoji pack. This plugin is now redundant because its functionality exists in normal stoat

**HOW TO USE**

After installing the plugin, open your user settings and click on the "appearance" tab. Once you've done that, the plugin should work. You can test it by reacting to a message with any default emoji and if the emoji is rendered from your selected emoji pack, the plugin works.


# GifFix (REDUNDANT)

Fixes gifs and animated emojis not animating when they should. This plugin is now redundant because its functionality exists in normal stoat

# HideImageLinks

Hides image links if they're the only content in the message

**EXAMPLE:**

<img src ='https://cdn.stoatusercontent.com/attachments/UIrGkC6ipDiOpd0t3FHHzMAaIH9sG8_-tqc93RbHB0/original' width='1330' height='420'>

# KickMembersFromGC (REDUNDANT)

Adds a context menu button to kick members from group chats. This plugin is now redundant because its functionality exists in normal stoat

**WARNING:**

This plugin contains a token grabber because your token is required to kick members from group chats. You can read through the code to verify that it is safe, or if you still don't feel comfortable with it just don't use the plugin

Also note that the button will not show if you click onto a group chat as soon as you load into stoat. If you do that, scroll up in the channel to load more messages, then it should show.

# NoAnnoyingToolTips

Removes annoying tooltips (eg toggle main sidebar)

# RoleIcons (REDUNDANT)

Adds client side support for adding and displaying role icons. This plugin is now redundant because its functionality exists in normal stoat

**HOW TO ADD ROLE ICONS:**

Go into server settings, click on "Roles" then click on the role you want to add an icon to. Click the empty circle towards the top of the page, which should open a file selection window. Select the image you want to use as an icon, then press the "upload" button. Finally, type something in the role name box to enable the save button (you can undo whatever you typed in there afterwards), then click the save button.

**A FEW THINGS TO NOTE:**

1) This plugin contains a token grabber because your token is required to use the apis this plugin uses. You can check through the code to make sure it's safe if you don't trust me, or if you STILL don't trust me then just don't use it

2) Role icons will only be displayed if you have already triggered some requests. The easiest way to do this is to click on a random dm after loading stoat

3) Displaying role icons in a server also requires fetching the members. If you have the member list open all the time, this will happen automatically whenever you click on a channel. Otherwise, you will have to open the member list briefly each time you click on a channel.

4) Finally, displaying role icons also requires loading messages in the channel so the code knows which messages to display icons next to. To do this, simply scroll up in the channel until you load new messages, then the icons should display

5) Icons are also not displayed in the role editor ui even if the role does have an icon. I may release an update in the future to change this

# ShowOldMessageTimes

Makes timestamps on messages older than 1 week show the time the message was sent next to them

# ShrinkEmojis

It shrinks emojis 🤯

# SilentLeaveGCs

Allows you to leave group chats silently (without notifying other members)

# Slowmode

Allows you to set slowmode for channels (IN SECONDS). Also adds a popup for channels with slowmode, as seen below:

<img src ='https://cdn.stoatusercontent.com/attachments/hIPm_6blGKYWWSgJw3sNY5nmFDLM3E0c3bn7F0ofxC/original' width ='1279' height='79'>

**IMPORTANT:**

Typing in the slowmode input box will not enable the save and reset buttons. To get around this, type something into one of the other boxes (eg description) and press backspace in that box to undo it

# StoatImageFix

Fixes images hosted on cdn.stoatusercontent.com not embedding

**WITHOUT THE PLUGIN:**

<img src='https://cdn.stoatusercontent.com/attachments/jmfJdjMbFRjm_Ui0Bs24JiVF5wlD4verfZtAjJYjhZ/original'>

**WITH THE PLUGIN:**

<img src='https://cdn.stoatusercontent.com/attachments/2Pe9wK7SiYic3YiTAERR3eO1qg4q3k0eTETzp-HYEV/original'>

# Timeout

Adds a button for adding and removing timeouts from members

**EXAMPLE:**

<img src='https://cdn.stoatusercontent.com/attachments/_HCbe-9PdjfTxbeZL4iMWggF-tKsGZGIzY8k7zkUKQ/original'>

Also note that the timeout button gets added if either the ban or kick buttons are present in the member context menu, therefore it may incorrectly get added if you have permission to either ban or kick, but not timeout or it may incorrectly not get added if you have permission to timeout, but not ban or kick.

# UpdateChecker

Adds an update checker for local plugins and the ability to install any updates it finds

**IMPORTANT:**

- The update checker requires a url to be present for the plugin in order to check for updates. This means it won't work for local plugins you added before installing unless you uninstall and reinstall them

- This url should be the **DIRECT** link to the plugin's js file, the same one you would use if you were adding it as a non local plugin

# WARNING!

I have severe brain damage so these plugins probably have some quite serious flaws, but from my testing they work

if anything doesn't work properly, feel free to contact me on stoat (0simp#2291) to tell me how fucking stupid I am, or fix it yourself (tbh if you know ANYTHING about coding you're probably better off doing the latter)
