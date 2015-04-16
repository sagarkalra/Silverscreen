# Silverscreen
## An Alternative to Popups on mobiles

###### Dependencies: jQuery 1.7 & up

###### Usage:

To create a screen with HTML content in a variable 'content' and configuring options and methods.
```
  $.fn.silverScreen(content, {
      exitElement: '.close',
      beforeShow: function() {},
      onHide: function() {}
  });
```

To close the Screen
```
  $.fn.silverScreen.close();
```

You can add your own CSS for the close button. (CSS file not included)
