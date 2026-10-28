
; /* Start:"a:4:{s:4:"full";s:67:"/bitrix/components/bitrix/search.title/script.min.js?17422099636443";s:6:"source";s:48:"/bitrix/components/bitrix/search.title/script.js";s:3:"min";s:52:"/bitrix/components/bitrix/search.title/script.min.js";s:3:"map";s:52:"/bitrix/components/bitrix/search.title/script.map.js";}"*/
function JCTitleSearch(t){var e=this;this.arParams={AJAX_PAGE:t.AJAX_PAGE,CONTAINER_ID:t.CONTAINER_ID,INPUT_ID:t.INPUT_ID,MIN_QUERY_LEN:parseInt(t.MIN_QUERY_LEN)};if(t.WAIT_IMAGE)this.arParams.WAIT_IMAGE=t.WAIT_IMAGE;if(t.MIN_QUERY_LEN<=0)t.MIN_QUERY_LEN=1;this.cache=[];this.cache_key=null;this.startText="";this.running=false;this.runningCall=false;this.currentRow=-1;this.RESULT=null;this.CONTAINER=null;this.INPUT=null;this.WAIT=null;this.ShowResult=function(t){if(BX.type.isString(t)){e.RESULT.innerHTML=t}e.RESULT.style.display=e.RESULT.innerHTML!==""?"block":"none";var s=e.adjustResultNode();var i;var n;var l=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(l){n=BX.findChild(l,{tag:"th"},true)}if(n){var r=BX.pos(l);r.width=r.right-r.left;var a=BX.pos(n);a.width=a.right-a.left;n.style.width=a.width+"px";e.RESULT.style.width=s.width+a.width+"px";e.RESULT.style.left=s.left-a.width-1+"px";if(r.width-a.width>s.width)e.RESULT.style.width=s.width+a.width-1+"px";r=BX.pos(l);i=BX.pos(e.RESULT);if(i.right>r.right){e.RESULT.style.width=r.right-r.left+"px"}}var o;if(l)o=BX.findChild(e.RESULT,{class:"title-search-fader"},true);if(o&&n){i=BX.pos(e.RESULT);o.style.left=i.right-i.left-18+"px";o.style.width=18+"px";o.style.top=0+"px";o.style.height=i.bottom-i.top+"px";o.style.display="block"}};this.onKeyPress=function(t){var s=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(!s)return false;var i;var n=s.rows.length;switch(t){case 27:e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll();return true;case 40:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var l=-1;for(i=0;i<n;i++){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(l==-1)l=i;if(e.currentRow<i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i==n&&e.currentRow!=i)e.currentRow=l;s.rows[e.currentRow].className="title-search-selected";return true;case 38:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var r=-1;for(i=n-1;i>=0;i--){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(r==-1)r=i;if(e.currentRow>i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i<0&&e.currentRow!=i)e.currentRow=r;s.rows[e.currentRow].className="title-search-selected";return true;case 13:if(e.RESULT.style.display=="block"){for(i=0;i<n;i++){if(e.currentRow==i){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){var a=BX.findChild(s.rows[i],{tag:"a"},true);if(a){window.location=a.href;return true}}}}}return false}return false};this.onTimeout=function(){e.onChange(function(){setTimeout(e.onTimeout,500)})};this.onChange=function(t){if(e.running){e.runningCall=true;return}e.running=true;if(e.INPUT.value!=e.oldValue&&e.INPUT.value!=e.startText){e.oldValue=e.INPUT.value;if(e.INPUT.value.length>=e.arParams.MIN_QUERY_LEN){e.cache_key=e.arParams.INPUT_ID+"|"+e.INPUT.value;if(e.cache[e.cache_key]==null){if(e.WAIT){var s=BX.pos(e.INPUT);var i=s.bottom-s.top-2;e.WAIT.style.top=s.top+1+"px";e.WAIT.style.height=i+"px";e.WAIT.style.width=i+"px";e.WAIT.style.left=s.right-i+2+"px";e.WAIT.style.display="block"}BX.ajax.post(e.arParams.AJAX_PAGE,{ajax_call:"y",INPUT_ID:e.arParams.INPUT_ID,q:e.INPUT.value,l:e.arParams.MIN_QUERY_LEN},function(s){e.cache[e.cache_key]=s;e.ShowResult(s);e.currentRow=-1;e.EnableMouseEvents();if(e.WAIT)e.WAIT.style.display="none";if(!!t)t();e.running=false;if(e.runningCall){e.runningCall=false;e.onChange()}});return}else{e.ShowResult(e.cache[e.cache_key]);e.currentRow=-1;e.EnableMouseEvents()}}else{e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll()}}if(!!t)t();e.running=false};this.onScroll=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.UnSelectAll=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)t.rows[i].className=""}};this.EnableMouseEvents=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)if(!BX.findChild(t.rows[i],{class:"title-search-separator"},true)){t.rows[i].id="row_"+i;t.rows[i].onmouseover=function(t){if(e.currentRow!=this.id.substr(4)){e.UnSelectAll();this.className="title-search-selected";e.currentRow=this.id.substr(4)}};t.rows[i].onmouseout=function(t){this.className="";e.currentRow=-1}}}};this.onFocusLost=function(t){setTimeout(function(){e.RESULT.style.display="none"},250)};this.onFocusGain=function(){if(e.RESULT.innerHTML.length)e.ShowResult()};this.onKeyDown=function(t){if(!t)t=window.event;if(e.RESULT.style.display=="block"){if(e.onKeyPress(t.keyCode))return BX.PreventDefault(t)}};this.adjustResultNode=function(){if(!(BX.type.isElementNode(e.RESULT)&&BX.type.isElementNode(e.CONTAINER))){return{top:0,right:0,bottom:0,left:0,width:0,height:0}}var t=BX.pos(e.CONTAINER);e.RESULT.style.position="absolute";e.RESULT.style.top=t.bottom+2+"px";e.RESULT.style.left=t.left+"px";e.RESULT.style.width=t.width+"px";return t};this._onContainerLayoutChange=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.Init=function(){this.CONTAINER=document.getElementById(this.arParams.CONTAINER_ID);BX.addCustomEvent(this.CONTAINER,"OnNodeLayoutChange",this._onContainerLayoutChange);this.RESULT=document.body.appendChild(document.createElement("DIV"));this.RESULT.className="title-search-result";this.INPUT=document.getElementById(this.arParams.INPUT_ID);this.startText=this.oldValue=this.INPUT.value;BX.bind(this.INPUT,"focus",function(){e.onFocusGain()});BX.bind(this.INPUT,"blur",function(){e.onFocusLost()});this.INPUT.onkeydown=this.onKeyDown;if(this.arParams.WAIT_IMAGE){this.WAIT=document.body.appendChild(document.createElement("DIV"));this.WAIT.style.backgroundImage="url('"+this.arParams.WAIT_IMAGE+"')";if(!BX.browser.IsIE())this.WAIT.style.backgroundRepeat="none";this.WAIT.style.display="none";this.WAIT.style.position="absolute";this.WAIT.style.zIndex="1100"}BX.bind(this.INPUT,"bxchange",function(){e.onChange()});var t=BX.findParent(this.CONTAINER,BX.is_fixed);if(BX.type.isElementNode(t)){BX.bind(window,"scroll",BX.throttle(this.onScroll,100,this))}};BX.ready(function(){e.Init(t)})}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:94:"/local/templates/dombilet2.0/components/bitrix/search.title/top-menu/script.js?178403037118345";s:6:"source";s:78:"/local/templates/dombilet2.0/components/bitrix/search.title/top-menu/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function JCTitleSearchNewTopMenu(arParams)
{
    var _this = this;

    this.arParams = {
        'AJAX_PAGE': arParams.AJAX_PAGE,
        'CONTAINER_ID': arParams.CONTAINER_ID,
        'INPUT_ID': arParams.INPUT_ID,
        'MIN_QUERY_LEN': parseInt(arParams.MIN_QUERY_LEN)
    };
    if(arParams.WAIT_IMAGE)
        this.arParams.WAIT_IMAGE = arParams.WAIT_IMAGE;
    if(arParams.MIN_QUERY_LEN <= 0)
        arParams.MIN_QUERY_LEN = 1;

    this.cache = [];
    this.cache_key = null;

    this.startText = '';
    this.running = false;
    this.runningCall = false;
    this.currentRow = -1;
    this.RESULT = null;
    this.CONTAINER = null;
    this.INPUT = null;
    this.WAIT = null;

    this._getSearchForm = function() {
        return _this.CONTAINER
            ? _this.CONTAINER.querySelector('.search-form, .search-form-popup')
            : null;
    };

    this.ShowResult = function(result)
    {
        const limit = 2;

        if (BX.type.isString(result)) {
            _this.RESULT.innerHTML = result;

            const inputValue = _this.INPUT?.value?.trim() || '';
            const searchForm = _this._getSearchForm();
            if (searchForm) {
                if (inputValue.length >= limit && _this.RESULT.innerHTML !== '') {
                    searchForm.classList.add('_active');
                } else {
                    searchForm.classList.remove('_active');
                }
            }
        }

        const input = this.INPUT;
        if (input && input.value.trim() !== '' && _this.RESULT.innerHTML !== '') {
            _this.RESULT.style.display = 'block';
            _this.RESULT.classList.add('_active');
        } else {
            _this.RESULT.style.display = 'none';
        }

        var pos = _this.adjustResultNode();

        //adjust left column to be an outline
        var res_pos;
        var th;
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(tbl)
        {
            th = BX.findChild(tbl, {'tag':'th'}, true);
        }

        if(th)
        {
            var tbl_pos = BX.pos(tbl);
            tbl_pos.width = tbl_pos.right - tbl_pos.left;

            var th_pos = BX.pos(th);
            th_pos.width = th_pos.right - th_pos.left;
            th.style.width = th_pos.width + 'px';

            _this.RESULT.style.width = (pos.width + th_pos.width) + 'px';

            //Move table to left by width of the first column
            _this.RESULT.style.left = (pos.left - th_pos.width - 1)+ 'px';

            //Shrink table when it's too wide
            if((tbl_pos.width - th_pos.width) > pos.width)
                _this.RESULT.style.width = (pos.width + th_pos.width -1) + 'px';

            //Check if table is too wide and shrink result div to it's width
            tbl_pos = BX.pos(tbl);
            res_pos = BX.pos(_this.RESULT);
            if(res_pos.right > tbl_pos.right)
            {
                _this.RESULT.style.width = (tbl_pos.right - tbl_pos.left) + 'px';
            }
        }

        var fade;
        if(tbl) fade = BX.findChild(_this.RESULT, {'class':'title-search-fader'}, true);
        if(fade && th)
        {
            res_pos = BX.pos(_this.RESULT);
            fade.style.left = (res_pos.right - res_pos.left - 18) + 'px';
            fade.style.width = 18 + 'px';
            fade.style.top = 0 + 'px';
            fade.style.height = (res_pos.bottom - res_pos.top) + 'px';
            fade.style.display = 'block';
        }
    };

    this.onKeyPress = function(keyCode)
    {
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(!tbl)
            return false;

        var i;
        var cnt = tbl.rows.length;

        switch (keyCode)
        {
            case 27: // escape key - close search div
                _this.RESULT.style.display = 'none';
                _this.currentRow = -1;
                _this.UnSelectAll();
                return true;

            case 40: // down key - navigate down on search results
                if(_this.RESULT.style.display == 'none')
                    _this.RESULT.style.display = 'block';

                var first = -1;
                for(i = 0; i < cnt; i++)
                {
                    if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                    {
                        if(first == -1)
                            first = i;

                        if(_this.currentRow < i)
                        {
                            _this.currentRow = i;
                            break;
                        }
                        else if(tbl.rows[i].className == 'title-search-selected')
                        {
                            tbl.rows[i].className = '';
                        }
                    }
                }

                if(i == cnt && _this.currentRow != i)
                    _this.currentRow = first;

                tbl.rows[_this.currentRow].className = 'title-search-selected';
                return true;

            case 38: // up key - navigate up on search results
                if(_this.RESULT.style.display == 'none')
                    _this.RESULT.style.display = 'block';

                var last = -1;
                for(i = cnt-1; i >= 0; i--)
                {
                    if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                    {
                        if(last == -1)
                            last = i;

                        if(_this.currentRow > i)
                        {
                            _this.currentRow = i;
                            break;
                        }
                        else if(tbl.rows[i].className == 'title-search-selected')
                        {
                            tbl.rows[i].className = '';
                        }
                    }
                }

                if(i < 0 && _this.currentRow != i)
                    _this.currentRow = last;

                tbl.rows[_this.currentRow].className = 'title-search-selected';
                return true;

            case 13: // enter key - choose current search result
                if(_this.RESULT.style.display == 'block')
                {
                    for(i = 0; i < cnt; i++)
                    {
                        if(_this.currentRow == i)
                        {
                            if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                            {
                                var a = BX.findChild(tbl.rows[i], {'tag':'a'}, true);
                                if(a)
                                {
                                    window.location = a.href;
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
        }

        return false;
    };

    this.onTimeout = function()
    {
        _this.onChange(function(){
            setTimeout(_this.onTimeout, 500);
        });
    };

    this.onChange = function(callback)
    {
        if (_this.running)
        {
            _this.runningCall = true;
            return;
        }
        _this.running = true;

        if(_this.INPUT.value != _this.oldValue && _this.INPUT.value != _this.startText)
        {
            _this.oldValue = _this.INPUT.value;
            if(_this.INPUT.value.length >= _this.arParams.MIN_QUERY_LEN)
            {
                _this.cache_key = _this.arParams.INPUT_ID + '|' + _this.INPUT.value;
                if(_this.cache[_this.cache_key] == null)
                {
                    if(_this.WAIT)
                    {
                        var pos = BX.pos(_this.INPUT);
                        var height = (pos.bottom - pos.top)-2;
                        _this.WAIT.style.top = (pos.top+1) + 'px';
                        _this.WAIT.style.height = height + 'px';
                        _this.WAIT.style.width = height + 'px';
                        _this.WAIT.style.left = (pos.right - height + 2) + 'px';
                        _this.WAIT.style.display = 'block';
                    }

                    BX.ajax.post(
                        _this.arParams.AJAX_PAGE,
                        {
                            'ajax_call':'y',
                            'INPUT_ID':_this.arParams.INPUT_ID,
                            'q':_this.INPUT.value,
                            'l':_this.arParams.MIN_QUERY_LEN
                        },
                        function(result)
                        {
                            _this.cache[_this.cache_key] = result;
                            _this.ShowResult(result);
                            _this.currentRow = -1;
                            _this.EnableMouseEvents();
                            if(_this.WAIT)
                                _this.WAIT.style.display = 'none';
                            if (!!callback)
                                callback();
                            _this.running = false;
                            if (_this.runningCall)
                            {
                                _this.runningCall = false;
                                _this.onChange();
                            }
                        }
                    );
                    return;
                }
                else
                {
                    _this.ShowResult(_this.cache[_this.cache_key]);
                    _this.currentRow = -1;
                    _this.EnableMouseEvents();
                }
            }
            else
            {
                _this.RESULT.innerHTML = '';
                _this.RESULT.style.display = 'none';
                _this.currentRow = -1;
                _this.UnSelectAll();

                const searchForm = _this._getSearchForm();
                if (searchForm) {
                    searchForm.classList.remove('_active');
                }
            }
        }
        if (!!callback)
            callback();
        _this.running = false;
    };

    this.onScroll = function ()
    {
        if(BX.type.isElementNode(_this.RESULT)
            && _this.RESULT.style.display !== "none"
            && _this.RESULT.innerHTML !== ''
        )
        {
            _this.adjustResultNode();
        }
    };

    this.UnSelectAll = function()
    {
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(tbl)
        {
            var cnt = tbl.rows.length;
            for(var i = 0; i < cnt; i++)
                tbl.rows[i].className = '';
        }
    };

    this.EnableMouseEvents = function()
    {
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(tbl)
        {
            var cnt = tbl.rows.length;
            for(var i = 0; i < cnt; i++)
                if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                {
                    tbl.rows[i].id = 'row_' + i;
                    tbl.rows[i].onmouseover = function (e) {
                        if(_this.currentRow != this.id.substr(4))
                        {
                            _this.UnSelectAll();
                            this.className = 'title-search-selected';
                            _this.currentRow = this.id.substr(4);
                        }
                    };
                    tbl.rows[i].onmouseout = function (e) {
                        this.className = '';
                        _this.currentRow = -1;
                    };
                }
        }
    };

    this.onFocusLost = function(hide)
    {
        setTimeout(function(){_this.RESULT.style.display = 'none';}, 250);
    };

    this.onFocusGain = function () {
        const limit = 2;
        const inputValue = _this.INPUT?.value?.trim() || '';
        const searchForm = _this._getSearchForm();

        if (searchForm) {
            if (inputValue.length >= limit && _this.RESULT.innerHTML !== '') {
                searchForm.classList.add('_active');
            } else {
                searchForm.classList.remove('_active');
            }
        }

        if (inputValue.length >= limit && _this.RESULT && _this.RESULT.innerHTML.length) {
            _this.RESULT.style.display = 'block';
            _this.RESULT.classList.add('_active');
        } else {
            _this.RESULT.style.display = 'none';
        }
    };

    this.onKeyDown = function(e)
    {
        if(!e)
            e = window.event;

        if (_this.RESULT.style.display == 'block')
        {
            if(_this.onKeyPress(e.keyCode))
                return BX.PreventDefault(e);
        }
    };

    this.adjustResultNode = function()
    {
        if(!(BX.type.isElementNode(_this.RESULT)
            && BX.type.isElementNode(_this.CONTAINER))
        )
        {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        }

        var pos = BX.pos(_this.CONTAINER);

        return pos;
    };

    this._onContainerLayoutChange = function()
    {
        if(BX.type.isElementNode(_this.RESULT)
            && _this.RESULT.style.display !== "none"
            && _this.RESULT.innerHTML !== ''
        )
        {
            _this.adjustResultNode();
        }
    };

    this.Init = function()
    {
        this.CONTAINER = document.getElementById(this.arParams.CONTAINER_ID);
        BX.addCustomEvent(this.CONTAINER, "OnNodeLayoutChange", this._onContainerLayoutChange);

        this.RESULT = this.CONTAINER.querySelector('.search-form__menu.menu-search');
        this.INPUT = document.getElementById(this.arParams.INPUT_ID);
        this.startText = this.oldValue = this.INPUT.value;
        BX.bind(this.INPUT, 'focus', function() {_this.onFocusGain()});
        this.INPUT.onkeydown = this.onKeyDown;

        BX.bind(this.INPUT, 'input', function() {
            if (_this.INPUT.value.trim().length < _this.arParams.MIN_QUERY_LEN) {
                _this.RESULT.style.display = 'none';
                const searchForm = _this._getSearchForm();
                if (searchForm) {
                    searchForm.classList.remove('_active');
                }
            }
        });

        if(this.arParams.WAIT_IMAGE)
        {
            this.WAIT = document.body.appendChild(document.createElement("DIV"));
            this.WAIT.style.backgroundImage = "url('" + this.arParams.WAIT_IMAGE + "')";
            if(!BX.browser.IsIE())
                this.WAIT.style.backgroundRepeat = 'none';
            this.WAIT.style.display = 'none';
            this.WAIT.style.position = 'absolute';
            this.WAIT.style.zIndex = '1100';
        }

        BX.bind(this.INPUT, 'bxchange', function() {_this.onChange()});

        var searchBtn = this.CONTAINER.querySelector('.search-form__btn[type="submit"], .search-form__btn:first-child');
        var searchInput = this.INPUT;

        var clearBtn = this.CONTAINER.querySelector('#searchClose');

        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                var query = searchInput.value.trim();
                if (query.length > 0) {
                    var encodedQuery = encodeURIComponent(query);
                    window.location.href = '/afisha/filter/search-is-' + encodedQuery + '/apply/';
                }
            });
        }

        // Обработка клика вне контейнера — скрываем меню только своего экземпляра
        var menu = this.RESULT;
        var container = this.CONTAINER;
        document.addEventListener('click', function (event) {
            if (!container.contains(event.target)) {
                var searchForm = _this._getSearchForm();
                if (searchForm) {
                    searchForm.classList.remove('_active');
                }
                if (menu) {
                    menu.style.display = 'none';
                    menu.classList.remove('_active');
                }
               
                // Метод определен в popup-search - кнопка reset для input
                toggleClearBtn(clearBtn, searchInput.value);
            }
        });

        // Восстановление меню при фокусе
        searchInput.addEventListener('focus', function () {
            var menuContent = menu.innerHTML.replace(../../../../../../../..<!--.*?-->/g, '').trim();
            if (menuContent !== '') {
                var searchForm = _this._getSearchForm();
                if (searchForm) {
                    searchForm.classList.add('_active');
                }
                menu.style.display = 'block';

                // Метод определен в popup-search - кнопка reset для input
                toggleClearBtn(clearBtn, searchInput.value);
            }
        });

        searchInput.addEventListener('input', function (e) {
            var inputValue = e.target.value.trim();
            if (inputValue.length > 0) {
                var searchForm = _this._getSearchForm();
                if (searchForm) {
                    searchForm.classList.add('_active');
                }
                menu.style.display = 'block';
            }

            // Метод определен в popup-search - кнопка reset для input
            toggleClearBtn(clearBtn, searchInput.value);
        });

        var fixedParent = BX.findParent(this.CONTAINER, BX.is_fixed);
        if(BX.type.isElementNode(fixedParent))
        {
            BX.bind(window, 'scroll', BX.throttle(this.onScroll, 100, this));
        }

        if(!clearBtn) return;
        
        clearBtn.addEventListener('click', function (event) {
 
            searchInput.value = '';
            menu.innerHTML = '';
            menu.style.display = 'none';

            // Метод определен в popup-search - кнопка reset для input
            toggleClearBtn(clearBtn);
        });
    };
    BX.ready(function (){_this.Init(arParams)});
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:98:"/local/templates/dombilet2.0/components/bitrix/search.title/popup-search/script.js?178403037119243";s:6:"source";s:82:"/local/templates/dombilet2.0/components/bitrix/search.title/popup-search/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function JCTitleSearchNew(arParams)
{
    var _this = this;

    this.arParams = {
        'AJAX_PAGE': arParams.AJAX_PAGE,
        'CONTAINER_ID': arParams.CONTAINER_ID,
        'INPUT_ID': arParams.INPUT_ID,
        'MIN_QUERY_LEN': parseInt(arParams.MIN_QUERY_LEN)
    };
    if(arParams.WAIT_IMAGE)
        this.arParams.WAIT_IMAGE = arParams.WAIT_IMAGE;
    if(arParams.MIN_QUERY_LEN <= 0)
        arParams.MIN_QUERY_LEN = 1;

    this.cache = [];
    this.cache_key = null;

    this.startText = '';
    this.running = false;
    this.runningCall = false;
    this.currentRow = -1;
    this.RESULT = null;
    this.CONTAINER = null;
    this.INPUT = null;
    this.WAIT = null;

    this.ShowResult = function(result)
    {

        const limit = 2;

        if (BX.type.isString(result)) {
            _this.RESULT.innerHTML = result;

            const inputValue = _this.INPUT?.value?.trim() || '';
            const searchForm = _this.CONTAINER.parentElement;
            if (searchForm) {
                if (inputValue.length >= limit && _this.RESULT.innerHTML !== '') {
                    searchForm.classList.add('_active');
                } else {
                    searchForm.classList.remove('_active');
                }
            }
        }

        const input = this.INPUT;
        if (input && input.value.trim() !== '' && _this.RESULT.innerHTML !== '') {
            _this.RESULT.style.display = 'block';
            _this.RESULT.classList.add('_active');
        } else {
            _this.RESULT.style.display = 'none';
        }

        var pos = _this.adjustResultNode();

        //adjust left column to be an outline
        var res_pos;
        var th;
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(tbl)
        {
            th = BX.findChild(tbl, {'tag':'th'}, true);
        }

        if(th)
        {
            var tbl_pos = BX.pos(tbl);
            tbl_pos.width = tbl_pos.right - tbl_pos.left;

            var th_pos = BX.pos(th);
            th_pos.width = th_pos.right - th_pos.left;
            th.style.width = th_pos.width + 'px';

            _this.RESULT.style.width = (pos.width + th_pos.width) + 'px';

            //Move table to left by width of the first column
            _this.RESULT.style.left = (pos.left - th_pos.width - 1)+ 'px';

            //Shrink table when it's too wide
            if((tbl_pos.width - th_pos.width) > pos.width)
                _this.RESULT.style.width = (pos.width + th_pos.width -1) + 'px';

            //Check if table is too wide and shrink result div to it's width
            tbl_pos = BX.pos(tbl);
            res_pos = BX.pos(_this.RESULT);
            if(res_pos.right > tbl_pos.right)
            {
                _this.RESULT.style.width = (tbl_pos.right - tbl_pos.left) + 'px';
            }
        }

        var fade;
        if(tbl) fade = BX.findChild(_this.RESULT, {'class':'title-search-fader'}, true);
        if(fade && th)
        {
            res_pos = BX.pos(_this.RESULT);
            fade.style.left = (res_pos.right - res_pos.left - 18) + 'px';
            fade.style.width = 18 + 'px';
            fade.style.top = 0 + 'px';
            fade.style.height = (res_pos.bottom - res_pos.top) + 'px';
            fade.style.display = 'block';
        }
    };

    this.onKeyPress = function(keyCode)
    {
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(!tbl)
            return false;

        var i;
        var cnt = tbl.rows.length;

        switch (keyCode)
        {
            case 27: // escape key - close search div
                _this.RESULT.style.display = 'none';
                _this.currentRow = -1;
                _this.UnSelectAll();
                return true;

            case 40: // down key - navigate down on search results
                if(_this.RESULT.style.display == 'none')
                    _this.RESULT.style.display = 'block';

                var first = -1;
                for(i = 0; i < cnt; i++)
                {
                    if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                    {
                        if(first == -1)
                            first = i;

                        if(_this.currentRow < i)
                        {
                            _this.currentRow = i;
                            break;
                        }
                        else if(tbl.rows[i].className == 'title-search-selected')
                        {
                            tbl.rows[i].className = '';
                        }
                    }
                }

                if(i == cnt && _this.currentRow != i)
                    _this.currentRow = first;

                tbl.rows[_this.currentRow].className = 'title-search-selected';
                return true;

            case 38: // up key - navigate up on search results
                if(_this.RESULT.style.display == 'none')
                    _this.RESULT.style.display = 'block';

                var last = -1;
                for(i = cnt-1; i >= 0; i--)
                {
                    if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                    {
                        if(last == -1)
                            last = i;

                        if(_this.currentRow > i)
                        {
                            _this.currentRow = i;
                            break;
                        }
                        else if(tbl.rows[i].className == 'title-search-selected')
                        {
                            tbl.rows[i].className = '';
                        }
                    }
                }

                if(i < 0 && _this.currentRow != i)
                    _this.currentRow = last;

                tbl.rows[_this.currentRow].className = 'title-search-selected';
                return true;

            case 13: // enter key - choose current search result
                if(_this.RESULT.style.display == 'block')
                {
                    for(i = 0; i < cnt; i++)
                    {
                        if(_this.currentRow == i)
                        {
                            if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                            {
                                var a = BX.findChild(tbl.rows[i], {'tag':'a'}, true);
                                if(a)
                                {
                                    window.location = a.href;
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
        }

        return false;
    };

    this.onTimeout = function()
    {
        _this.onChange(function(){
            setTimeout(_this.onTimeout, 500);
        });
    };

    this.onChange = function(callback)
    {
        if (_this.running)
        {
            _this.runningCall = true;
            return;
        }
        _this.running = true;

        if(_this.INPUT.value != _this.oldValue && _this.INPUT.value != _this.startText)
        {
            _this.oldValue = _this.INPUT.value;
            if(_this.INPUT.value.length >= _this.arParams.MIN_QUERY_LEN)
            {
                _this.cache_key = _this.arParams.INPUT_ID + '|' + _this.INPUT.value;
                if(_this.cache[_this.cache_key] == null)
                {
                    if(_this.WAIT)
                    {
                        var pos = BX.pos(_this.INPUT);
                        var height = (pos.bottom - pos.top)-2;
                        _this.WAIT.style.top = (pos.top+1) + 'px';
                        _this.WAIT.style.height = height + 'px';
                        _this.WAIT.style.width = height + 'px';
                        _this.WAIT.style.left = (pos.right - height + 2) + 'px';
                        _this.WAIT.style.display = 'block';
                    }

                    BX.ajax.post(
                        _this.arParams.AJAX_PAGE,
                        {
                            'ajax_call':'y',
                            'INPUT_ID':_this.arParams.INPUT_ID,
                            'q':_this.INPUT.value,
                            'l':_this.arParams.MIN_QUERY_LEN
                        },
                        function(result)
                        {
                            _this.cache[_this.cache_key] = result;
                            _this.ShowResult(result);
                            _this.currentRow = -1;
                            _this.EnableMouseEvents();
                            if(_this.WAIT)
                                _this.WAIT.style.display = 'none';
                            if (!!callback)
                                callback();
                            _this.running = false;
                            if (_this.runningCall)
                            {
                                _this.runningCall = false;
                                _this.onChange();
                            }
                        }
                    );
                    return;
                }
                else
                {
                    _this.ShowResult(_this.cache[_this.cache_key]);
                    _this.currentRow = -1;
                    _this.EnableMouseEvents();
                }
            }
            else
            {
                _this.RESULT.innerHTML = '';
                _this.RESULT.style.display = 'none';
                _this.currentRow = -1;
                _this.UnSelectAll();

                const searchForm = _this.CONTAINER;
                if (searchForm) {
                    searchForm.classList.remove('_active');
                }
            }
        }
        if (!!callback)
            callback();
        _this.running = false;
    };

    this.onScroll = function ()
    {
        if(BX.type.isElementNode(_this.RESULT)
            && _this.RESULT.style.display !== "none"
            && _this.RESULT.innerHTML !== ''
        )
        {
            _this.adjustResultNode();
        }
    };

    this.UnSelectAll = function()
    {
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(tbl)
        {
            var cnt = tbl.rows.length;
            for(var i = 0; i < cnt; i++)
                tbl.rows[i].className = '';
        }
    };

    this.EnableMouseEvents = function()
    {
        var tbl = BX.findChild(_this.RESULT, {'tag':'table','class':'title-search-result'}, true);
        if(tbl)
        {
            var cnt = tbl.rows.length;
            for(var i = 0; i < cnt; i++)
                if(!BX.findChild(tbl.rows[i], {'class':'title-search-separator'}, true))
                {
                    tbl.rows[i].id = 'row_' + i;
                    tbl.rows[i].onmouseover = function (e) {
                        if(_this.currentRow != this.id.substr(4))
                        {
                            _this.UnSelectAll();
                            this.className = 'title-search-selected';
                            _this.currentRow = this.id.substr(4);
                        }
                    };
                    tbl.rows[i].onmouseout = function (e) {
                        this.className = '';
                        _this.currentRow = -1;
                    };
                }
        }
    };

    this.onFocusLost = function(hide)
    {
        setTimeout(function(){_this.RESULT.style.display = 'none';}, 250);
    };

    this.onFocusGain = function () {
        const limit = 2;
        const inputValue = _this.INPUT?.value?.trim() || '';
        const searchForm = _this.CONTAINER;

        if (searchForm) {
            if (inputValue.length >= limit && _this.RESULT.innerHTML !== '') {
                searchForm.classList.add('_active');
            } else {
                searchForm.classList.remove('_active');
            }
        }

        if (inputValue.length >= limit && _this.RESULT && _this.RESULT.innerHTML.length) {
            _this.RESULT.style.display = 'block';
            _this.RESULT.classList.add('_active');
        } else {
            _this.RESULT.style.display = 'none';
        }
    };

    this.onKeyDown = function(e)
    {
        if(!e)
            e = window.event;

        if (_this.RESULT.style.display == 'block')
        {
            if(_this.onKeyPress(e.keyCode))
                return BX.PreventDefault(e);
        }
    };

    this.adjustResultNode = function()
    {
        if(!(BX.type.isElementNode(_this.RESULT)
            && BX.type.isElementNode(_this.CONTAINER))
        )
        {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        }

        var pos = BX.pos(_this.CONTAINER);

        return pos;
    };

    this._onContainerLayoutChange = function()
    {
        if(BX.type.isElementNode(_this.RESULT)
            && _this.RESULT.style.display !== "none"
            && _this.RESULT.innerHTML !== ''
        )
        {
            _this.adjustResultNode();
        }
    };
    this.Init = function()
    {
        this.CONTAINER = document.getElementById(this.arParams.CONTAINER_ID);
        BX.addCustomEvent(this.CONTAINER, "OnNodeLayoutChange", this._onContainerLayoutChange);

        this.RESULT = this.CONTAINER.querySelector('.search-form__menu.menu-search');
        this.INPUT = document.getElementById(this.arParams.INPUT_ID);
        this.startText = this.oldValue = this.INPUT.value;
        BX.bind(this.INPUT, 'focus', function() {_this.onFocusGain()});
        this.INPUT.onkeydown = this.onKeyDown;

        BX.bind(this.INPUT, 'input', function() {
            if (_this.INPUT.value.trim().length < _this.arParams.MIN_QUERY_LEN) {
                _this.RESULT.style.display = 'none';
                const searchForm = _this.CONTAINER;
                if (searchForm) {
                    searchForm.classList.remove('_active');
                }
            }
        });

        if(this.arParams.WAIT_IMAGE)
        {
            this.WAIT = document.body.appendChild(document.createElement("DIV"));
            this.WAIT.style.backgroundImage = "url('" + this.arParams.WAIT_IMAGE + "')";
            if(!BX.browser.IsIE())
                this.WAIT.style.backgroundRepeat = 'none';
            this.WAIT.style.display = 'none';
            this.WAIT.style.position = 'absolute';
            this.WAIT.style.zIndex = '1100';
        }

        BX.bind(this.INPUT, 'bxchange', function() {_this.onChange()});

        var fixedParent = BX.findParent(this.CONTAINER, BX.is_fixed);
        if(BX.type.isElementNode(fixedParent))
        {
            BX.bind(window, 'scroll', BX.throttle(this.onScroll, 100, this));
        }
    };
    BX.ready(function (){_this.Init(arParams)});
}

BX.ready(function () {
    const container = document.getElementById('title-search-popup');
    const searchBtn = container?.querySelector('.search-form__btn');
    const searchInput = container?.querySelector('input[id*="title-search-input"]');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (query.length > 0) {
                const encodedQuery = encodeURIComponent(query);
                const url = `/afisha/filter/search-is-${encodedQuery}/apply/`;
                window.location.href = url;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('title-search-popup');
    const input = document.getElementById('title-search-input-popup');
    const menu = searchForm?.querySelector('.menu-search');
    const clearBtn = searchForm?.querySelector('#searchClose');

    if (!searchForm || !input || !menu) return;

    toggleClearBtn(clearBtn);

    // При фокусе — добавляем _active, только если меню НЕ пустое
    input.addEventListener('focus', function (e) {
        // Убираем пробелы и комментарии, чтобы определить, пустое ли меню
        const menuContent = menu.innerHTML.replace(../../../../../../../..<!--.*?-->/g, '').trim();
        const inputValue = e.target.value.trim();

        if (menuContent !== '') {
            searchForm.classList.add('_active');
            menu.style.display = 'block';
        } else {
            searchForm.classList.remove('_active');
             menu.style.display = 'none';
        }

        updatePlaceholder();
        toggleClearBtn(clearBtn, inputValue)
    });

    // При вводе символов в input
    input.addEventListener('input', function (e) {
        const inputValue = e.target.value.trim();
       
        if (inputValue.length > 0) {
            searchForm.classList.add('_active');
            menu.style.display = 'block';
        } else {
            searchForm.classList.remove('_active');
            menu.style.display = 'none';
        }

        updatePlaceholder();
        toggleClearBtn(clearBtn, inputValue)
    });

    // При клике вне формы — убираем _active и скрываем меню
    document.addEventListener('click', function (event) {
        if (!searchForm.contains(event.target)) {
            searchForm.classList.remove('_active');
            menu.style.display = 'none';
            menu.classList.remove('_active');
        }

        updatePlaceholder();
    });


    if(!clearBtn) return;

    clearBtn.addEventListener('click', function (event) {

        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
});

function updatePlaceholder() {
    const searchForm = document.getElementById('title-search-popup');
    const input = document.getElementById('title-search-input-popup');
    const menu = searchForm?.querySelector('.menu-search');
    const placeholder = document.querySelector('.search-placeholder');
    
    // Условия: поле пустое И меню скрыто (через display или отсутствие класса _active)
    const isInputEmpty = input.value.trim() === '';
    const isMenuHidden = menu.style.display !== 'block'; 
   
    if (isInputEmpty && isMenuHidden) {
        placeholder.classList.add('search-placeholder-visible'); // показываем
    } else {
        placeholder.classList.remove('search-placeholder-visible'); // скрываем
    }
}


function toggleClearBtn(actualClearBtn, inputValue = ''){

    if (!actualClearBtn) return;
    
    const isHidden = actualClearBtn.classList.contains("search-form__btn_reset-hidden");
    const isEmpty = inputValue === "";
    
    if (!isEmpty && isHidden) {
        actualClearBtn.classList.remove("search-form__btn_reset-hidden");
    } else if (isEmpty && !isHidden) {
        actualClearBtn.classList.add("search-form__btn_reset-hidden");
    }
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:79:"/local/components/tickets/top.button/templates/.default/script.js?1756102621619";s:6:"source";s:65:"/local/components/tickets/top.button/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', toggleScrollButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    toggleScrollButton();
})

/* End */
;; /* /bitrix/components/bitrix/search.title/script.min.js?17422099636443*/
; /* /local/templates/dombilet2.0/components/bitrix/search.title/top-menu/script.js?178403037118345*/
; /* /local/templates/dombilet2.0/components/bitrix/search.title/popup-search/script.js?178403037119243*/
; /* /local/components/tickets/top.button/templates/.default/script.js?1756102621619*/

//# sourceMappingURL=template_602bebb4aa63c55a0d07e5e7d545b775.map.js