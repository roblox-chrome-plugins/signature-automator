var el = document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody');
if(!el){
el = document.getElementById('wmd-input');
}
if (el) {
	chrome.extension.sendRequest({
		method: "getSiggy"
	}, function(response) {
		var sig = response.status;
		if (el.value.search(sig) == -1) {
			el.value = el.value + "\n\n"+sig.replace("\\n",String.fromCharCode(13));
		}

        if (el.setSelectionRange)
            el.setSelectionRange(0, 0);
        else if (el.createTextRange) {
            var range = el.createTextRange();
            range.collapse(true);
            range.moveStart('character', 0);
            range.moveEnd('character', 0);
            range.select();
        }
	});
}