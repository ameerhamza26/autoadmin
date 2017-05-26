angular.module('AutotekArabic.directive', [])

.directive('headerBarSupremeEnglish', function() {
	return {
		restrict : 'AE',
		templateUrl : 'EnglishTemplates/partials/header.html',
		controller:"LogoutCtrl"
	}
})

.directive('leftSideBarEnglish', function() {
	return {
		restrict : 'AE',
		templateUrl : 'EnglishTemplates/partials/leftsidebar.html',
		controller:"LogoutCtrl"
	}
})

.directive('footerBarEnglish', function() {
	return {
		restrict : 'AE',
		templateUrl : 'EnglishTemplates/partials/footer.html'
	}
})
// Arabic Directives//
.directive('headerBarSupremeArabic',function(){
	return{
		restrict:'AE',
		templateUrl:'ArabicPages/partials/header.html',
		controller:"LogoutCtrl"
	}
})
.directive('leftSideBarArabic', function() {
	return {
		restrict : 'AE',
		templateUrl : 'ArabicPages/partials/leftsidebar.html',
		controller:"LogoutCtrl"
	}
})

.directive('footerBarArabic', function() {
	return {
		restrict : 'AE',
		templateUrl : 'ArabicPages/partials/footer.html'
	}
})