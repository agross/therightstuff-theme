var openLink =
{
	iconPath: "@blog.baseurl@/themes/@theme.name@/images/new-window-icon.gif",
	linkText: "Open link in new window",
	linkTextSeparator: ": ",
	init: function()
	{
		if (!document.getElementsByTagName || !document.createElement)
		{
			return;
		}

		var links = document.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++)
		{
			var link = links[i];
			if(openLink.isItemLink(link))
			{
				var newLinkImage = document.createElement("img");
				newLinkImage.setAttribute("src", openLink.iconPath);
				newLinkImage.setAttribute("alt", openLink.linkText);

				var newLink = document.createElement("a");
				newLink.setAttribute("href", link.getAttribute("href"));
				newLink.setAttribute("target", "_blank");
				if (link.getAttribute("title"))
				{
					newLink.setAttribute("title", openLink.linkText + openLink.linkTextSeparator + link.getAttribute("title"));
				}
				else
				{
					newLink.setAttribute("title", openLink.linkText);
				}
				newLink.className = "new-window-link";
				newLink.appendChild(newLinkImage);

				link.parentNode.insertBefore(newLink, link.nextSibling);
			}
		}
	},
	isInContent: function(element)
	{
		if(element.parentNode && typeof(element.parentNode.className) !== "undefined")
		{
			if(element.parentNode.className.search(/item-content/i) !== -1)
			{
				return true;
			}
			else
			{
				return openLink.isInContent(element.parentNode);
			}
		}
		else
		{
			return false;
		}
	},
	isItemLink: function (link)
	{
		return link.getAttribute("href") &&
			!link.getAttribute("target") && // Exclude links with a specified target, i.e. link images we inserted.
			link.rel.search(/no-new-window-link/i) === -1 && // Exclude explicitly excluded links.
			openLink.isInContent(link);
	},
	addEvent: function(obj, eventTypes, callback)
	{
		var eventType;
		for(var i = 0; i < eventTypes.length; i++)
		{
			eventType = eventTypes[i];

			if (obj.attachEvent)
			{
				obj["e" + eventType + callback] = callback;
				obj[eventType + callback] = function()
				{
					obj["e" + eventType + callback](window.event);
				};
				obj.attachEvent("on" + eventType, obj[eventType + callback]);
			}
			else
			{
				obj.addEventListener(eventType, callback, false);
			}
		}
	}
};

openLink.addEvent(window, ["load"], openLink.init);