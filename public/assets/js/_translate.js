const yatranslate = {
	/* Original language */
	lang: 'ru',
	/* Язык, на который переводим при первом посещении */
	langFirstVisit: 'en',
}

// Start
document.addEventListener('DOMContentLoaded', function () {
	yaTranslateInit()
})

/* Если установлен язык перевода для первого посещения и в localStorage нет yt-widget */
function yaTranslateInit() {
	if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
		yaTranslateSetLang(yatranslate.langFirstVisit)
	}

	// Подключаем виджет yandex translate
	let script = document.createElement('script')
	script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`
	document.getElementsByTagName('head')[0].appendChild(script)

	// Получаем и записываем язык на который переводим
	let code = yaTranslateGetCode()

	// Показываем текущий язык в меню
	yaTranslateHtmlHandler(code)
	yaTranslatePCHtmlHandler(code)

	// Вешаем событие клик на флаги
	yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
		yaTranslateSetLang(el.getAttribute('data-ya-lang'))
		// Перезагружаем страницу
		window.location.reload()
	})

	// Вешаем событие клик на флаги
	yaTranslateEventHandler('click', '[data-pc-ya-lang]', function (el) {
		yaTranslateSetLang(el.getAttribute('data-pc-ya-lang'))
		// Перезагружаем страницу
		window.location.reload()
	})
}

// Записываем выбранный язык в localStorage объект yt-widget
function yaTranslateSetLang(lang) {
	localStorage.setItem(
		'yt-widget',
		JSON.stringify({
			lang: lang,
			active: true,
		})
	)
}

// Возвращаем язык на который переводим
function yaTranslateGetCode() {
	return localStorage['yt-widget'] != undefined &&
		JSON.parse(localStorage['yt-widget']).lang != undefined
		? JSON.parse(localStorage['yt-widget']).lang
		: yatranslate.lang
}

// Получаем язык на который переводим и производим необходимые манипуляции с DOM
function yaTranslateHtmlHandler(code) {
	let langName

	switch (code) {
		case 'ru':
			langName = 'Русский'
			break
		case 'en':
			langName = 'Английский'
			break
		case 'ar':
			langName = 'Арабский'
			break
		case 'tr':
			langName = 'Турецкий'
			break
		default:
			langName = 'Выбор языка недоступен'
			break
	}

	document.querySelector(
		'[data-lang-active]'
	).innerHTML = `<button class="lang-switch__item active">
	<img src="/assets/images/flags/flag_${code}.svg">${langName}</button>
	<span class="mobile__open"></span>`
	document.querySelector(`[data-ya-lang="${code}"]`).remove()
}

function yaTranslatePCHtmlHandler(code) {
	let langName

	switch (code) {
		case 'ru':
			langName = 'Русский'
			break
		case 'en':
			langName = 'Английский'
			break
		case 'ar':
			langName = 'Арабский'
			break
		case 'tr':
			langName = 'Турецкий'
			break
		default:
			langName = 'Выбор языка недоступен'
			break
	}

	document.querySelector(
		'[data-pc-lang-active]'
	).innerHTML = `<div class="lang-modal__item">
	<img src="/assets/images/flags/flag_${code}.svg">${langName}</div>
 <div class="lang-modal__open"></div>`
	document.querySelector(`[data-pc-ya-lang="${code}"]`).remove()
}

function yaTranslateEventHandler(event, selector, handler) {
	document.addEventListener(event, function (e) {
		let el = e.target.closest(selector)
		if (el) handler(el)
	})
}
