$(function () {
    $('.tab-link.masteries-stats').on('click', function (ev) {
        if (!isActive(ev.target)) {
            changeDisplayTo('stats');
        }
    });

    $('.tab-link.masteries-description').on('click', function (ev) {
        if (!isActive(ev.target)) {
            changeDisplayTo('description');
        }
    });

    $('.tab-link.masteries-champions').on('click', function (ev) {
        if (!isActive(ev.target)) {
            changeDisplayTo('champions');
        }
    });

    function isActive(tab): boolean {
        return $(tab).attr("class").split(/\s+/).indexOf('active') != -1;
    }

    function changeDisplayTo(tab): void {
        console.log(`.${tab}.masteries-stats-wrapper`);
        hideActiveTab();
        $(`.masteries-${tab}-wrapper`).addClass('active');
        $(`.tab-link.masteries-${tab}`).addClass('active');
    }

    function hideActiveTab(): void {
        $('.masteries-description-container .active').removeClass('active');
        $('.tab-link').removeClass('active');
    }
});
