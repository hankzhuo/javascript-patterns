/**
 * 单例模式
 * 点击页面，生成很多点，每次重复生成 div，其实只需要一个实例，重复使用
 */ 
 
/*
* 初学者写代码
(function(window, $) {
  $(window.document).ready(function() {
    $('.advert').click(function(e) {
      var circle = $('<div class="circle"></div>');
      circle.css('left', e.pageX - 25)
      circle.css('left', e.pageY - 25);
      $('.advert').append(circle)
    })
  })
})(window, jQuery)
*/

(function(window, $) {
	var CircleGeneratorSington = (function() {
		var instance;

		function init() {
			var _aCircle = [],
        _stage = $('.advert');
        
			function _position(circle, left, top) {
				circle.css('left', left);
				circle.css('left', top);
			}

			function create(left, top) {
				var circle = $('<div class="circle"></div>');
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
			var circle = cg.create(e.pageX - 25, e.pageY - 25);
      cg.add(circle);
		});
	});
})(window, jQuery);
