var numAds = 0;

function GetAdTag(size) {
	var adTagStr = "";
	if (size == 728) {
		adTagStr = "<iframe frameborder='0'\
        scrolling='no'\
        marginwidth='0'\
        marginheight='0'\
        width='728'\
        height='90'\
        \
		src='http://ak-cdn.placelocal.com/js/v3/iframetag?creativeUrl=http%3A%2F%2Fcreative.placelocal.com%2Fv3.placelocal.com%2F19062476-ad62-11e4-9768-002590592b46%2Fleaderboard.js&campaignID=445831&dimension_name=leaderboard&domain_name=ak-cdn.placelocal.com&tracking_url=tracking.placelocal.com&clickTag=&random=&animationTime=30&landing_page=http%3A%2F%2Fwww.laboulangebakery.com'>\
		    <a href='http://tracking.placelocal.com/click?campaign_id=445831&dimension_name=leaderboard&random=&url=http%3A%2F%2Fwww.laboulangebakery.com' target='_blank' style='display:inline-block'>\
		        <img src='http://ak-cdn.placelocal.com/backup_image.php?campaign_id=445831&width=728&height=90' border='0' />\
		    </a>\
		    <img src='http://tracking.placelocal.com/pixel?campaign_id=445831&dimension_name=leaderboard&random=' border='0' style='display:none' />\
		\
		</iframe>";
	} else if (size == 160) {
		adTagStr = "<iframe frameborder='0'\
        scrolling='no'\
        marginwidth='0'\
        marginheight='0'\
        width='160'\
        height='600'\
		\
        src='http://ak-cdn.placelocal.com/js/v3/iframetag?creativeUrl=http%3A%2F%2Fcreative.placelocal.com%2Fv3.placelocal.com%2F19062476-ad62-11e4-9768-002590592b46%2Fskyscraper.js&campaignID=445831&dimension_name=skyscraper&domain_name=ak-cdn.placelocal.com&tracking_url=tracking.placelocal.com&clickTag=&random=&animationTime=30&landing_page=http%3A%2F%2Fwww.laboulangebakery.com'>\
		    <a href='http://tracking.placelocal.com/click?campaign_id=445831&dimension_name=skyscraper&random=&url=http%3A%2F%2Fwww.laboulangebakery.com' target='_blank' style='display:inline-block'>\
		        <img src='http://ak-cdn.placelocal.com/backup_image.php?campaign_id=445831&width=160&height=600' border='0' />\
		    </a>\
		    <img src='http://tracking.placelocal.com/pixel?campaign_id=445831&dimension_name=skyscraper&random=' border='0' style='display:none' />\
		\
		</iframe>";
	} else {
		adTagStr = "<iframe frameborder='0'\
        scrolling='no'\
        marginwidth='0'\
        marginheight='0'\
        width='300'\
        height='250'\
		\
        src='http://ak-cdn.placelocal.com/js/v3/iframetag?creativeUrl=http%3A%2F%2Fcreative.placelocal.com%2Fv3.placelocal.com%2F19062476-ad62-11e4-9768-002590592b46%2Fmedium_rectangle.js&campaignID=445831&dimension_name=medium_rectangle&domain_name=ak-cdn.placelocal.com&tracking_url=tracking.placelocal.com&clickTag=&random=&animationTime=30&landing_page=http%3A%2F%2Fwww.laboulangebakery.com'>\
		    <a href='http://tracking.placelocal.com/click?campaign_id=445831&dimension_name=medium_rectangle&random=&url=http%3A%2F%2Fwww.laboulangebakery.com' target='_blank' style='display:inline-block'>\
		        <img src='http://ak-cdn.placelocal.com/backup_image.php?campaign_id=445831&width=300&height=250' border='0' />\
		    </a>\
		    <img src='http://tracking.placelocal.com/pixel?campaign_id=445831&dimension_name=medium_rectangle&random=' border='0' style='display:none' />\
		    \
		</iframe>";
	}
	return adTagStr;
}

function addAds(elms, width, height) {
	var arrOverlayPos = [];
	var arrAds = [];
	var adTagStr = GetAdTag(width);
	$.each( elms, function( key, val ) {
		console.log($(val));

		var pos = {top:$(val).offset().top - $(val).scrollTop(), left:$(val).offset().left - $(val).scrollLeft()};
		
		// skip if there is already an overlay in same position
		for	(var index = 0; index < arrOverlayPos.length; index++) {
		    if (arrOverlayPos[index].left == pos.left && arrOverlayPos[index].top == pos.top) {
		    	return true;
		    }
		}

		arrOverlayPos.push(pos);

		
		if ($(val).is("iframe"))
		{
			if ($(val).contents() != undefined) {
				numAds = numAds + 1;
				$(val).contents().find('body').html(adTagStr);
			} else {
				console.log('undefined iframe content found');
				console.log(val);
			}
			
		} else {
			numAds = numAds + 1;
			$(val).html(adTagStr);
		}
	});
}

function ReplaceAds() {	
	//300x250, 728x90, 160x600
	var elms300 = $("div,iframe,embed").filter(function(){
		return ($(this).outerWidth() == 300 && $(this).outerHeight() == 250);
	});
	addAds(elms300,300,250);

	var elms728 = $("div,iframe,embed").filter(function(){
		return ($(this).outerWidth() == 728 && $(this).outerHeight() == 90);
	});
	addAds(elms728,728,90);

	var elms160 = $("div,iframe,embed").filter(function(){
		return ($(this).outerWidth() == 160 && $(this).outerHeight() == 600);
	});
	addAds(elms160,160,600);

	// show message
	$("body").append("<div id='byotMsg' class='byotBgColor'></div>");
	$('#byotMsg').html('found '+numAds+' ads on this page.');
	$('#byotMsg').fadeIn().delay(5000).fadeOut();
}

ReplaceAds();

