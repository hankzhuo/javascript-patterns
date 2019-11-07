/**
 * 工厂模式
 * 
 */ 
 
(function(window, $) {
	function RedCircle() {}

	RedCircle.prototype.create = function() {
		this.item = $('<div class="circle" style="background:red"></div>');
		return this;
	};
	
	function BlueCircle() {}

	BlueCircle.prototype.create = function() {
		this.item = $('<div class="circle" style="background:blue"></div>');
		return this;
	};

	function CircleFactory() {
		this.types = {};
		this.create = function(type) {
			return new this.types[type]().create();
		};

		this.register = function(type, cls) {
			if (cls.prototype.create) {
				this.types[type] = cls
			}
		}
	}
	
	var CircleGeneratorSington = (function() {
		var instance;

		function init() {
			var _aCircle = [],
				_stage = $('.advert'),
				_cf = new CircleFactory();
				_cf.register('red', RedCircle);
				_cf.register('blue', BlueCircle);

			function _position(circle, left, top) {
				circle.css('left', left);
				circle.css('top', top);
			}

			function create(left, top, type) {
				var circle = _cf.create(type).item;
				_position(circle, left, top);
				return circle;
			}

			function add(circle) {
				_stage.append(circle);
				_aCircle.push(circle);
			}

			function index() {
				return _aCircle.length;
			}

			return {
				index: index,
				create: create,
				add: add
			};
		}

		return {
			getInstance: function() {
				// 只创建一次实例
				if (!instance) {
					instance = init();
				}

				return instance;
			}
		};
	})();

	$(window.document).ready(function() {
		$('.advert').click(function(e) {
			var cg = CircleGeneratorSington.getInstance();
			var circle = cg.create(e.pageX - 20, e.pageY - 20, 'red');
			cg.add(circle);
		});
	});

	$(document).keypress(function(e){
		var cg = CircleGeneratorSington.getInstance();
		var circle = cg.create(Math.floor(Math.random()*600), Math.floor(Math.random()*600), 'blue');
		cg.add(circle);
	})
})(window, jQuery);
