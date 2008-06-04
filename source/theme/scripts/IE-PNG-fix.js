/*
Handlex PNG transparency correctly on IE 5.5 and 6.
http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.

Use in <HEAD> with DEFER keyword wrapped in conditional comments:
<!--[if lt IE 7]>
<script defer type="text/javascript" src="pngfix.js"></script>
<![endif]-->
*/

var arVersion = navigator.appVersion.split("MSIE");
var version = parseFloat(arVersion[1]);

if (version >= 5.5 && document.body.filters)
{
	for (var i = 0; i < document.images.length; i++)
	{
		var img = document.images[i];
		if (img.src.search(/\.png$/i) !== -1)
		{
			var imgID = (img.id) ? "id='" + img.id + "' " : "";
			var imgClass = (img.className) ? "class='" + img.className + "' " : "";
			var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
			var imgStyle = "display: inline-block;" + img.style.cssText;
			if (img.align.search(/left/) !== -1)
			{
				imgStyle = "float: left;" + imgStyle;
			}
			if (img.align.search(/right/) !== -1)
			{
				imgStyle = "float: right;" + imgStyle;
			}
			if (img.parentElement.href)
			{
				imgStyle = "cursor: hand;" + imgStyle;
			}

			var strNewHTML = "<span " + imgID + imgClass + imgTitle	+
				" style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" +
				" filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" +
				" (src=\'" + img.src + "\', sizingMethod='scale');\"></span>";

			img.outerHTML = strNewHTML;
			i = i - 1;
		}
	}
}
