/**
 * ng 编译的三个阶段
 * DOM 编译
 * Compile 解析指令
 * Link 阶段产生 $watch list 与数据建立双向绑定
 */

/**
 * 慎独则心安
 * 主敬则身强
 * 求仁则人悦
 * 习劳则神钦
 */

/**
 * ng 双向绑定的实现
 * $scope.$apply() => $scope.$digest() => $scope.$watch();
 * apply 调用触发 digest loop 数据脏检查，并通过 watch 与UI之间形成互动。
 * ng 指令会隐式绑定 watch，并自动触发 apply 调用
 * 在没有自动触发 apply 调用的地方，请手动调用 $scope.$apply();
 */

 // http://www.angularjs.cn/A0a6
 // https://www.sitepoint.com/understanding-angulars-apply-digest/


(function () {
	var app = angular.module('app', []);

	app.controller('MyController', ['$scope', function ($scope) {

		$scope.name = '';

		/**
		 * event ect trigger dirty check (digest loop)
		 * digest loop trigger watch
		 * watch update DOM
		 * 
		 * apply trigger digest loop mannally
		 */
		$scope.$watch('name', function (newValue, oldValue, scope) {
			// console.log('newValue, oldValue, scope', newValue, oldValue, scope);
			if (newValue !== oldValue) {
				return false;
			}
		});



		$scope.number = '1111 ';

		$scope.foo = 0;
		$scope.bar = 0;
	}]);

	/**
	 * ( controller ) -> ( compile ) -> link
	 *
	 * 总是给指令定义 link 函数吧
	 */
	app.directive('exampleDirective', function() {  
	    return {  
        restrict: 'E',  
        template: '<p>Hello {{number}}!</p>',  
        controller: function($scope, $element){  
        	console.log('controller -----------------------')
            $scope.number = $scope.number + "22222 ";  
        },  
        //controllerAs:'myController',  
        link: function(scope, el, attr) {  
        	console.log('link --------------------')
            scope.number = scope.number + "33333 ";  
        },  
        // compile: function(element, attributes) {  
        // 	console.log(element)

        // 	angular.element(element).append(' so compiled!')
        //     return {  
        //         pre: function preLink(scope, element, attributes) {  
        //             scope.number = scope.number + "44444 ";  
        //         },  
        //         post: function postLink(scope, element, attributes) {  
        //             scope.number = scope.number + "55555 ";  
        //         }  
        //     };  
        // }  
	    }  
	}); 

	/**
	 * 自定义的指令就要注意自己控制 $apply() 调用
	 */
	app.directive('clickable', function() {

		return {
		  restrict: "E",
		  scope: {
		    foo: '=',
		    bar: '='
		  },
		  template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
		  link: function(scope, element, attrs) {
		  	// scope 改变了，但并没有触动 $digest()
		    // element.bind('click', function() {
		    //   scope.foo++;
		    //   scope.bar++;
		    // });

		    element.bind('click', function () {
		    	scope.$apply(function () {
		    		scope.foo ++;
		    		scope.bar++;
		    	})
		    })
		  }
		}

	});
})();
