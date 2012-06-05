var el = document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody'); /* Look for the default post body element */
if(!el) { /* If it isn't found, then perhaps they use an extension that renames the element? */
	el = document.getElementById('wmd-input'); /* This should cover the Forum Enchancer */
}
if (el) { /* If for some reason we still didn't find it, we're kinda screwed */
	chrome.extension.sendRequest({ 
		method: "getSiggy" /* Using Chrome's API, send a request to the background page for the user's siggy */
	}, function(response) {
		var sig = response.status;
		if (el.value.search(sig) == -1) { 
			/* This is supposed to check if you posted and hit the floodcheck and went back to prevent putting the siggy in again */
			el.value = el.value + "\n\n"+sig.replace("\\n",String.fromCharCode(13)); /* Add the siggy to the box */
		}

		if (el.setSelectionRange) {
			/* This little part moves the selection to the beginning of the postbody so you can start typing */
			el.setSelectionRange(0, 0);
		} else if (el.createTextRange) {
			var range = el.createTextRange();
			range.collapse(true);
			range.moveStart('character', 0);
			range.moveEnd('character', 0);
			range.select();
		}
	});
}