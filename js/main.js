$(document).ready(function() {
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    $('#copy').click(function() {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($('.link_copy').attr('value')).select();
        document.execCommand("copy");
        $temp.remove();
        $('.link_copy').attr('value', 'Ссылка успешно скопирована!')
    });

    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        return false;
    }); //плавный скролл


    /* ТЕМНАЯ ТЕМА */
    $('#dark_theme').click(function() {
        $('link[href="style/style.css"]').attr('href', 'style/style_dark.css');
        $('#white_theme').css('display', 'flex')
        $(this).css('display', 'none')
    });
    $('#white_theme').click(function() {
        $('link[href="style/style_dark.css"]').attr('href', 'style/style.css');
        $('#dark_theme').css('display', 'flex')
        $(this).css('display', 'none')
    });
    /* Главная страница */

    /* Кнопки регистрации / авторизации */
    var userAuth = 0;
    if (userAuth == 1) { //свое условие
        $('.header__body_buttons > button').not('#landing_profile').hide();
        $('#landing_profile').css('display', 'block');
    }

    /*FEES*/
    var profileMenu = $('.profile__menu');
    $('.navbar__profile, .profile__menu').hover(function() {
        profileMenu.removeClass('profile_menu_inactive')
        profileMenu.addClass('profile_menu_active')
    }, function() {
        profileMenu.removeClass('profile_menu_active');
        profileMenu.addClass('profile_menu_inactive')
    });

    /* Модальное окно (тарифы) */

    $(document).ready(function($) {
        $('.fees_item_button').click(function() {
            $('.popup-fade').fadeIn();
            return false;
        });
        // Клик по ссылке "Закрыть".
        $('.popup-close').click(function() {
            $(this).parents('.popup-fade').fadeOut();
            return false;
        });

        // Закрытие по клавише Esc.
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $('.popup-fade').fadeOut();
            }
        });

        // Клик по фону, но не по окну.
        $('.popup-fade').click(function(e) {
            if ($(e.target).closest('.popup').length == 0) {
                $(this).fadeOut();
            }
        });
    });

    /* Офферы - живые */
    var tariffButton = $('.tariff_info_buttons > button')
    tariffButton.click(function() {
        $(tariffButton).removeClass('tariff_info_button_active');
        $(this).addClass('tariff_info_button_active');
    });

    /* Качество */

    var qualityButton = $('.tariff_info_quality > button')
    qualityButton.click(function() {
        $(qualityButton).removeClass('tariff_info_quality_active');
        $(this).addClass('tariff_info_quality_active');
    });

    /* Показ пароля */

    function showPassword() {
        if ($('.auth_password > input').attr('type') == 'password') {
            $('.auth_password > input').attr('type', 'text');
        } else {
            $('.auth_password > input').attr('type', 'password');
        };
    }

    /* Сообщения ошибки или успеха */


    function error_messageHide() {
        $('.error').addClass('msg_inactive').removeClass('msg_active');
    }

    function error_messageShow() {
        $('.error').removeClass('msg_inactive').addClass('msg_active');
    }


    function success_messageHide() {
        $('.success').addClass('msg_inactive').removeClass('msg_active');
    }

    function success_messageShow() {
        $('.success').removeClass('msg_inactive').addClass('msg_active');
    }

    /* Неверный пароль или логин */

    function wrongPassword() {
        $('.error_text').text('Ошибка: Логин или пароль введен не правильно!')
        error_messageShow();
        setTimeout(error_messageHide, 4000)
    }

    /* Восстановление пароля: Код был выслан на указанную почту*/

    function recoveryCode() {
        $('.success_text').text('Ссылка была выслана на указанную електронную почту!')
        success_messageShow();
        setTimeout(success_messageHide, 4000)
    }

    /* Кнопка изменение пароля */
    function changePasswordButton() {
        var change_password = $('#change_password').val();
        var check_password = $('#check_password').val();
        if (change_password == check_password) {
            changePassword()
        } else {
            failPasswordCheck();
        }
    }

    /* Пароль был успешно изменен */

    function changePassword() {
        $('.success_text').text('Ваш пароль был успешно изменен!')
        success_messageShow();
        setTimeout(success_messageHide, 4000)
    }

    /* Пароли не совпадают */

    function failPasswordCheck() {
        $('.error_text').text('Ошибка: Пароли не соответствуют друг другу!')
        error_messageShow();
        setTimeout(error_messageHide, 4000)
    }

    /* Профиль: меню */

    $('.profile_menu_item').hover(function test() {
        menuIconPath = $(this).find('img').attr('src').replace('.svg', '');
        $(this).find('img').attr('src', menuIconPath + '_white.svg');

    }, function() {
        $(this).find('img').attr('src', menuIconPath + '.svg');
    });



    /* Профиль: пополнить */

    $('.payment_method_item').click(function() {
        $('.payment_method_choise').attr('style', 'display: none');
        $('.payment_method_item').removeClass('payment_way_active')
        $(this).addClass('payment_way_active');
        $(this).find('.payment_method_choise').attr('style', 'display: block');
    });

    /* Профиль: помощь */

    $('.support_contact_card').hover(function test() {
        menuSupportPath = $(this).find('img').attr('src').replace('.svg', '');
        $(this).find('img').attr('src', menuSupportPath + '_white.svg');

    }, function() {
        $(this).find('img').attr('src', menuSupportPath + '.svg');
    });

    $('.support_faq_item').click(function() {
        $(this).toggleClass('support_faq_item_active');
        $(this).find('.support_faq_answer').toggleClass('support_answer_active');

    });
    $('#toggle_switch').click(function() {
        if (!$('.api_toogle').data('status')) {
            $('.api_toogle').html('Нельзя взаимодействовать с API по ключу');
            $('.api_toogle').data('status', true);
        } else {
            $('.api_toogle').html('Можно взаимодействовать с API по ключу');
            $('.api_toogle').data('status', false);
        }
    });

    /* МОИ ЗАКАЗЫ*/
    var myorders = [{
        "id": 847461,
        "website": "image/yt.svg",
        "link": "youtube",
        "name": "Лайки живыe",
        "quality": "Среднее качество",
        "url": "vk.com/itpedia_youtube",
        "date": "6 мая",
        "time": "12:28",
        "start": 100,
        "done": 889,
        "status": "Выполнено",
        "count": "1000",
        "percent": "89",
        "sum": 654
    }, {
        "id": 847462,
        "website": "image/vk.svg",
        "link": "youtube",
        "name": "Лайки живыe",
        "quality": "Высокое качество",
        "url": "vk.com/itpedia_youtube",
        "date": "6 мая",
        "time": "12:28",
        "start": 100,
        "done": 889,
        "status": "Выполнено",
        "count": "1000",
        "percent": "50",
        "sum": 654
    }, {
        "id": 847467,
        "website": "image/tk.svg",
        "link": "youtube",
        "name": "Комменты",
        "quality": "Низкое качество",
        "url": "vk.com/itpedia_youtube",
        "date": "3 мая",
        "time": "12:28",
        "start": 100,
        "done": 300,
        "status": "Выполнено",
        "count": "1000",
        "percent": "33",
        "sum": 1024
    }]
    $.each(myorders, function(key, value) {
        var array = value;
        $('.order_history_items').append($("<div/>", { class: 'order_history_item' })
            .append($("<p class='order_id'>" + array.id + "</p>")) //добавляем ID
            .append("<div class='order_history_service'>"));
        $currentOrder = $('.order_history_item:contains(' + array.id + ')'); //находим текущий заказ по ID
        $currentOrder.attr('id', array.id) //присваиваем ID в качестве аттрибута для упрощения выбора
        $("<img>").attr('src', array.website).appendTo($('#' + array.id).find('.order_history_service')); //добавляем изображение;
        $("<div>").appendTo($('#' + array.id).find('.order_history_service')) //добавляем пустой div с контентом
            .append(("<p class='order_history_services_text'>" + array.name + "</p>"))
            .append("<a class='order_history_link'>" + 'www.' + array.url + "</a>") //добавляем ссылку
        $("<span class='order_history_quality'>" + array.quality + "</span>").appendTo($('#' + array.id).find('.order_history_services_text')) //добавляем качество накрутки
        $('#' + array.id).find('.order_history_link').attr('href', 'https://' + array.url) //добавляем качество накрутки
        $("<div>", { class: 'order_data' }).append("<p class='order_data_month'>" + array.date + "</p>") //добавляем дату
            .append("<span class='order_data_time'>" + array.time + "</span>") //добавляем время
            .appendTo($('#' + array.id))
        $("<div>", { class: 'order_start' }).append("<p class='order_start_text'>" + array.start + "</p>") //добавляем Старт
            .appendTo($('#' + array.id))
        $("<div>", { class: 'order_progress' }).appendTo($('#' + array.id))
        $("<div>", { class: 'order_progress_status' }).appendTo($('#' + array.id).find('.order_progress'))
        $("<p>", { class: 'order_progress_count' }).appendTo($('#' + array.id).find('.order_progress_status'))
            .append("<span class='order_progress_current'>" + array.done + ' из ' + "</span>") //добавляем кол - во завершенных пунктов
            .append("<span class='order_progress_current'>" + array.count + "</span>") //добавляем кол - во завершенных пунктов
        $("<p class='order_progress_status_text'>" + array.status + "</p>").appendTo($('#' + array.id).find('.order_progress_status')) //добавляем статус
        $("<div>", { class: 'order_progress_bar' }).append("<div class='order_progress_bar_pr'>").appendTo($('#' + array.id).find('.order_progress'))

        /* Прогресс - бар*/
        $('#' + array.id).find('.order_progress_bar_pr').css('width', array.percent + '%');
        /**/
        $("<div>", { class: 'order_price' }).append("<p class='order_price_text'>" + array.sum + '₽').appendTo($('#' + array.id))
    });

    /* ТАРИФЫ:  */
    $('.fees_sorter_item').click(function() { //по клику на любую кнопку платформы
        var currentPlatform = $(this).attr('id'); //узнаем ID
        if ($(this).attr('id') == 'all') { //если ID 'all' (кнопка "Все") - показываем все
            $('.fees_item').show();
        } else {
            $('.fees_sorter_item_hr').css('width', '0%');
            $(this).find('.fees_sorter_item_hr').css('width', '100%');
            $('.fees_item').show();
            $('.fees_item').not('#' + currentPlatform + '_block').hide(); //иначе скрываем все кроме тарифов, у которых ID = currentPlatform + '_block'. Пример - vk_block
        }
    });

    var tarifs = [{
            "platform": "vk",
            "emoji": "image/icons/heart.svg",
            "name": "Лайки быстрые",
            "price": 50
        },
        {
            "platform": "vk",
            "emoji": "image/icons/smile.svg",
            "name": "Лайки быстрые",
            "price": 100
        },
        {
            "platform": "yt",
            "emoji": "image/icons/heart.svg",
            "name": "Лайки медленные",
            "price": 300
        },
        {
            "platform": "twich",
            "emoji": "image/icons/heart.svg",
            "name": "Лайки быстрые",
            "price": 400
        },
        {
            "platform": "tk",
            "emoji": "image/icons/smile.svg",
            "name": "Лайки быстрые",
            "price": 900
        },
        {
            "platform": "ok",
            "emoji": "image/icons/heart.svg",
            "name": "Лайки медленные",
            "price": 2141
        }
    ];
    $.each(tarifs, function(key, value) {

        var array = value;

        $('.fees__items').append($("<div/>", { class: 'fees_item', id: array.platform + '_block' })
            .append($("<div/>", { class: 'fees_item_name' })
                .append($("<img>").attr('src', array.emoji)) //добавляем картинку
                .append($("<p>" + array.name + "</p>"))) //добавляем название услуги
            .append($("<div/>", { class: 'fees_item_desc' }).append(`<div class="fees_desc_item">
            <img src="image/icons/smile.svg" alt="">
            <p>Живые</p>
        </div>
        <div class="fees_desc_item">
            <img src="image/icons/guarantee.svg" alt="">
            <p>Гарантия</p>
        </div>
        <div class="fees_desc_item">
            <img src="image/icons/smiling.svg" alt="">
            <p>Рефилл 30 дней</p>
        </div>`))
            .append($("<div/>", { class: 'fees_item_price' }).append("<p>" + array.price + ' рублей' + "</p>"))
            .append($("<button>", { class: 'fees_item_button' }).text('Подробнее')))
    })

    if ($('body').width() < 601) {
        $("html").attr("style", "overflow-x: hidden")
        $("body").attr("style", "overflow-x: hidden")
    } else {
        $("html").attr("style", "")
        $("body").attr("style", "")
    }

    /* Моб меню */
    $('.mob_menu_dropdown').hide();
    $('.hamburger_block >button').click(function() {
        if ($('.mob_menu').hasClass('mob_menu_active')) {
            setTimeout(menuHide, 400)


            function menuHide() {
                $('.mb_header_navbar img').attr('src', 'image/landing/logotype.png')
                $('.mb_navbar__register').css('color', 'rgb(39, 39, 39)');
                $('.mb_navbar__register').css('border', '2px solid rgb(39, 39, 39)')
                $("html").attr("style", "")
                $("body").attr("style", "")
                $('.mob_menu_dropdown').hide(0);
            }
        } else {
            setTimeout(menuShow, 100)

            function menuShow() {
                $('.mb_header_navbar img').attr('src', 'image/landing/logotype_white.png');
                $('.mb_navbar__register').css('color', 'white');
                $('.mb_navbar__register').css('border', '2px solid white')
                $("html").attr("style", "overflow: hidden")
                $("body").attr("style", "overflow: hidden")
                $('.mob_menu_dropdown').show(500);
            }

        }
        $('.hamburger').toggleClass('is-active');
        $('.mob_menu').toggleClass('mob_menu_active');
    });

    /* Профиль: настройки */
    var mailVerified = 0;
    if (mailVerified == 1) {
        $('.settings_mail').hide();
        $('.mail_confirmed').show();
    } else {
        return false;
    }
});