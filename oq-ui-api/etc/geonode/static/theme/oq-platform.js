// arguments: iframe id, height  (e.g., .5 for height="50%")
		function setIframeHeight(id, h) {
			var ifrm = document.getElementById(id);
			if (ifrm) {
				dw_Viewport.getWinHeight();
				ifrm.style.height = Math.round( h * dw_Viewport.height ) + "px";
				
			}
		}
		
		// for sizing and positioning the iframe in the window
		// pass iframe id and height (e.g., .5 for height="50%")
		window.onload = function() { setIframeHeight('ifrm', .85); }
		window.onresize = function() { setIframeHeight('ifrm', .85); }
		
		
var dw_Viewport = {
  
    getWinHeight: function () {
        this.height = 0;
        if (window.innerHeight) 
            this.height = window.innerHeight - 18;
        else if (document.documentElement && document.documentElement.clientHeight) 
            this.height = document.documentElement.clientHeight;
        else if (document.body && document.body.clientHeight) 
            this.height = document.body.clientHeight;
        return this.height;
    },
  
    getScrollX: function () {
        this.scrollX = 0;
        if (typeof window.pageXOffset == "number") 
            this.scrollX = window.pageXOffset;
        else if (document.documentElement && document.documentElement.scrollLeft)
            this.scrollX = document.documentElement.scrollLeft;
        else if (document.body && document.body.scrollLeft) 
            this.scrollX = document.body.scrollLeft; 
        else if (window.scrollX) 
            this.scrollX = window.scrollX;
        return this.scrollX;
    },
    
    getScrollY: function () {
        this.scrollY = 0;    
        if (typeof window.pageYOffset == "number") 
            this.scrollY = window.pageYOffset;
        else if (document.documentElement && document.documentElement.scrollTop)
            this.scrollY = document.documentElement.scrollTop;
        else if (document.body && document.body.scrollTop) 
            this.scrollY = document.body.scrollTop; 
        else if (window.scrollY) 
            this.scrollY = window.scrollY;
        return this.scrollY;
    },
    
    getAll: function () {
        this.getWinHeight();
        this.getScrollX();  
		this.getScrollY();
    }
  
}
