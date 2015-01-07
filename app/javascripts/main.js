var ParallaxManager = function (objects) {
	this.$win = $(window);
	this.objects = objects;

	this.init();
};
ParallaxManager.prototype = {
	init: function () {
		this.drawAll();
		this.bindEvents();
	},
	bindEvents: function () {
		var _this = this;

		this.$win.on('scroll', function () {
			_this.drawAll();
		});
	},
	drawAll: function () {
		var scrollTopWindow = this.$win.scrollTop();

		$.each(this.objects, $.proxy(function (i) {
			this.objects[i].draw(scrollTopWindow);
		}, this));
	},
	addObject: function (params) {
		this.objects.push(params);
	}
};

var Object4Parallax = function (params) {
	$.extend(this, params);

	this.init();
};
Object4Parallax.prototype = {
	init: function () {
		// this.computeRatio
	},
	draw: function (stWindow) {
		var
			styles4Move = {},
			scrollTopMovedFromStart = stWindow - this.stStart,
			ratioScrolled = scrollTopMovedFromStart / this.stDistance;

		if (ratioScrolled < 0) {
			ratioScrolled = 0;
		} else if (ratioScrolled > 1 && !this.flagRepeat) {
			ratioScrolled = 1;
		}

		if (ratioScrolled > 1 && Math.floor(ratioScrolled) % 2 === 0 && this.flagRepeat) {
			console.log(1);
			ratioScrolled = 1 - (ratioScrolled - Math.floor(ratioScrolled));
		} else if (ratioScrolled > 1 && this.flagRepeat) {
			ratioScrolled = ratioScrolled - Math.floor(ratioScrolled);
		}

		for (var key in this.stylesStart) {
			styles4Move[key] = this.stylesStart[key] + (this.stylesEnd[key] * ratioScrolled);

			if (key === 'rotate') {
				styles4Move.transform = 'rotate(' + styles4Move[key] + 'deg)';
			}
		}

		this.$target.css(styles4Move);
	}
};

$(function () {
	new ParallaxManager([
		new Object4Parallax({
			$target: $('.block.one'),
			stStart: 0,
			stDistance: 150,
			flagRepeat: true,
			stylesStart: {
				opacity: 0
			},
			stylesEnd: {
				opacity: 1
			}
		}),
		new Object4Parallax({
			$target: $('.block.two'),
			stStart: 250,
			stDistance: 500,
			flagRepeat: true,
			stylesStart: {
				opacity: 0
			},
			stylesEnd: {
				opacity: 1
			}
		}),
		new Object4Parallax({
			$target: $('.block.thr'),
			stStart: 500,
			stDistance: 500,
			flagRepeat: true,
			stylesStart: {
				opacity: 0
			},
			stylesEnd: {
				opacity: 1
			}
		})
	]);
});
