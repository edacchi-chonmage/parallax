var Pad = function ($base, lengths) {
	this.$rows;
	this.$blocks;
	this.$base = $base;
	this.lengths = lengths;

	this.init();
};
Pad.prototype = {
	init: function () {
		this.generateBlocks();
		this.bindEvents();
	},
	bindEvents: function () {
		var _this = this;

		this.$blocks.on('click', function () {
			_this.animate($(this));
		});
	},
	animate: function ($blockTarget) {
		var
			$blocksArround = $(),
			$blocksArround2 = $(),
			$rowTarget = $blockTarget.closest('.row'),
			indexY = this.$rows.index($rowTarget),
			$blocksInRowTarget = $rowTarget.find('div'),
			indexX = $blocksInRowTarget.index($blockTarget);

		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 2).find('div').eq(indexX - 2));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 2).find('div').eq(indexX - 1));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 2).find('div').eq(indexX));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 2).find('div').eq(indexX + 1));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 2).find('div').eq(indexX + 2));

		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 1).find('div').eq(indexX - 2));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY - 1).find('div').eq(indexX + 2));

		$blocksArround = $blocksArround.add(this.$rows.eq(indexY - 1).find('div').eq(indexX - 1));
		$blocksArround = $blocksArround.add(this.$rows.eq(indexY - 1).find('div').eq(indexX));
		$blocksArround = $blocksArround.add(this.$rows.eq(indexY - 1).find('div').eq(indexX + 1));

		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY).find('div').eq(indexX - 2));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY).find('div').eq(indexX + 2));

		$blocksArround = $blocksArround.add(this.$rows.eq(indexY).find('div').eq(indexX - 1));
		$blocksArround = $blocksArround.add(this.$rows.eq(indexY).find('div').eq(indexX + 1));

		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 1).find('div').eq(indexX - 2));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 1).find('div').eq(indexX + 2));

		$blocksArround = $blocksArround.add(this.$rows.eq(indexY + 1).find('div').eq(indexX - 1));
		$blocksArround = $blocksArround.add(this.$rows.eq(indexY + 1).find('div').eq(indexX));
		$blocksArround = $blocksArround.add(this.$rows.eq(indexY + 1).find('div').eq(indexX + 1));

		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 2).find('div').eq(indexX - 2));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 2).find('div').eq(indexX - 1));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 2).find('div').eq(indexX));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 2).find('div').eq(indexX + 1));
		$blocksArround2 = $blocksArround2.add(this.$rows.eq(indexY + 2).find('div').eq(indexX + 2));

		$blockTarget.stop().animate({
			opacity: 1
		}, 200, function () {
			$blockTarget.stop().animate({
				opacity: 0.3
			}, 200);
		});

		setTimeout(function () {
			$blocksArround.stop().animate({
				opacity: 1
			}, 200, function () {
				$blocksArround.stop().animate({
					opacity: 0.3
				}, 200);
			});
		}, 50);
		setTimeout(function () {
			$blocksArround2.stop().animate({
				opacity: 1
			}, 200, function () {
				$blocksArround2.stop().animate({
					opacity: 0.3
				}, 200);
			});
		}, 100);
	},
	generateBlocks: function () {
		for (var i = 0; i < this.lengths[0]; i++) {
			var $rowTarget = $('<div class="row">');

			for (var m = 0; m < this.lengths[1]; m++) {
				var $blockTarget = $('<div>');

				$rowTarget.append($blockTarget);

				$blockTarget.css({
					top: m * 55,
					left: i * 55
				});
			}

			this.$base.append($rowTarget);
		}

		this.$rows = this.$base.find('.row');
		this.$blocks = this.$rows.find('div');
	}
};

$(function () {
	new Pad($('#jsi-wrapper'), [10, 10]);
});
